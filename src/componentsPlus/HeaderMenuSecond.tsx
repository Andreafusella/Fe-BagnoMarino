import { Fish, Sparkles, Pizza, ChefHat, Shell, ShipWheel } from "lucide-react"

interface IHeaderMenuSecondProps {
    title: string;
    descritpion: string;
}


const HeaderMenuSecond = ({ title, descritpion }: IHeaderMenuSecondProps) => {
    return (
        <section className="relative py-12 lg:py-14 overflow-hidden">
            <div className="wave-decoration absolute bottom-0 left-0 w-full h-20"></div>
            <div className="content-container">
                <div className="text-center space-y-4 lg:space-y-5">
                    <div className="flex items-center justify-center gap-5 lg:gap-6 mb-6">
                        <div className="animate-float-ocean">
                            <Fish
                                className="w-7 h-7 lg:w-8 lg:h-8"
                                style={{ stroke: '#0011ffff' }}
                            />
                        </div>
                        <div className="animate-float-ocean" style={{ animationDelay: '1s' }}>
                            <ShipWheel
                                className="w-8 h-8 lg:w-9 lg:h-9"
                                style={{ stroke: '#0d9488' }}
                            />
                        </div>
                        <div className="animate-float-ocean" style={{ animationDelay: '2s' }}>
                            <Pizza
                                className="w-7 h-7 lg:w-8 lg:h-8"
                                style={{ stroke: '#f97316' }}
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl lg:text-5xl xl:text-6xl text-ocean-gradient mb-4 lg:mb-5 font-bold tracking-tight leading-tight">
                        {title}
                    </h2>

                    <div className="flex items-center justify-center gap-6 lg:gap-8 pt-3 lg:pt-4 flex-wrap">
                        <div className="flex items-center gap-2 text-ocean-900">
                            <Shell
                                className="w-4 h-4"
                                style={{ stroke: '#5ce76aff' }}
                            />
                            <span className="font-medium text-sm">Pesce</span>
                        </div>
                        <div className="w-1 h-1 bg-ocean-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-ocean-900">
                            <ChefHat
                                className="w-4 h-4"
                                style={{ stroke: '#814a2bff' }}
                            />
                            <span className="font-medium text-sm">Carne</span>
                        </div>
                        <div className="w-1 h-1 bg-ocean-300 rounded-full"></div>
                        <div className="flex items-center gap-2 text-ocean-900">
                            <Pizza
                                className="w-4 h-4"
                                style={{ stroke: '#ef4444' }}
                            />
                            <span className="font-medium text-sm">Pizza</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeaderMenuSecond