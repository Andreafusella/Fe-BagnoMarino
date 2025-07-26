import { Anchor, Shell, Fish, Pizza, Waves, Sun } from "lucide-react"


const HeaderLogoIcon = () => {
    return (
        <div className="content-container py-6 lg:py-8 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4">

                {/* Central Logo - The Main Title */}
                <div className="relative group">
                    <div className="logo-hero-container w-32 h-32 lg:w-40 lg:h-40 rounded-4xl p-2 transition-deliveroo-slow">
                        <img
                            src="/public/logo.png"
                            className="w-full h-full object-contain relative z-10"
                        />
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-ocean-500/20 via-teal-500/15 to-ocean-500/20 rounded-5xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>

                {/* Subtitle Information */}
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3" style={{ color: '#164e63' /* ocean-700 */ }}>
                        <Anchor className="w-5 h-5" style={{ stroke: '#424242ff' }} />
                        <span className="text-base lg:text-lg font-medium">Chalet • Martinsicuro</span>
                        <Shell className="w-5 h-5" style={{ stroke: '#75d7faff' }} />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <Fish className="w-5 h-5" style={{ stroke: '#2002ffff' /* ocean-600 */ }} />
                        <span className="text-sm lg:text-base font-medium" style={{ color: '#256d6d' }}>Pesce fresco dell'Adriatico</span>
                        <Pizza className="w-5 h-5" style={{ stroke: '#f97316' /* coral-600 */ }} />
                    </div>
                </div>

                {/* Decorative Icons Row */}
                <div className="flex items-center justify-center gap-8 opacity-60 pt-2">
                    <div className="animate-float-ocean">
                        <Waves className="w-6 h-6" style={{ stroke: '#38bdf8' /* ocean-500 (azzurro) */ }} />
                    </div>
                    <div className="animate-float-ocean" style={{ animationDelay: '1.5s' }}>
                        <Sun className="w-5 h-5" style={{ stroke: '#facc15' /* sand-500 (giallo sabbia) */ }} />
                    </div>
                    <div className="animate-float-ocean" style={{ animationDelay: '3s' }}>
                        <Shell className="w-5 h-5" style={{ stroke: '#fb923c' /* coral-500 */ }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderLogoIcon
