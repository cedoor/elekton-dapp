import React from "react"

export type AuthContextType = {
    _user: string | null
    signIn: (user: string) => void
    signOut: () => void
}

export default React.createContext<AuthContextType | null>(null)
