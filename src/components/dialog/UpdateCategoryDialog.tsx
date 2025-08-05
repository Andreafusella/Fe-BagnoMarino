import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from '../ui/select'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCategoriesNotSubCategory } from '@/service/Menuservice'
import IconPicker from '../IconPicker'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useGetCategoryById, useUpdateCategory } from '@/service/DashboardService'
import { toast } from 'sonner'

interface IUpdateCategoryDialogProps {
    id: number
    open: boolean
    setOpen: () => void
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
        z.number().gt(-1, "La posizione deve essere maggiore di -1").nullable()
    ),
    subCategoryId: z.number().nullable(),
})

export type CategoryUpdateFormData = z.infer<typeof categorySchema>

const UpdateCategoryDialog = ({ id, open, setOpen }: IUpdateCategoryDialogProps) => {

    const [errorCategory, setErrorCategory] = useState("")

    const { data: category } = useGetCategoryById(id);
    const { data: allCategories } = useGetCategoriesNotSubCategory()
    const { mutate: updateCategoryMutate } = useUpdateCategory()

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

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                icon: category.icon,
                subCategoryId: category.subCategoryId ?? null,
                orderIndex: category.orderIndex ?? null,
            });
        }
    }, [category, reset]);


    const onSubmit = async (data: CategoryUpdateFormData) => {
        console.log(JSON.stringify(data));

        const payload = {
            ...data,
            id: id,
            subCategoryId: data.subCategoryId === null ? -1 : data.subCategoryId
        };

        updateCategoryMutate(payload, {
            onSuccess: () => {
                toast.success(`Categoria aggiornata con successo!`, { style: { backgroundColor: "#22c55e", color: "white" } })
                setOpen()
            },
            onError: (error: any) => {
                const backendMessage =
                    error?.response?.data?.errors?.[0]?.errorMessage;

                const fallbackMessage =
                    error?.message || "Errore sconosciuto";

                setErrorCategory(backendMessage || fallbackMessage);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Aggiorna Categoria</DialogTitle>
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
                                            {allCategories
                                                ?.filter((c) => c.id !== id).map((c) => (
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

                    {errorCategory && (
                        <div className="flex justify-center my-4">
                            <div className="px-4 py-2 border border-red-500 rounded-2xl bg-white text-center text-red-500 font-semibold max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] break-words">
                                {errorCategory}
                            </div>
                        </div>
                    )}

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
                                <h1>Aggiorna</h1>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCategoryDialog