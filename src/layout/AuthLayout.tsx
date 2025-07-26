import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout