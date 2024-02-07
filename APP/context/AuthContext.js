import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){

    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}