import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/service/DashboardService"

const COLORS = [
    "text-red-500",
    "text-orange-500",
    "text-amber-500",
    "text-yellow-500",
    "text-lime-500",
    "text-green-500",
    "text-emerald-500",
    "text-blue-500",
    "text-violet-500",
    "text-pink-500",
]

interface IconPickerProps {
    selectedIcon: string;
    onChange: (iconName: string) => void;
}

const IconPicker = ({ selectedIcon, onChange }: IconPickerProps) => {

    const [iconColorMap] = useState(() => {
        const map = new Map<string, string>()
        ICONS.forEach(({ name }) => {
            const color = COLORS[Math.floor(Math.random() * COLORS.length)]
            map.set(name, color)
        })
        return map
    })

    const SelectedIcon = ICONS.find((i) => i.name === selectedIcon)?.icon
    const selectedColor = iconColorMap.get(selectedIcon) || "text-gray-700"

    return (
        <div className="space-y-2 w-20">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center border border-gray-400"
                    >
                        {SelectedIcon && <SelectedIcon className={`w-5 h-5 ${selectedColor}`} />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="grid grid-cols-5 gap-2">
                        {ICONS.map(({ name, icon: Icon }) => {
                            const color = iconColorMap.get(name) || "text-gray-700"
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => onChange(name)}
                                    className={`p-1 rounded hover:bg-gray-200 transition ${selectedIcon === name ? "bg-gray-300" : ""
                                        }`}
                                >
                                    <Icon className={`w-6 h-6 mx-auto ${color}`} />
                                </button>
                            )
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default IconPicker