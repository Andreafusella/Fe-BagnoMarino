import type { IAllergenes } from "@/service/Menuservice";

interface IAllergenesProps {
    allergen: IAllergenes;
}

function Allergen( { allergen }: IAllergenesProps) {
    return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center p-2 gap-2">
            <h1 className="text-xs">{allergen.symbol}</h1>
            <h1 className="text-orange-400 text-xs">{allergen.name}</h1>
        </div>
    )
}

export default Allergen