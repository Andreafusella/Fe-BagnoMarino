import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useCreateItem, type IAllergenesDto, type INewItem } from '@/service/DashboardService'
import type { ICategory } from '@/service/Menuservice'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { useState } from 'react'
import Allergen from '../Allergen'
import z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

interface INewItemDialogProps {
    allergenes: IAllergenesDto[];
    categories: ICategory[];
    onCategoryCreated?: () => void;
}

const productSchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio").max(30, "Massimo 30 caratteri"),
    price: z.preprocess(
        (val) => {
            // Gestisce stringhe vuote, undefined, null o NaN per il prezzo
            if (val === "" || val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
                return undefined;
            }
            return Number(val);
        },
        z.number().gt(0, "Il prezzo deve essere maggiore di 0")
    ),
    category: z.number().min(1, "La categoria è obbligatoria"),
    description: z.string().max(40, "Massimo 40 caratteri").optional(),
    allergenes: z.array(z.number()).optional(),
    orderIndex: z.preprocess(
        (val) => {
            // Se il valore è una stringa vuota, undefined, null o NaN, restituisce null
            if (val === "" || val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
                return null;
            }
            // Altrimenti prova a convertire in numero
            return Number(val);
        },
        z.number().gt(0, "La posizione deve essere maggiore di 0").nullable()
    ),
    available: z.boolean(),
    special: z.boolean(),
    frozen: z.boolean()
})

type ProductFormData = z.infer<typeof productSchema>

const NewItemDialog = ({ allergenes, categories }: INewItemDialogProps) => {

    const [selectedAllergenes, setSelectedAllergenes] = useState<IAllergenesDto[]>([])
    const [selectValue, setSelectValue] = useState<string>("")
    const [open, setOpen] = useState(false)

    const { mutate } = useCreateItem();
    

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm({
        resolver: zodResolver(productSchema),
        mode: 'all' as const,
        defaultValues: {
            name: '',
            price: undefined,
            category: undefined,
            description: '',
            orderIndex: null,
            allergenes: [],
            available: false,
            special: false,
            frozen: false,
        }
    })

    const handleAddAllergene = (id: number) => {
        const allergene = allergenes.find(a => a.id === id)
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

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            reset({
                name: '',
                price: undefined,
                category: undefined,
                description: '',
                orderIndex: null,
                allergenes: [],
                available: false,
                special: false,
                frozen: false,
            })
            setSelectedAllergenes([])
            setSelectValue("")
        }
    }


    const onSubmit = async (data: ProductFormData) => {
        const payload : INewItem = {
            ...data,
            allergensIds: selectedAllergenes.map(a => a.id),
            orderIndex: data.orderIndex
        }
        
        mutate(payload, {
            onSuccess: () => {
                toast.success(`Item ${payload.name} creato con successo`, {style: { backgroundColor: "#22c55e", color: "white" }})
                setOpen(false)

            }
        })
    }


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className='rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer'>+ Piatto</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crea Item</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    {/* Categoria + Prezzo */}
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
                                                {categories.map((c) => (
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

                    {/* Descrizione */}
                    <div className='space-y-2'>
                        <Label>Descrizione</Label>
                        <Textarea
                            className={`border ${errors.description ? 'border-red-500' : 'border-gray-400'} w-full`}
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
                            name="allergenes"
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
                                                {allergenes
                                                    .filter(a => !field.value?.includes(a.id))
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
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'>Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default NewItemDialog