import type { LucideIcon } from "lucide-react";
import * as LucideIcons from 'lucide-react';
import type { IInfoData } from "./DashboardService";
import { createAuthInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function getLucideIconByName(iconName: string): LucideIcon {
    const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
    return icon || LucideIcons.HelpCircle;
}

const getInfoNotAdminRestaurant = async (): Promise<IInfoData> => {
    const authAxios = createAuthInstance(null)
    const response = await authAxios.get<IInfoData>('/restaurant/info')
    
    return response.data;
}

export const useGetInfoNotAdminRestaurant = () => {
    return useQuery({
        queryKey: ['get-info-not-admin'],
        queryFn: async () => {
            return getInfoNotAdminRestaurant();
        }
    })
}
