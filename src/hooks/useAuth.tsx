import React from "react"
import { useHistory } from "react-router"
import { AuthContextType } from "../context/AuthContext"

export default function useAuth(): AuthContextType {
    const [_user, setUser] = React.useState<string | null>(null)

    const history = useHistory()

    function signIn(user: string) {
        setUser(user)
        history.replace("/ballots")
    }

    function signUp() {
        setUser("pinco")
        history.replace("/ballots")
    }

    function signOut() {
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
