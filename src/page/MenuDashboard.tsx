import NewCategoryDialog from "@/components/dialog/NewCategoryDialog"
import NewItemDialog from "@/components/dialog/NewItemDialog"
import { SidebarTrigger } from "@/components/ui/sidebar";
import ItemListDashboard from "@/componentsPlus/ItemListDashboard";
import { useGetAllCategory, useGetAllergenesAdmin, useGetInfoPlateCategoryRestaurant } from "@/service/DashboardService"
import { useGetCategoriesNotSubCategory } from "@/service/Menuservice";

const MenuDashboard = () => {

    const { data: categoriesNotSub = [], refetch } = useGetCategoriesNotSubCategory();
    const { data: allCategories = [] } = useGetAllCategory();
    const { data: allergenes = [] } = useGetAllergenesAdmin();
    const { data: infoPlateCategory } = useGetInfoPlateCategoryRestaurant()

    return (
        <>
            <div className="w-full p-5">
                <div className="w-full flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-2 items-center">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold">Gestione Menu</h1>
                    </div>

                    {/* Box info (Disponibili, Non Disponibili, Categorie) */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="p-4 border border-gray-200 flex flex-col sm:flex-row gap-3 rounded-2xl items-start sm:items-center">
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-cyan-500">Disponibili:</h1>
                                <span className="text-cyan-600">{infoPlateCategory?.itemAvailable}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-cyan-500">Non Disponibili:</h1>
                                <span className="text-cyan-600">{infoPlateCategory?.itemNotAvailable}</span>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 flex items-center gap-2 rounded-2xl">
                            <h1 className="font-bold text-orange-600">Categorie:</h1>
                            <span className="text-orange-600">{infoPlateCategory?.category}</span>
                        </div>
                    </div>

                    {/* Bottoni */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <NewCategoryDialog
                            categories={categoriesNotSub}
                            onCategoryCreated={refetch}
                        />
                        <NewItemDialog
                            allergenes={allergenes}
                            categories={allCategories}
                            onCategoryCreated={refetch}
                        />
                    </div>
                </div>

                {/* Stato menu vuoto
                {categoriesNotSub.length === 0 && (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center space-y-2 p-9 border-2 border-gray-300 rounded-2xl shadow-lg">
                            <h1 className="sm:text-xl md:text-3xl font-semibold">Menu vuoto</h1>
                            <h1 className="md:text-xl text-gray-600">
                                Al momento non sono presenti item o categorie. <br /> Inizia a comporre il tuo menu creando una categoria
                            </h1>
                        </div>
                    </div>
                )} */}
            </div>

            <div className="px-5">
                <ItemListDashboard />
            </div>
        </>
    )
}

export default MenuDashboard