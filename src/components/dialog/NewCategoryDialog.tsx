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
    SelectLabel,
    SelectItem
} from '../ui/select'
import IconPicker from '../IconPicker'
import z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory, type INewCategory } from '@/service/DashboardService'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface INewCategoryDialogProps {
    categories: ICategory[]
}

const categorySchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio"),
    icon: z.string().min(1, "L'icona è obbligatoria"),
    orderIndex: z.number().gt(0, "La posizione deve essere maggiore di 0"),
    subCategoryId: z.number().nullable()
})

type CategoryFormData = z.infer<typeof categorySchema>

const NewCategoryDialog = ({ categories }: INewCategoryDialogProps) => {
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        mode: 'all',
        defaultValues: {
            subCategoryId: null,
            name: '',
            icon: 'Pizza',
            orderIndex: undefined
        }
    })

    const navigate = useNavigate()

    const onSubmit = async (data: CategoryFormData) => {
        const body: INewCategory = {
            name: data.name,
            icon: data.icon,
            orderIndex: data.orderIndex,
            subCategoryId: data.subCategoryId ?? -1
        }

        try {
            console.log(body);
            
            const response = await createCategory(body)

            if (response.status === 201 || response.status === 200) {
                console.log("Categoria creata")
                setOpen(false) 
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 403 || error.response?.status === 401) {
                navigate("/login")
            } else {
                console.log("Errore generico", error)
            }
        }
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            reset({
                subCategoryId: null,
                name: '',
                icon: 'Pizza',
                orderIndex: NaN
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
                        <Label>Posizione<span className='text-red-400'>*</span></Label>
                        <Input
                            {...register('orderIndex', { valueAsNumber: true })}
                            type='number'
                            autoComplete="new-password"
                            placeholder='1-2-3...'
                            className={`border ${errors.orderIndex ? 'border-red-500' : 'border-gray-400'} w-full`}
                        />
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button className='rounded-lg bg-white hover:bg-gray-100 cursor-pointer text-black border border-gray-500'>Cancel</Button>
                        </DialogClose>
                        <Button disabled={isSubmitting || !isValid} className='rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer' type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewCategoryDialog