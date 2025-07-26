import { Utensils, Fish } from "lucide-react"


const CardMenuText = () => {
    return (
        <div className="text-center mb-4 lg:mb-8">
            <div className="inline-flex items-center gap-4 lg:gap-5 glass-card rounded-2xl lg:rounded-3xl px-8 lg:px-10 py-5 lg:py-6 shadow-deliveroo">
                <Utensils
                    className="w-6 h-6 lg:w-7 lg:h-7"
                    style={{ stroke: '#405fc2ff' }}
                />
                <h2 className="text-3xl lg:text-4xl text-ocean-gradient">Menu</h2>
                <Fish
                    className="w-6 h-6 lg:w-7 lg:h-7"
                    style={{ stroke: '#405fc2ff' }}
                />
            </div>
        </div>
    )
}

export default CardMenuText