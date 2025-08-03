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
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardItemDashboard from "@/components/CardItemDashboard";
import { useGetAllergenesAdmin, useGetItemWithCategory, useGetAllCategory, useUpdatePositionCategory } from "@/service/DashboardService";
import { useState, useEffect } from "react";
import type { IItemWithCategoryDto, IUpdatePosition } from "@/service/DashboardService";
import AllItemAndCategorySkeleton from "@/components/skeleton/AllItemAndCategorySkeleton";

const ItemListDashboard = () => {
    const { data: initialItems, isLoading, isError } = useGetItemWithCategory();
    const { data: allergens } = useGetAllergenesAdmin();
    const { data: categories } = useGetAllCategory();

    const [sortedItems, setSortedItems] = useState<IItemWithCategoryDto[]>([]);

    const {mutate: updatePositionCategory} = useUpdatePositionCategory()

    useEffect(() => {
        if (initialItems) {
            setSortedItems(initialItems);
        }
    }, [initialItems]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const handleDragEndCategory = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setSortedItems((currentItems) => {
            const oldIndex = currentItems.findIndex((item) => item.categoryId === active.id);
            const newIndex = currentItems.findIndex((item) => item.categoryId === over.id);
            const newItems = arrayMove(currentItems, oldIndex, newIndex);

            const payload: IUpdatePosition[]  = newItems.map((item, index) => ({
                id: item.categoryId,
                orderIndex: index,
            }));

            updatePositionCategory(payload, {

            })
            return newItems;
        });
    };

    if (isLoading || !allergens || !categories) {
        return <AllItemAndCategorySkeleton />;
    }
    if (isError || !sortedItems) {
        return <div>Errore nel caricamento dei dati.</div>;
    }

    return (
        <div className="mb-20">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCategory}>
                <SortableContext items={sortedItems.map((i) => i.categoryId)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-10">
                        {sortedItems.map((item) => (
                            <CardItemDashboard
                                key={item.categoryId}
                                item={item}
                                allergens={allergens}
                                categories={categories}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ItemListDashboard;