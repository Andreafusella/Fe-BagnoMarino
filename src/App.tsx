import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Menu from './page/Menu'
import Login from './page/Login'
import AuthLayout from './layout/AuthLayout'
import MenuDashboard from './page/MenuDashboard'
import InfoDashboard from './page/InfoDashboard'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Menu />} />
        </Route>

        <Route path='/login' element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route path='/dashboard-menu' element={<MenuDashboard />} />
          <Route path='/dashboard-info' element={<InfoDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App