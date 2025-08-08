import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Phone, Clock } from "lucide-react"

export function RestaurantInfoSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6 text-slate-300">
      <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
        <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
        <Skeleton className="h-4 w-40 lg:h-5 lg:w-48 bg-gray-600" />
      </div>
      <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
        <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
        <Skeleton className="h-4 w-32 lg:h-5 lg:w-40 bg-gray-600" />
      </div>
      <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
        <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-ocean-400 flex-shrink-0" />
        <Skeleton className="h-4 w-28 lg:h-5 lg:w-36 bg-gray-600" />
      </div>
    </div>
  )
}