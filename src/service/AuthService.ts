import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"

const { VITE_BACKEND_URL } = import.meta.env

export interface ILogin {
  token: string
}

export function useLogin() {
    const navigate = useNavigate()
  
    const login = useCallback(async (data: { email: string; password: string }) => {
      try {
        const response = await axios.post<ILogin>(`${VITE_BACKEND_URL}/auth/login`, data)
  
        const token = response.data.token
        localStorage.setItem("token", token)
        navigate("/dashboard-admin")
      } catch (error) {
        console.error("Login fallito", error)
        throw error
      }
    }, [navigate])
  
    return login
  }