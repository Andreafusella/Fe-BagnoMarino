import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Controller, useForm, type Resolver } from 'react-hook-form'
import { Switch } from '../ui/switch'
import Allergen from '../Allergen'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useGetItemById, useUpdateItem, type IAllergenesDto } from '@/service/DashboardService'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ICategory } from '@/service/Menuservice'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import DialogSkeleton from '../skeleton/DialogSkeleton'

interface IUpdateItemDialogProps {
    id: number
    open: boolean
    setOpen: () => void
    allergenes?: IAllergenesDto[];
    categories?: ICategory[];
}

const itemUpdateSchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio").max(60, "Massimo 60 caratteri"),
    price: z.preprocess(
        (val) => {
            if (val === "" || val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
                return undefined;
            }
            return Number(val);
        },
        z.number("Il valore non è valido").gt(0, "Il prezzo deve essere maggiore di 0")
    ),
    category: z.number().min(1, "La categoria è obbligatoria"),
    description: z.string().max(130, "Massimo 130 caratteri").optional(),
    allergensIds: z.array(z.number()).optional(),
    orderIndex: z.preprocess(
        (val) => {

            if (val === "" || val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
                return null;
            }
            return Number(val);
        },
        z.number().gt(-1, "La posizione deve essere maggiore di -1").nullable()
    ),
    available: z.boolean(),
    special: z.boolean(),
    frozen: z.boolean()
})

export type ItemFormData = z.infer<typeof itemUpdateSchema>

const UpdateItemDialog = ({ id, open, setOpen, allergenes, categories }: IUpdateItemDialogProps) => {

    const { data: item, refetch, isLoading } = useGetItemById(id)
    const { mutate: updateItemMutation, isPending } = useUpdateItem()

    const [selectedAllergenes, setSelectedAllergenes] = useState<IAllergenesDto[]>([])
    const [selectValue, setSelectValue] = useState<string>("")
    const [errorItem, setErrorItem] = useState("")

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof itemUpdateSchema>>({
        resolver: zodResolver(itemUpdateSchema) as Resolver<z.infer<typeof itemUpdateSchema>>,
        mode: 'all',
    })

    useEffect(() => {
        if (open) {
            refetch();
        }
    }, [open, refetch]);

    useEffect(() => {
        if (open && item && !isLoading && categories) {
            
            setTimeout(() => {
                const categoryId = categories.find(c => c.name === item.categoryName)?.id;

                reset({
                    name: item.name,
                    price: item.price,
                    category: categoryId ? Number(categoryId) : undefined,
                    description: item.description,
                    allergensIds: item.allergenes.map(a => a.id),
                    orderIndex: item.orderIndex,
                    available: item.available,
                    special: item.special,
                    frozen: item.frozen
                })
                setSelectedAllergenes(item.allergenes)
            }, 0);
        } else if (!open) {
            reset();
            setSelectedAllergenes([]);
            setErrorItem("");
        }
    }, [item, categories, reset, open, isLoading])

    const handleAddAllergene = (id: number) => {
        const allergene = allergenes?.find(a => a.id === id)
        if (allergene && !selectedAllergenes.some(a => a.id === id)) {
            setSelectedAllergenes(prev => [...prev, allergene])
            setSelectValue("")
        }
    }

    const handleRemoveAllergene = (id: number) => {
        setSelectedAllergenes(prev => {
            const updated = prev.filter(a => a.id !== id)
            setSelectValue("")
            return updated
        })
    }

    const onSubmit = async (data: ItemFormData) => {
        const payload = { id, ...data };

        updateItemMutation(payload, {
            onSuccess: () => {
                toast.success(`${data.name} aggiornato con successo`, { style: { backgroundColor: "#22c55e", color: "white" } });
                setOpen();
            },
            onError: (error: any) => {
                const backendMessage =
                    error?.response?.data?.errors?.[0]?.errorMessage;

                const fallbackMessage =
                    error?.message || "Errore sconosciuto";

                setErrorItem(backendMessage || fallbackMessage);
                console.error(error);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                {isLoading ? (
                    <>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <DialogSkeleton />
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Modifica item</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            {/* Nome */}
                            <div className='space-y-2'>
                                <Label>Nome<span className='text-red-400'>*</span></Label>
                                <Input
                                    type='text'
                                    placeholder='Nome Piatto'
                                    autoComplete='off'
                                    className={`border ${errors.name ? 'border-red-500' : 'border-gray-400'} w-full`}
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div className='flex items-center space-x-4'>
                                {/* Categoria */}
                                <div className='space-y-2 flex-1'>
                                    <Label>Categoria<span className='text-red-400'>*</span></Label>
                                    <Controller
                                        control={control}
                                        name="category"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={(val) => field.onChange(Number(val))}
                                                value={field.value?.toString() || ""}
                                            >
                                                <SelectTrigger className={`border ${errors.category ? 'border-red-500' : 'border-gray-400'} w-full mb-0`}>
                                                    <SelectValue placeholder="Seleziona una categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {categories?.map((c) => (
                                                            <SelectItem key={c.id} value={String(c.id)}>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                                </div>

                                {/* Prezzo */}
                                <div className='space-y-2 flex-1'>
                                    <Label>Prezzo<span className='text-red-400'>*</span></Label>
                                    <Input
                                        type="number"
                                        placeholder="9,99"
                                        step="0.01"
                                        autoComplete='off'
                                        className={`border ${errors.price ? 'border-red-500' : 'border-gray-400'} w-full`}
                                        {...register("price")}
                                    />
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label>Descrizione</Label>
                                <Textarea
                                    className={`border ${errors.description ? 'border-red-500' : 'border-gray-400'} w-full break-all`}
                                    placeholder='Descrizione'
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Posizione</Label>
                                <Input
                                    {...register('orderIndex')}
                                    type='number'
                                    autoComplete="off"
                                    placeholder='1-2-3...'
                                    className={`border ${errors.orderIndex ? 'border-red-500' : 'border-gray-400'} w-full`}
                                />
                                {errors.orderIndex && <p className="text-red-500 text-sm">{errors.orderIndex.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <Label>Allergeni</Label>
                                <Controller
                                    control={control}
                                    name="allergensIds"
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <>
                                            <Select value={selectValue} onValueChange={(val) => {
                                                const id = Number(val)
                                                if (!field.value?.includes(id)) {
                                                    field.onChange([...field.value || [], id])
                                                    handleAddAllergene(id)
                                                }
                                            }}>
                                                <SelectTrigger className="w-full border border-gray-400">
                                                    <SelectValue placeholder="Aggiungi un allergene" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {allergenes?.filter(a => !field.value?.includes(a.id))
                                                            .map(a => (
                                                                <SelectItem key={a.id} value={String(a.id)}>
                                                                    <span className="flex items-center gap-2">
                                                                        <span>{a.symbol}</span>
                                                                        <span>{a.name}</span>
                                                                    </span>
                                                                </SelectItem>
                                                            ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedAllergenes.map((a) => (
                                                    <div key={a.id} className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleRemoveAllergene(a.id)
                                                                field.onChange((field.value || []).filter((v) => v !== a.id))
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-white border border-gray-300 text-red-500 hover:text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs z-10"
                                                            title="Rimuovi"
                                                        >
                                                            ×
                                                        </button>
                                                        <Allergen allergen={a} />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                />
                            </div>

                            <div className='space-y-2'>

                                <Controller
                                    control={control}
                                    name="available"
                                    render={({ field }) => (
                                        <div className='flex items-center space-x-2'>
                                            <Switch
                                                id='available'
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor='available'>Disponibile</Label>
                                        </div>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="special"
                                    render={({ field }) => (
                                        <div className='flex items-center space-x-2'>
                                            <Switch
                                                id='special'
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor='special'>Preparazione Speciale</Label>
                                        </div>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="frozen"
                                    render={({ field }) => (
                                        <div className='flex items-center space-x-2'>
                                            <Switch
                                                id='congelato'
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor='congelato'>Congelato</Label>
                                        </div>
                                    )}
                                />

                                {errorItem && (
                                    <div className="flex justify-center my-4">
                                        <div className="px-4 py-2 border border-red-500 rounded-2xl bg-white text-center text-red-500 font-semibold max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] break-words">
                                            {errorItem}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={() => setOpen()} type='button' className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'>Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                >
                                    {isPending ? (
                                        <div className='flex justify-center items-center'>
                                            <Loader className="animate-spin" />
                                        </div>
                                    ) : (
                                        <h1>Salva</h1>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>


    )
}

export default UpdateItemDialog