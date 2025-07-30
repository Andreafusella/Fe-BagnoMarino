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
            </div>
            <div className="px-5">
                <ItemListDashboard/>
            </div>
        </>
    )
}

export default MenuDashboard