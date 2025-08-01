import { Pizza, IceCream, Drumstick, Soup, Cake, Apple, Sandwich, Fish, Hamburger, Shrimp, Beef, Utensils, Coffee, Egg, Martini, Milk, CakeSlice, Amphora, HandPlatter, IceCreamBowl, Grape, IceCreamCone, Beer, Ham, Popsicle, Cookie, Croissant, Dessert, Lollipop, Salad, EggFried, Vegan, CupSoda, Refrigerator, Citrus, Donut } from "lucide-react";
import type { ICategory } from "./Menuservice";
import { createAuthInstance } from "@/api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InfoFormData } from "@/components/form/InfoForm";

export interface INewCategory {
    name: string;
    icon: string;
    orderIndex?: number | null;
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

export interface IChangeAvailableBodyDto {
    id: number;
    available: boolean;
}

export interface IUpdatePosition {
    id: number;
    orderIndex: number;
}

export interface IInfoData {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  email: string;
}


const getItemWithCategory = async (token : string): Promise<IItemWithCategoryDto[]> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get<IItemWithCategoryDto[]>('/item')
    console.log(response.data);
    
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

const updateAvailableItem = async (token: string, data: IChangeAvailableBodyDto): Promise<void> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.put<void>('/item/available', data);
    return response.data;
}

export const useUpdateAvailableItem = () => {
    const token = localStorage.getItem("token");
    
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-available-item'],
        mutationFn: async (data: IChangeAvailableBodyDto) => {
            if (!token) {
                throw new Error('No token available for fetching update-available-item')
            }
            return updateAvailableItem(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category-tree']})
            queryClient.invalidateQueries({queryKey: ['item-category-all']})
        }
    })
}

const updatePositionItem = async (token: string, data: IUpdatePosition[]): Promise<void> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.put<void>('/item/position', data);
    return response.data;
}

export const useUpdatePositionItem = () => {
    const token = localStorage.getItem("token");
    
    return useMutation({
        mutationKey: ['update-position-item'],
        mutationFn: async (data: IUpdatePosition[]) => {
            if (!token) {
                throw new Error('No token available for fetching update-position-item')
            }
            return updatePositionItem(token, data)
        },
        onSuccess: () => {
            
        }
    })
}

const getInfoRestaurant = async (token: string): Promise<IInfoData> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.get<IInfoData>('/restaurant');
    console.log(response.data);
    
    return response.data;
}

export const useGetInfoRestaurant = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ['info-restaurant'],
        queryFn: async () => {
            if (!token) {
                throw new Error('No token available for fetching info-restaurant')
            }
            return getInfoRestaurant(token);
        }
    })
}

const updateInfo = async (token: string, data: InfoFormData): Promise<void> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.put<void>('/restaurant', data);

    return response.data
}

export const useUpdateInfo = () => {
    const token = localStorage.getItem("token");

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['update-info'],
        mutationFn: async (data: InfoFormData) => {
            if (!token) {
                throw new Error('No token available for fetching update-info')
            }
            return updateInfo(token, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['info-restaurant']})
        }
    })
}

const deleteItem = async (token: string, id: number): Promise<void> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.delete<void>(`/item/${id}`);

    return response.data
}

export const useDeleteItem = () => {
    const token = localStorage.getItem("token");

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-item'],
        mutationFn: async (id: number) => {
            if (!token) {
                throw new Error('No token available for fetching delete-item')
            }
            return deleteItem(token, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['item-category-all']})
        }
    })
}

const deleteCategory = async (token: string, id: number): Promise<void> => {
    const authAxios = createAuthInstance(token);
    const response = await authAxios.delete<void>(`/category/${id}`);

    return response.data
}

export const useDeleteCategory = () => {
    const token = localStorage.getItem("token");

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: async (id: number) => {
            if (!token) {
                throw new Error('No token available for fetching delete-category')
            }
            return deleteCategory(token, id)
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