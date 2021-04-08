import React from "react"
import { useHistory } from "react-router"
import { AuthContextType } from "../context/AuthContext"

export default function useAuth(): AuthContextType {
    const [_user, setUser] = React.useState<string | null>(null)

    const history = useHistory()

    const signIn = (user: string) => {
        setUser(user)
        history.replace("/elections")
    }

    const signOut = () => {
        setUser(null)
        history.push("/")
    }

    return {
        _user,
        signOut,
        signIn
    }
}
