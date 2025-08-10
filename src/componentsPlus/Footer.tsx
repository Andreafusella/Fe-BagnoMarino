import { RestaurantInfoSkeleton } from "@/components/skeleton/RestaurantInfoSkeleton"
import { useGetInfoNotAdminRestaurant } from "@/service/GeneralService"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { Phone, MapPin, Clock, Waves, Anchor } from "lucide-react"

const Footer = () => {

    const { data: infoRestaurant, isLoading } = useGetInfoNotAdminRestaurant()

    return (
        <footer className="bg-slate-900/95 backdrop-blur-sm text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-900/30 to-teal-900/30"></div>
            <div className="relative z-10 content-container py-16 lg:py-20">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Enlarged Logo Section */}
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-8">
                            <div className="relative group">
                                <div className="logo-hero-container w-32 h-32 lg:w-40 lg:h-40 rounded-4xl p-2 transition-deliveroo-slow">
                                    <img
                                        src="/logo.png"
                                        alt="Bagno Marino Logo"
                                        className="w-full h-full object-contain relative z-10"
                                    />
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-ocean-500/20 via-teal-500/15 to-ocean-500/20 rounded-5xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                            </div>
                        </div>

                    </div>

                    {/* Contact Section */}
                    <div className="text-center lg:text-left">
                        <h4 className="text-xl lg:text-2xl text-white mb-6 lg:mb-8 flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                            <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-ocean-400" />
                            Contatti
                        </h4>
                        {isLoading ? (
                            <RestaurantInfoSkeleton />
                        ) : (
                            <div className="space-y-4 lg:space-y-6 text-slate-300">
                                <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
                                    <span className="text-sm lg:text-base">{infoRestaurant?.address}</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
                                    <span className="text-sm lg:text-base">{infoRestaurant?.phone}</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
                                    <span className="text-sm lg:text-base">{infoRestaurant?.openingTime} - {infoRestaurant?.closingTime}</span>
                                </div>
                                <a href="https://www.instagram.com/bagnomarino_official?igsh=MXgxcjV1NXR6dDFhMg==" target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                                        <InstagramLogoIcon className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
                                        <span className="text-sm lg:text-base underline">bagnomarino_official</span>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>


                </div>

                {/* Footer Bottom */}
                <div className="border-t border-slate-700 mt-12 lg:mt-16 pt-8 lg:pt-10 text-center">
                    <div className="flex items-center justify-center gap-6 lg:gap-8 text-slate-400">
                        <div>
                            <Waves className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <span className="text-base lg:text-lg">© 2025 Bagno Marino - Martinsicuro</span>
                        <div>
                            <Anchor className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
