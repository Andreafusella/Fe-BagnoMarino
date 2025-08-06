import { HandPlatter, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"

const items = [
    { title: "Gestione Menù", icon: HandPlatter, url: "/dashboard-menu" },
    { title: "Informazioni", icon: Settings, url: "/dashboard-info" },
]

export function AppSidebar() {

    const location = useLocation()
    const { setOpenMobile } = useSidebar()

    useEffect(() => {
        setOpenMobile(false) 
    }, [location.pathname, setOpenMobile])

    return (
        <Sidebar >
            <SidebarHeader>
                <div className="flex gap-2 items-center">
                    <div className="bg-sky-400 p-1 rounded-xl">
                        <img src="/logoIcon.png" alt="" className="h-10" />
                    </div>
                    <div>
                        <h1 className="font-semibold">Bagno Marino</h1>
                        <h1 className="text-xs text-gray-500">Dashboard</h1>
                    </div>
                </div>
            </SidebarHeader>
            <hr />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url} className="flex items-center gap-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Pulsante finale in stile ASCII o logout */}
            <div className="p-4 border-t text-sm text-gray-600">
                <button className="w-full text-left hover:text-black">Logout</button>
            </div>
        </Sidebar>
    )
}