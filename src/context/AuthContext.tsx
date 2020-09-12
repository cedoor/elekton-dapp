import React from "react"

type AuthContextType = {
    userToken: string | null
    signIn: () => void
    signUp: () => void
    signOut: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
    userToken: null,
    signIn () {
        return 
    },
    signUp () {
        return 
    },
    signOut () {
        return 
    }
})
