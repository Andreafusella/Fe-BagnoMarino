import { getLucideIconByName } from "@/service/GeneralService";
import type { ICategory } from "@/service/Menuservice"

interface ICardHeaderItemListProps {
    category: ICategory | null;
    numberPlate: number;
}

const CardHeaderItemList = ({ category, numberPlate }: ICardHeaderItemListProps) => {
    const IconComponent = getLucideIconByName(category!.icon);

    return (
        <div className="flex justify-center pt-10">
            <div
                className="inline-flex items-center gap-3 lg:gap-4 rounded-xl lg:rounded-2xl px-6 lg:px-8 py-4 lg:py-5 shadow-deliveroo mx-auto border border-solid border-[#f2e8cf] bg-[#fef6e4]">
                
                <div
                    className="p-2 lg:p-3 rounded-xl shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, #f4a261, #e76f51)',
                    }}
                >
                    <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>

                <h3 className="text-xl lg:text-2xl font-medium text-[#264653] leading-tight">
                    {category!.name}
                </h3>

                <div className="text-white border-0 px-4 lg:px-4 py-2 lg:py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#2a9d8f] to-[#219ebc]">
                    {numberPlate} piatti
                </div>

                
            </div>
        </div>
    )
}

export default CardHeaderItemList