import { createContext, useContext, type ReactNode } from "react";

interface IAuthContext {

}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    

    return (
        <AuthContext.Provider value={{

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}