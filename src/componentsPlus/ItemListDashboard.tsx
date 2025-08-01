import CardItemDashboard from "@/components/CardItemDashboard";
import { useGetItemWithCategory } from "@/service/DashboardService";


const ItemListDashboard = () => {

    const { data: allItem } = useGetItemWithCategory();

    return (
        <div>
            {allItem?.map((item, index) => (
                <CardItemDashboard key={index} item={item}/>
            ))}
        </div>
    )
}

export default ItemListDashboard