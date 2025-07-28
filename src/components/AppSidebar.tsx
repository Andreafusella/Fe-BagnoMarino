import { Home, Calendar, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const items = [
    { title: "Dashboard", icon: Home, url: "/dashboard-admin" },
    { title: "Gestione Menù", icon: Calendar, url: "/dashboard-menu" },
    { title: "Informazioni", icon: Settings, url: "/dashboard-info" },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex gap-2 items-center">
                    <div className="bg-sky-400 p-1 rounded-xl">
                        <img src="/public/logoIcon.png" alt="" className="h-10" />
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