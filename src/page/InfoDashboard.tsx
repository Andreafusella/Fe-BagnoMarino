import InfoForm from "@/components/form/InfoForm"
import { SidebarTrigger } from "@/components/ui/sidebar"


const InfoDashboard = () => {
    return (
        <>
            <div className="w-full p-5">
                <div className="flex gap-2 items-center">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold">Informazioni Generali</h1>
                </div>
                <InfoForm></InfoForm>
            </div>
        </>
    )
}

export default InfoDashboard
