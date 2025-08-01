import NewCategoryDialog from "@/components/dialog/NewCategoryDialog"
import NewItemDialog from "@/components/dialog/NewItemDialog"
import ItemListDashboard from "@/componentsPlus/ItemListDashboard";
import { useGetAllCategory, useGetAllergenesAdmin } from "@/service/DashboardService"

const MenuDashboard = () => {

    const { data: categories = [], refetch } = useGetAllCategory();
    const { data: allergenes = []} = useGetAllergenesAdmin();

    return (
        <>
            <div className="w-full px-5">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gestione Menu</h1>
                    <div className="flex gap-2">
                        <NewCategoryDialog categories={categories} onCategoryCreated={refetch}></NewCategoryDialog>
                        <NewItemDialog allergenes={allergenes} categories={categories} onCategoryCreated={refetch}></NewItemDialog>
                    </div>
                </div>
                {categories.length == 0 &&
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center space-y-2 p-9 border-2 border-gray-300 rounded-2xl shadow-lg">
                            <h1 className="sm:text-xl md:text-3xl font-semibold">Menu vuoto</h1>
                            <h1 className="md:text-xl text-gray-600">Al momento non sono presenti item o categorie. <br /> Inizia a comporre il tuo menu creando una categoria</h1>
                        </div>
                    </div>
                }
            </div>
            <div className="px-5">
                <ItemListDashboard/>
            </div>
        </>
    )
}

export default MenuDashboard