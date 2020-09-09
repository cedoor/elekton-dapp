import React from "react"

type AuthContextType = {
    signIn: () => void
    signUp: () => void
    signOut: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
    signIn() {return},
    signUp() {return},
    signOut() {return}
})
