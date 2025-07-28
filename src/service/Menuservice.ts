import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

export interface ICategory {
    id: number;
    name: string;
    icon: string;
}

export interface IAllergenes {
    symbol: string;
    name: string;
    description: string;
}

export interface IItem {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    categoryName: string;
    allergenes: IAllergenes[];
}

export interface ICategoryWithItems {
    id: number;
    name: string;
    icon: string;
    items: IItem[];
    subcategories: ICategoryWithItems[];
}

export async function getCategoriesNotSubCategory(): Promise<ICategory[]> {
    console.log(VITE_BACKEND_URL);
    
    const response = await axios.get<ICategory[]>(`${VITE_BACKEND_URL}/category`);
    return response.data;
}

// export async function getItemsByCategory(categoryId: number): Promise<IItem[]> {
//     const response = await axios.get<IItem[]>(`${VITE_BACKEND_URL}/item/category?category=${categoryId}`);
//     console.log(response.data);

//     return response.data;
// }

export async function getCategoryWithSubItems(categoryId: number): Promise<ICategoryWithItems> {
    const response = await axios.get<ICategoryWithItems>(`${VITE_BACKEND_URL}/item/categories/${categoryId}`);
    console.log(response);
    
    return response.data;
}

