import axios from "axios";
import { Pizza, IceCream, Drumstick, Soup, Cake, Apple, Sandwich, Fish, Hamburger, Shrimp, Beef, Utensils, Coffee, Egg, Martini, Milk, CakeSlice, Amphora, HandPlatter, IceCreamBowl, Grape, IceCreamCone, Beer, Ham, Popsicle, Cookie, Croissant, Dessert, Lollipop, Salad, EggFried, Vegan, CupSoda, Refrigerator, Citrus, Donut } from "lucide-react";
import type { ICategory } from "./Menuservice";
import { createAuthInstance } from "@/api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const { VITE_BACKEND_URL } = import.meta.env

export const ICONS = [
    { name: "Pizza", icon: Pizza },
    { name: "IceCream", icon: IceCream },
    { name: "Drumstick", icon: Drumstick },
    { name: "Soup", icon: Soup },
    { name: "Cake", icon: Cake },
    { name: "Apple", icon: Apple },
    { name: "Sandwich", icon: Sandwich },
    { name: "Fish", icon: Fish },
    { name: "Hamburger", icon: Hamburger },
    { name: "Shrimp", icon: Shrimp },
    { name: "Beef", icon: Beef },
    { name: "Utensils", icon: Utensils },
    { name: "Coffee", icon: Coffee },
    { name: "Egg", icon: Egg },
    { name: "Martini", icon: Martini },
    { name: "Milk", icon: Milk },
    { name: "CakeSlice", icon: CakeSlice },
    { name: "Amphora", icon: Amphora },
    { name: "HandPlatter", icon: HandPlatter },
    { name: "IceCreamBowl", icon: IceCreamBowl },
    { name: "Grape", icon: Grape },
    { name: "IceCreamCone", icon: IceCreamCone },
    { name: "Beer", icon: Beer },
    { name: "Ham", icon: Ham },
    { name: "Popsicle", icon: Popsicle },
    { name: "Cookie", icon: Cookie },
    { name: "Croissant", icon: Croissant },
    { name: "Dessert", icon: Dessert },
    { name: "Lollipop", icon: Lollipop },
    { name: "Salad", icon: Salad },
    { name: "EggFried", icon: EggFried },
    { name: "Vegan", icon: Vegan },
    { name: "CupSoda", icon: CupSoda },
    { name: "Refrigerator", icon: Refrigerator },
    { name: "Citrus", icon: Citrus },
    { name: "Donut", icon: Donut },
]

export interface INumberPlateAndCategory {
    category: number;
    itemAvailable: number;
    itemNotAvailable: number;
}

export interface INewCategory {
    name: string;
    icon: string;
    orderIndex: number;
    subCategoryId: number
}

export interface INewItem {
    name: string;
    description?: string;
    price: number;
    category: number;
    available: boolean;
    special: boolean;
    congelato: boolean;
    orderIndex?: number | null;
    allergensIds: number[];
}

export interface IAllergenesDto {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

export async function getInfoPlateAndCategory(): Promise<INumberPlateAndCategory> {
    const response = await axios.get<INumberPlateAndCategory>(`${VITE_BACKEND_URL}/restaurant`);
    return response.data;
}

export async function getAllergenesAdmin() {
    const token = localStorage.getItem("token");

    const response = await axios.get<IAllergenesDto[]>(`${VITE_BACKEND_URL}/allergens/admin`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
}

const getAllCategory = async (token : string): Promise<ICategory[]> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get<ICategory[]>('/category/all')
    return response.data;
}

export const useGetAllCategory = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ['category-all'],
        queryFn: async () => {
            if (!token) {
                throw new Error('No token available for fetching category-all')
            }
            return getAllCategory(token);
        }
    })
}

const createCategory = async (token: string, data: INewCategory): Promise<void> => {
    const authAxios = createAuthInstance(token);
    await authAxios.post('/category', data);
}

export const useCreateCategory = () => {
    const token = localStorage.getItem("token");
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: INewCategory) => {
            if (!token) {
                throw new Error('No token available for fetching category-create')
            }
            return createCategory(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category-all']})
        }
    })
}

// export async function createCategory(data: INewCategory) {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(`${VITE_BACKEND_URL}/category`, data, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     });

//     return response;
// }

export async function createItem(data: INewItem) {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${VITE_BACKEND_URL}/item`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
}