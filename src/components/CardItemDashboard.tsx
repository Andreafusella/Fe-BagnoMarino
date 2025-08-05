import {
    useDeleteCategory,
    useDeleteItem,
    useUpdateAvailableItem,
    useUpdatePositionItem,
    type IAllergenesDto,
    type IChangeAvailableBodyDto,
    type IItemWithCategoryDto,
    type IUpdatePosition,
} from "@/service/DashboardService";
import Allergen from "./Allergen";
import { getLucideIconByName } from "@/service/GeneralService";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogContent, DialogClose } from "./ui/dialog";
import type { ICategory } from "@/service/Menuservice";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import UpdateCategoryDialog from "./dialog/UpdateCategoryDialog";
import UpdateItemDialog from "./dialog/UpdateItemDialog";

interface ICardItemDashboardProps {
    item: IItemWithCategoryDto;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    onEditItem?: (id: number) => void;
    onDeleteItem?: (id: number) => void;
    onToggleAvailable?: (id: number, newValue: boolean) => void;
    onReorder?: (ordered: { id: number; orderIndex: number }[]) => void;
    allergens?: IAllergenesDto[];
    categories?: ICategory[];
}

const SortableItem = ({
    item,
    children,
}: {
    item: any;
    children: React.ReactNode;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
    };

    return (
        <div ref={setNodeRef} style={style as React.CSSProperties} className={`relative ${isDragging ? "shadow-lg" : ""}`}>
            <div
                {...attributes}
                {...listeners}
                className="absolute top-10 right-2 cursor-grab text-gray-400 hover:text-gray-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <circle cx="5" cy="5" r="1.5" />
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="5" cy="19" r="1.5" />
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                </svg>
            </div>
            {children}
        </div>
    );
};

const CardItemDashboard = ({
    item,
    onDelete,
    onDeleteItem,
    onReorder,
    allergens,
    categories
}: ICardItemDashboardProps) => {
    const IconComponent = getLucideIconByName(item.categoryIcon);

    const { mutate: mutateAvailable } = useUpdateAvailableItem();
    const { mutate: mutatePosition } = useUpdatePositionItem();
    const { mutate: mutateDeleteItem, isPending: isPendingDeleteItem } = useDeleteItem();
    const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory } = useDeleteCategory();

    const [items, setItems] = useState(item.items);
    const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState<boolean>(false);
    const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [openUpdateItemDialog, setOpenUpdateItemDialog] = useState<boolean>(false);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [openUpdateCategoryDialog, setOpenUpdateCategoryDialog] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.categoryId
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : "auto",
    };

    useEffect(() => {
        setItems(item.items);
    }, [item.items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleToggleAvailability = (itemId: number, newValue: boolean) => {
        const data: IChangeAvailableBodyDto = {
            id: itemId,
            available: newValue,
        };

        mutateAvailable(data, {
            onSuccess: () => {
                setItems((currentItems) =>
                    currentItems.map((i) =>
                        i.id === itemId ? { ...i, available: newValue } : i
                    )
                );
                toast.success("Disponibilità aggiornata", {
                    style: { backgroundColor: "#22c55e", color: "white" },
                });
            },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);

        const data: IUpdatePosition[] = newItems.map((i, index) => ({
            id: i.id,
            orderIndex: index,
        }));

        mutatePosition(data, {
            onSuccess: () => { },
        });
        onReorder?.(data);
    };

    const handleOpenDeleteItemDialog = (itemId: number) => {
        setSelectedItemId(itemId);
        setOpenDeleteItemDialog(true);
    };

    const handleOpenUpdateItemDialog = (itemId: number) => {
        setEditItemId(itemId);
        setOpenUpdateItemDialog(true);
    };

    // const handleCloseUpdateItemDialog = () => {
    //     setOpenUpdateItemDialog(false);
    //     setEditItemId(null);
    // };

    const handleConfirmDeleteItem = () => {
        if (selectedItemId) {
            mutateDeleteItem(selectedItemId, {
                onSuccess: () => {
                    toast.success(`Item eliminato con successo`, {
                        style: { backgroundColor: "#22c55e", color: "white" }
                    });
                    setOpenDeleteItemDialog(false);
                    setSelectedItemId(null);
                    onDeleteItem?.(selectedItemId);
                },
                onError: () => {
                    toast.error("Errore durante l'eliminazione dell'item", {
                        style: { backgroundColor: "#ef4444", color: "white" }
                    });
                }
            });
        }
    };

    const handleOpenDeleteCategoryDialog = () => {
        setOpenDeleteCategoryDialog(true);
    };

    const handleConfirmDeleteCategory = () => {
        mutateDeleteCategory(item.categoryId, {
            onSuccess: () => {
                toast.success(`Categoria eliminata con successo`, {
                    style: { backgroundColor: "#22c55e", color: "white" }
                });
                setOpenDeleteCategoryDialog(false);
                onDelete?.(item.categoryId);
            },
            onError: () => {
                toast.error("Errore durante l'eliminazione della categoria", {
                    style: { backgroundColor: "#ef4444", color: "white" }
                });
            }
        });
    };

    return (
        <>
            {editCategoryId !== null && (
                <UpdateCategoryDialog
                    id={editCategoryId}
                    open={openUpdateCategoryDialog}
                    setOpen={() => {
                        setOpenUpdateCategoryDialog(false);
                        setEditCategoryId(null);
                    }}
                />
            )}

            {editItemId !== null && (
                <UpdateItemDialog
                    id={editItemId}
                    open={openUpdateItemDialog}
                    setOpen={(val?: boolean) => {
                        setOpenUpdateItemDialog(val ?? false);
                        setEditItemId(null);
                    }}
                    allergenes={allergens}
                    categories={categories}
                />
            )}

            <Dialog open={openDeleteItemDialog} onOpenChange={setOpenDeleteItemDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminazione item</DialogTitle>
                        <DialogDescription>
                            Sicuro di voler eliminare questo item? Questa azione non può essere annullata.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'
                                onClick={() => {
                                    setOpenDeleteItemDialog(false);
                                    setSelectedItemId(null);
                                }}
                            >
                                Annulla
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPendingDeleteItem}
                            className='rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer'
                            onClick={handleConfirmDeleteItem}
                        >
                            {isPendingDeleteItem ? (
                                <div className='flex justify-center items-center'>
                                    <Loader className="animate-spin h-4 w-4" />
                                </div>
                            ) : (
                                <span>Elimina</span>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openDeleteCategoryDialog} onOpenChange={setOpenDeleteCategoryDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminazione categoria</DialogTitle>
                        <DialogDescription>
                            Sicuro di voler eliminare questa categoria? Tutti gli item associati verranno eliminati. Questa azione non può essere annullata.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'
                                onClick={() => setOpenDeleteCategoryDialog(false)}
                            >
                                Annulla
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPendingDeleteCategory}
                            className='rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer'
                            onClick={handleConfirmDeleteCategory}
                        >
                            {isPendingDeleteCategory ? (
                                <div className='flex justify-center items-center'>
                                    <Loader className="animate-spin h-4 w-4" />
                                </div>
                            ) : (
                                <span>Elimina</span>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div ref={setNodeRef} style={style as React.CSSProperties} className={`relative mt-10 rounded-2xl border border-gray-300 bg-white p-4 shadow-md space-y-4 ${isDragging ? "shadow-lg" : ""}`}>
                <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                        <IconComponent className="h-7 w-7 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800 break-all pr-2">{item.category}</h2>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                setEditCategoryId(item.categoryId);
                                setOpenUpdateCategoryDialog(true);
                            }}
                            className="text-gray-600 hover:text-blue-600 bg-transparent hover:bg-gray-200 border border-gray-300 transition-colors cursor-pointer"
                        >
                            <Pencil className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={handleOpenDeleteCategoryDialog}
                            className="text-gray-600 hover:text-red-600 bg-transparent hover:bg-gray-200 border border-gray-300 transition-colors cursor-pointer"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                        <button
                            {...listeners}
                            {...attributes}
                            className="text-gray-600 hover:text-gray-900 bg-transparent transition-colors cursor-grab p-2 rounded-md"
                        >
                            <DragHandleDots2Icon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {items.map((i) => (
                                <SortableItem
                                    key={i.id}
                                    item={i}
                                >
                                    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 p-3 transition-shadow hover:shadow">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-base font-medium text-gray-800 break-words overflow-hidden max-w-[70%]">
                                                    {i.name}
                                                </h3>
                                                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                    € {i.price.toFixed(2)}
                                                </span>
                                            </div>
                                            {i.description && (
                                                <p className="mt-1 text-sm text-gray-600 pr-8 break-words">{i.description}</p>
                                            )}
                                            <div className="mt-2 flex flex-wrap items-center gap-1">
                                                {i.allergenes.map((allergen) => (
                                                    <Allergen key={allergen.id} allergen={allergen} />
                                                ))}
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                                                {i.special && (
                                                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700">
                                                        Speciale
                                                    </span>
                                                )}
                                                {i.frozen && (
                                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                                                        Congelato
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <Switch
                                                checked={i.available}
                                                onCheckedChange={(value) => handleToggleAvailability(i.id, value)}
                                                className="cursor-pointer"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => handleOpenUpdateItemDialog(i.id)}
                                                    className="cursor-pointer border border-gray-300 text-gray-600 hover:text-blue-600 bg-transparent hover:bg-gray-200 transition-colors"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleOpenDeleteItemDialog(i.id)}
                                                    className="cursor-pointer border border-gray-300 text-gray-600 hover:text-red-600 bg-transparent hover:bg-gray-200 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </>
    );
};

export default CardItemDashboard;