import type { IItem } from "@/service/Menuservice";
import Allergen from "./Allergen";
import { Snowflake, Sparkles } from "lucide-react";

interface ItemCardProps {
  item: IItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border-0 bg-white shadow-sm opacity-80">
      {/* Top section */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 sm:space-y-3 max-w-[75%]">
          <h1 className="text-lg sm:text-2xl font-bold sm:font-semibold break-words">{item.name}</h1>
          <p className="text-[13px] sm:text-[15px] text-gray-600">{item.description}</p>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-cyan-800 font-poppins whitespace-nowrap">
          {item.price.toFixed(2)}
          <span className="text-cyan-600">€</span>
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
        {item.special && (
          <div className="flex gap-2 items-center rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700">
            <Sparkles size={20} className="text-yellow-400" /> Speciale
          </div>
        )}
        {item.frozen && (
          <span className="flex gap-2 items-center rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
            {item.frozen && <Snowflake size={20} className="text-cyan-500" />} Congelato
          </span>
        )}
      </div>
      {item.allergenes.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2 mt-4 items-start sm:items-center">
          <h1 className="text-sm sm:text-base font-bold">Allergeni:</h1>
          <div className="flex flex-wrap gap-2">
            {item.allergenes.map((allergen, index) => (
              <Allergen key={index} allergen={allergen} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;