import { Flame } from "lucide-react"


const SpecialCard = () => {
    return (
        <div className="rounded-xl bg-red-400 border border-red-600 px-3 pt-[2px]">
            <div className="flex gap-2 items-center justify-center">
                <Flame className="text-white"/>
                <h1 className="font-semibold text-amber-50">Speciale!</h1>
            </div>
        </div>
    )
}

export default SpecialCard