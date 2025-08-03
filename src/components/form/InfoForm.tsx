import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { useGetInfoRestaurant, useUpdateInfo } from "@/service/DashboardService";
import { toast } from "sonner";


const infoSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Il nome è obbligatorio").max(40, "Massimo 40 caratteri"),
    description: z.string().max(100, "Massimo 100 caratteri").optional(),
    address: z.string().max(40, "Massimo 40 caratteri").optional(),
    email: z.string().email("L'email non è valida"),
    phone: z.string().min(1, "Il telefono è obbligatorio"),
    openingTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato orario non valido (es. 08:30)"),
    closingTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato orario non valido (es. 22:00)"),
});

export type InfoFormData = z.infer<typeof infoSchema>;

const InfoForm = () => {
    const { data: info, isLoading } = useGetInfoRestaurant();

    const { mutate: mutateInfo } = useUpdateInfo();

    const [errorUpdateInfo, setErrorUpdateInfo] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<InfoFormData>({
        resolver: zodResolver(infoSchema),
        mode: "onChange",
        defaultValues: info,
    });

    useEffect(() => {
        if (info) {
            reset(info);
        }
    }, [info, reset]);

    const onSubmit = (data: InfoFormData) => {
        mutateInfo(data, {
            onSuccess: () => {
                toast.success("Dati modificati con successo!", {
                    style: { backgroundColor: "#22c55e", color: "white" },
                });
            },
            onError: (error: any) => {
                setErrorUpdateInfo(error)
            }
        })
    };

    const FormErrorMessage = ({ message }: { message?: string }) => {
        if (!message) return null;
        return <p className="text-sm text-red-500">{message}</p>;
    };

    if (isLoading) {
        return (
            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                        <Skeleton className="h-10 w-full bg-gray-200" />
                    </div>
                ))}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-[100px] w-full bg-gray-200" />
                </div>
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-[100px] rounded-md bg-gray-200" />
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6"
        >
            <input type="hidden" {...register("id")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        placeholder="Nome"
                        type="text"
                        className="border-gray-200"
                        {...register("name")}
                    />
                    <FormErrorMessage message={errors.name?.message} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        className="border-gray-200"
                        {...register("email")}
                    />
                    <FormErrorMessage message={errors.email?.message} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input id="phone" {...register("phone")} placeholder="Telefono" type="tel" className="border-gray-200" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="address">Indirizzo</Label>
                    <Input id="address" {...register("address")} placeholder="Indirizzo" className="border-gray-200" />
                    <FormErrorMessage message={errors.address?.message} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="openingTime">Orario di apertura</Label>
                    <Input
                        id="openingTime"
                        type="time"
                        className="border-gray-200"
                        {...register("openingTime")}
                    />
                    <FormErrorMessage message={errors.openingTime?.message} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="closingTime">Orario di chiusura</Label>
                    <Input
                        id="closingTime"
                        type="time"
                        className="border-gray-200"
                        {...register("closingTime")}
                    />
                    <FormErrorMessage message={errors.closingTime?.message} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Inserisci una descrizione"
                    className="min-h-[100px] border-gray-200"
                />
                <FormErrorMessage message={errors.description?.message} />
            </div>

            {errorUpdateInfo && (
                <div className="flex justify-center my-4">
                    <div className="px-4 py-2 border border-red-500 rounded-2xl bg-white text-center text-red-500 font-semibold max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] break-words">
                        {errorUpdateInfo}
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="px-6 cursor-pointer"
                    disabled={!isDirty || isSubmitting}
                >
                    Salva
                </Button>
            </div>
        </form>
    );
};

export default InfoForm;
