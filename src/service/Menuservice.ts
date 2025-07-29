import { createAuthInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

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
    special: boolean;
    frozen: boolean;
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

const getCategoriesNotSubCategory = async (): Promise<ICategory[]> => {
    const authAxios = createAuthInstance(null);
    const response = await authAxios.get<ICategory[]>('/category')
    return response.data
}

export const useGetCategoriesNotSubCategory = () => {
    return useQuery({
        queryKey: ['category-not-sub'],
        queryFn: async () => {
            return getCategoriesNotSubCategory()
        }
    })
}

const getCategoryWithSubItems = async (categoryId: number): Promise<ICategoryWithItems> => {
    const authAxios = createAuthInstance(null)
    const response = await authAxios.get<ICategoryWithItems>(`/item/categories/${categoryId}`)
    return response.data
}

export const useGetCategoryWithSubItems = (categoryId: number | null) => {
    return useQuery({
      queryKey: ['category-tree', categoryId],
      queryFn: async () => {
        if (categoryId === null) throw new Error('No category selected');
        return getCategoryWithSubItems(categoryId);
      },
      enabled: !!categoryId,
    });
  };

// export async function getCategoryWithSubItems(categoryId: number): Promise<ICategoryWithItems> {
//     const response = await axios.get<ICategoryWithItems>(`${VITE_BACKEND_URL}/item/categories/${categoryId}`);
//     console.log(response);
    
//     return response.data;
// }

