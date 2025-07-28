import NewCategoryDialog from "@/components/dialog/NewCategoryDialog"
import NewItemDialog from "@/components/dialog/NewItemDialog"
import { getAllergenesAdmin, getAllCategory, type IAllergenesDto } from "@/service/DashboardService"
import { getCategoriesNotSubCategory, type ICategory } from "@/service/Menuservice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const MenuDashboard = () => {

    const [categoriesNotSubCategory, setCategoriesNotSubCategory] = useState<ICategory[]>([])
    const [allergenes, setAllergenes] = useState<IAllergenesDto[]>([])
    const [allCategories, setAllCategories] = useState<ICategory[]>([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesNotSubCategory = async () => {
            try {
                const data = await getCategoriesNotSubCategory();
                setCategoriesNotSubCategory(data);
            } catch (error) {
                console.log(error);
                
            }
        }
        const fetchAllergenes = async () => {
            try {
                const data = await getAllergenesAdmin();
                setAllergenes(data?.data || []);
            } catch (error: any) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/login");
                } else {
                    console.log("Errore generico", error);
                }
            }
        }
        const fetchCategories = async () => {
            try {
                const data = await getAllCategory();
                setAllCategories(data.data);
            } catch (error: any) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/login");
                } else {
                    console.log("Errore generico", error);
                }
            }
        }



        fetchCategoriesNotSubCategory()
        fetchCategories()
        fetchAllergenes()
    }, [])

    return (
        <>
            <div className="w-full px-5">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gestione Menu</h1>
                    <div className="flex gap-2">
                        <NewCategoryDialog categories={categoriesNotSubCategory}></NewCategoryDialog>
                        <NewItemDialog allergenes={allergenes} categories={allCategories}></NewItemDialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuDashboard