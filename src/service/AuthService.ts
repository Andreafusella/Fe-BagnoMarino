import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import axiosInstance from "@/api/axiosInstance"

export interface ILogin {
  token: string
}

export function useLogin() {
  const navigate = useNavigate();

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        const response = await axiosInstance.post<ILogin>("/auth/login", data);

        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard-menu");
      } catch (error) {
        console.error("Login fallito", error);
        throw error;
      }
    },
    [navigate]
  );

  return login;
}