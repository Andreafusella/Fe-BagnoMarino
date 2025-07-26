import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div className="min-h-screen modern-ocean-bg relative overflow-hidden layout-stable ">
            <Outlet></Outlet>
        </div>
    )
}

export default Layout