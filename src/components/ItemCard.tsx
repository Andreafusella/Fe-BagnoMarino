import type { IItem } from "@/service/Menuservice";
import Allergen from "./Allergen";
import SpecialCard from "./SpecialCard";
import FrozenCard from "./FrozenCard";

interface ItemCardProps {
  item: IItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border-0 bg-white shadow-sm opacity-80">
      {/* Top section */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 sm:space-y-3 max-w-[75%]">
          <div className="flex gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold">{item.name}</h1>
            {item.special && <SpecialCard></SpecialCard>}
            {item.frozen && <FrozenCard></FrozenCard>}
          </div>
          <p className="text-sm sm:text-[15px] text-gray-600">{item.description}</p>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-cyan-800 font-poppins whitespace-nowrap">
          {item.price.toFixed(2)}
          <span className="text-cyan-600">€</span>
        </p>
      </div>

      { item.allergenes.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2 mt-4 items-start sm:items-center">
          <h1 className="text-sm sm:text-base font-bold">Allergeni:</h1>
          <div className="flex flex-wrap gap-2">
            {item.allergenes.map((allergen, index) => (
              <Allergen key={index} allergen={allergen}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;