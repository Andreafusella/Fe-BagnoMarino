import type { IItem } from "@/service/Menuservice";
import ItemCard from "./ItemCard";

interface IItemListProps {
  item: IItem[];
}

const ItemList = ({ item }: IItemListProps) => {
  return (
    <div>
      {item.map((item, index) => (
        <div key={item.id} className="my-4">
            <ItemCard item={item} />

        </div>
      ))}
    </div>
  );
};

export default ItemList;