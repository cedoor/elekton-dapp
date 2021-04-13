import React from "react"
import { useHistory } from "react-router"
import { AuthContextType } from "../context/AuthContext"

export default function useAuth(): AuthContextType {
    const user = localStorage.getItem("user")
    const [_user, setUser] = React.useState<string | null>(user)

    const history = useHistory()

    function signIn(user: string) {
        localStorage.setItem("user", user)
        setUser(user)
        history.replace("/ballots")
    }

    function signUp(user: string) {
        signIn(user)
    }

    function signOut() {
        localStorage.removeItem("user")
        setUser(null)
        history.push("/")
    }

    return {
        _user,
        signIn,
        signUp,
        signOut
    }
}
