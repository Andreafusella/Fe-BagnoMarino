import CardHeaderItemList from "@/components/CardHeaderItemList";
import CardMenuText from "@/components/CardMenuText";
import CategoryList from "@/components/CategoryList";
import ItemList from "@/components/ItemList";
import { useMenu } from "@/context/MenuContext";
import { useGetCategoriesNotSubCategory, useGetCategoryWithSubItems, type ICategoryWithItems } from "@/service/Menuservice";
import { Loader2 } from "lucide-react";

const MenuAndCategory = () => {
  const { selectedCategory } = useMenu();

  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesNotSubCategory();
  const {
    data: categoryTree,
    isLoading: loadingItems,
    isError,
  } = useGetCategoryWithSubItems(selectedCategory?.id ?? null);

  const renderCategoryTree = (category: ICategoryWithItems) => {
    const shouldRenderCard = category.items.length > 0;

    return (
      <div key={category.id}>
        {shouldRenderCard && (
          <>
            <CardHeaderItemList
              category={{ id: category.id, name: category.name, icon: category.icon }}
              numberPlate={category.items.length}
            />
            <ItemList item={category.items} />
          </>
        )}
        {category.subcategories?.map(renderCategoryTree)}
      </div>
    );
  };


  return (
    <section className="beach-menu-bg relative">
      <div className="content-container">
        <CardMenuText />

        {loadingCategories ? (
          <div className="flex justify-center items-center space-x-2 py-4">
            <Loader2 size={100} className="animate-spin text-blue-300" />
          </div>
        ) : (
          <CategoryList categories={categories} />
        )}

        {loadingItems ? (
          <div className="flex justify-center items-center space-x-2 py-4">
            <Loader2 size={100} className="animate-spin text-blue-300" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 mt-8">Errore nel caricamento</div>
        ) : categoryTree && categoryTree.items.length === 0 && categoryTree.subcategories.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Nessun prodotto disponibile per questa categoria.
          </div>
        ) : categoryTree ? (
          renderCategoryTree(categoryTree)
        ) : null}
      </div>
    </section>
  );
};

export default MenuAndCategory;