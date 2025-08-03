import type { ICategory } from "@/service/Menuservice"
import CategoryCard from "./CategoryCard"
import { useMenu } from "@/context/MenuContext";
import { useMemo } from "react";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";

interface ICategoryListProps {
    categories: ICategory[]
}

const iconColors = [
    "text-red-500",
    "text-orange-500",
    "text-amber-500",
    "text-yellow-500",
    "text-lime-500",
    "text-green-500",
    "text-emerald-500",
    "text-blue-500",
    "text-violet-500",
    "text-pink-500",
];

const CategoryList = ({ categories }: ICategoryListProps) => {

    const { setSelectedCategory, selectedCategory } = useMenu();

    const { ref } = useDraggableScroll<HTMLDivElement>();

    const handleCategoryClick = (category: ICategory) => {
        setSelectedCategory(category);
    };

    const categoryColors = useMemo(() => {
        const assigned: Record<number, string> = {};
        categories.forEach((cat) => {
            assigned[cat.id] =
                iconColors[Math.floor(Math.random() * iconColors.length)];
        });
        return assigned;
    }, [categories]);

    return (
        <div className="mb-2 lg:mb-4">
            <div className="mx-4 lg:mx-8 px-0 lg:px-6 pt-10 pb-0 lg:pt-12 lg:pb-6">
                <div ref={ref} className="overflow-x-auto py-6 lg:pb-6 no-scrollbar">
                    <div className="flex gap-4 lg:gap-5 min-w-max px-8 sm:px-10 lg:px-12">
                        {categories.map((category, index) => (
                            <CategoryCard
                                key={category.id}
                                title={category.name}
                                icon={category.icon}
                                selected={selectedCategory?.id === category.id}
                                onClick={() => handleCategoryClick(category)}
                                iconColor={categoryColors[category.id]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryList

