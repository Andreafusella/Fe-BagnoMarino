import { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import type { ICategory } from '@/service/Menuservice'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from '../ui/select'
import IconPicker from '../IconPicker'
import z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCategory, type INewCategory } from '@/service/DashboardService'
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

interface INewCategoryDialogProps {
    categories: ICategory[];
    onCategoryCreated?: () => void;
}

const categorySchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio"),
    icon: z.string().min(1, "L'icona è obbligatoria"),
    orderIndex: z.preprocess(
        (val) => {
            if (val === "" || val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
                return null;
            }
            return Number(val);
        },
        z.number().gt(0, "La posizione deve essere maggiore di 0").nullable()
    ),
    subCategoryId: z.number().nullable(),
})

type CategoryFormData = z.infer<typeof categorySchema>

const NewCategoryDialog = ({ categories, onCategoryCreated }: INewCategoryDialogProps) => {
    const [open, setOpen] = useState(false)

    const { mutate } = useCreateCategory();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm({
        resolver: zodResolver(categorySchema),
        mode: 'all' as const,
        defaultValues: {
            name: '',
            icon: 'Pizza',
            subCategoryId: null,
            orderIndex: null 
        }
    })

    const queryClient = useQueryClient();

    const onSubmit = async (data: CategoryFormData) => {
        const body: INewCategory = {
            name: data.name,
            icon: data.icon,
            ...(data.orderIndex !== null && { orderIndex: data.orderIndex }),
            subCategoryId: data.subCategoryId ?? -1,
        }

        mutate(body, {
            onSuccess: () => {
                toast.success(`Categoria ${body.name} creata con successo`, { style: { backgroundColor: "#22c55e", color: "white" } })
                setOpen(false)
                queryClient.invalidateQueries({ queryKey: ['category-all'] })
                onCategoryCreated?.();
            },
            onError: () => {
                toast.error(`Errore creazione Categoria`, { style: { backgroundColor: "red", color: "white" } })
            }
        })
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            reset({
                subCategoryId: null,
                name: '',
                icon: 'Pizza',
                orderIndex: null, 
            })
        } else {
            reset({
                subCategoryId: null,
                name: '',
                icon: 'Pizza',
                orderIndex: null,
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className='rounded-lg bg-blue-400 hover:bg-blue-500 cursor-pointer'>+ Categoria</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crea Categoria</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 space-y-2">
                            <Label>Nome<span className='text-red-400'>*</span></Label>
                            <Input
                                {...register('name')}
                                type="text"
                                placeholder="Nome categoria"
                                autoComplete="off"
                                className={`border ${errors.name ? 'border-red-500' : 'border-gray-400'} w-full`}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="w-20 space-y-2">
                            <Label>Icona<span className='text-red-400'>*</span></Label>
                            <Controller
                                control={control}
                                name="icon"
                                render={({ field }) => (
                                    <IconPicker
                                        selectedIcon={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Sotto-Categoria</Label>
                        <Controller
                            control={control}
                            name="subCategoryId"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(val) => field.onChange(val === "null" ? null : Number(val))}
                                    value={field.value === null ? "null" : String(field.value)}
                                >
                                    <SelectTrigger className="border border-gray-400 w-full">
                                        <SelectValue placeholder="Seleziona una categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="null">No</SelectItem>
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
                        {errors.subCategoryId && <p className="text-red-500 text-sm">{errors.subCategoryId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Posizione</Label>
                        <Input
                            id="orderIndex"
                            {...register('orderIndex')}
                            type='number'
                            autoComplete="off"
                            placeholder='1-2-3...'
                            className={`border ${errors.orderIndex ? 'border-red-500' : 'border-gray-400'} w-full rounded-md p-2`}
                        />
                        {errors.orderIndex && <p className="text-red-500 text-sm">{errors.orderIndex.message}</p>}
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'>Cancel</Button>
                        </DialogClose>
                        <Button disabled={isSubmitting || !isValid} className='rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer' type="submit">
                            {isSubmitting ? (
                                <div className='flex justify-center items-center'>
                                    <Loader className="animate-spin" />
                                </div>
                            ) : (
                                <h1>Crea</h1>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewCategoryDialog