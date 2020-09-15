import React from "react"
import { User } from "../Types"

type AuthContextType = {
    user: User | null
    signIn: (username: string) => Promise<void>
    signUp: (user: User) => Promise<void>
    signOut: () => Promise<void>
    unlockUser: (pinCode: string) => void
}

export const AuthContext = React.createContext<AuthContextType>({
    user: null,
    signIn: () => Promise.resolve(),
    signUp: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    unlockUser: () => undefined
})
