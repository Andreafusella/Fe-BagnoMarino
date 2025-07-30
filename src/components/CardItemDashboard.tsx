import type { IItemWithCategoryDto } from "@/service/DashboardService"
import Allergen from "./Allergen"
import { getLucideIconByName } from "@/service/GeneralService"
import { Pencil, Trash2 } from "lucide-react"

interface ICardItemDashboardProps {
  item: IItemWithCategoryDto
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const CardItemDashboard = ({ item, onEdit, onDelete }: ICardItemDashboardProps) => {
  const IconComponent = getLucideIconByName(item.categoryIcon)

  return (
    <div className="rounded-2xl border border-gray-300 bg-white shadow-md p-4 space-y-4">
      {/* Header Categoria */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-3">
          <IconComponent className="w-7 h-7 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">{item.category}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(item.categoryId)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete?.(item.categoryId)}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {item.items.map((i) => (
          <div
            key={i.id}
            className="rounded-xl border border-gray-200 p-3 bg-gray-50 hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800 text-base">{i.name}</h3>
              <span className="text-sm font-semibold text-gray-700">€ {i.price.toFixed(2)}</span>
            </div>
            {i.description && (
              <p className="text-sm text-gray-600 mt-1">{i.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {i.allergenes.map((allergen) => (
                <Allergen allergen={allergen} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
              {i.available && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Disponibile</span>}
              {i.special && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Speciale</span>}
              {i.frozen && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Congelato</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardItemDashboard
