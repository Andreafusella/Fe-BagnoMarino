import CardHeaderItemList from "@/components/CardHeaderItemList";
import CardMenuText from "@/components/CardMenuText";
import CategoryList from "@/components/CategoryList";
import ItemList from "@/components/ItemList";
import { useMenu } from "@/context/MenuContext";
import { getCategoriesNotSubCategory, getCategoryWithSubItems, type ICategory, type ICategoryWithItems } from "@/service/Menuservice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const MenuAndCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { selectedCategory, categoryTreeById, setCategoryTreeById } = useMenu();
    const [loadingItem, setLoadingItem] = useState<boolean>(false);
    const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
    const [categoryTree, setCategoryTree] = useState<ICategoryWithItems | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategory(true)
            try {
                const data = await getCategoriesNotSubCategory();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoadingCategory(false)
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;

        const existingTree = categoryTreeById[selectedCategory.id];
        if (existingTree) {
            setCategoryTree(existingTree);
            return;
        }

        const fetchCategoryTree = async () => {
            setLoadingItem(true);
            try {
                const data = await getCategoryWithSubItems(selectedCategory.id);
                setCategoryTree(data);
                setCategoryTreeById(prev => ({
                    ...prev,
                    [selectedCategory.id]: data
                }));
            } catch (error) {
                console.error("Failed to fetch category tree:", error);
            } finally {
                setLoadingItem(false);
            }
        };

        fetchCategoryTree();
    }, [selectedCategory]);

    const renderCategoryTree = (category: ICategoryWithItems) => (
        <div key={category.id}>
            <CardHeaderItemList category={{ id: category.id, name: category.name, icon: category.icon }} numberPlate={category.items.length} />
            <ItemList item={category.items} />
            {category.subcategories?.map(subcat => renderCategoryTree(subcat))}
        </div>
    );

    return (
        <section className="beach-menu-bg pb-20 lg:pb-24 relative">
            <div className="content-container">
                <CardMenuText />

                {loadingCategory ? (
                    <div className="flex justify-center items-center space-x-2 py-4">
                        <Loader2 size={100} className="animate-spin text-blue-300" />
                    </div>
                ) : (
                    <CategoryList categories={categories} />
                )}
                {loadingItem ? (
                    <div className="flex justify-center items-center space-x-2 py-4">
                        <Loader2 size={100} className="animate-spin text-blue-300" />
                    </div>
                ) : !categoryTree ? (
                    <></>
                ) : categoryTree.items.length === 0 && categoryTree.subcategories.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        Nessun prodotto disponibile per questa categoria.
                    </div>
                ) : (
                    renderCategoryTree(categoryTree)
                )}
            </div>
        </section>
    );
};

export default MenuAndCategory;