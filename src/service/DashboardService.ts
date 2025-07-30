import axios from "axios";
import { Pizza, IceCream, Drumstick, Soup, Cake, Apple, Sandwich, Fish, Hamburger, Shrimp, Beef, Utensils, Coffee, Egg, Martini, Milk, CakeSlice, Amphora, HandPlatter, IceCreamBowl, Grape, IceCreamCone, Beer, Ham, Popsicle, Cookie, Croissant, Dessert, Lollipop, Salad, EggFried, Vegan, CupSoda, Refrigerator, Citrus, Donut } from "lucide-react";
import type { ICategory } from "./Menuservice";
import { createAuthInstance } from "@/api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const { VITE_BACKEND_URL } = import.meta.env

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
    frozen: boolean;
    orderIndex?: number | null;
    allergensIds: number[];
}

export interface IItemDto {
    id: number;
    name: string;
    description: string;
    price: number;
    orderIndex: number;
    available: boolean;
    special: boolean;
    frozen: boolean;
    categoryName: string;
    allergenes: IAllergenesDto[];
}

export interface IItemWithCategoryDto {
    categoryId: number;
    category: string;
    categoryIcon: string;
    items: IItemDto[];
}

export interface IAllergenesDto {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

const getItemWithCategory = async (token : string): Promise<IItemWithCategoryDto[]> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get<IItemWithCategoryDto[]>('/item')
    return response.data; 
}

export const useGetItemWithCategory = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ['item-category-all'],
        queryFn: async () => {
            if (!token) {
                throw new Error('No token available for fetching item-category-all')
            }
            return getItemWithCategory(token)
        }
    })
}

const getAllergenesAdmin = async (token : string): Promise<IAllergenesDto[]> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get<IAllergenesDto[]>('/allergens/admin')
    return response.data;
}

export const useGetAllergenesAdmin = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ['allergens-admin'],
        queryFn: async () => {
            if (!token) {
                throw new Error('No token available for fetching allergens-admin')
            }
            return getAllergenesAdmin(token)
        }
    })
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
        mutationKey: ['create-category'],
        mutationFn: async (data: INewCategory) => {
            if (!token) {
                throw new Error('No token available for fetching category-create')
            }
            return createCategory(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category-all']})
            queryClient.invalidateQueries({queryKey: ['item-category-all']})
        }
    })
}

const createItem = async (token: string, data: INewItem): Promise<IItemDto> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.post<IItemDto>('/item', data);
    return response.data;
}

export const useCreateItem = () => {
    const token = localStorage.getItem("token");
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-item'],
        mutationFn: async (data: INewItem) => {
            if (!token) {
                throw new Error('No token available for fetching create-item')
            }
            return createItem(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['item-category-all']})
        }
    })
}


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