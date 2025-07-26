import type { ICategory, ICategoryWithItems } from "@/service/Menuservice";
import { createContext, useContext, useState, type ReactNode } from "react";

interface IMenuContext {
    selectedCategory: ICategory | null;
    setSelectedCategory: (category: ICategory | null) => void;
    categoryTreeById: Record<number, ICategoryWithItems>;
    setCategoryTreeById: React.Dispatch<React.SetStateAction<Record<number, ICategoryWithItems>>>;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [categoryTreeById, setCategoryTreeById] = useState<Record<number, ICategoryWithItems>>({});

    return (
        <MenuContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            categoryTreeById,
            setCategoryTreeById
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within MenuProvider");
    }
    return context;
};