import React from "react"
import { Ballot } from "elekton/dist/types/Ballot"
import { Elekton } from "elekton/dist/types/Elekton"
import { BallotInputData, UserInputData } from "elekton/dist/types/types"
import { User } from "elekton/dist/types/User"
import { ElektonContextType } from "../context/ElektonContext"

export default function useElekton(elekton: Elekton): ElektonContextType {
    const [_user, setUser] = React.useState<User | null | undefined>()
    const [_users, setUsers] = React.useState<User[]>([])
    const [_ballots, setBallots] = React.useState<Ballot[]>([])

    React.useEffect(() => {
        ;(async function () {
            const ballots = await elekton.retrieveBallots(Infinity)
            const users = await elekton.retrieveUsers(Infinity)
            const accessKey = localStorage.getItem("user")

            if (ballots.length > 0) {
                setBallots(ballots)
            }

            if (users.length > 0) {
                setUsers(users)
            }

            if (accessKey) {
                signIn(accessKey)
            } else {
                setUser(null)
            }
        })()
    }, [])

    React.useEffect(() => {
        return elekton.onBallotCreated((ballot) => {
            setBallots([..._ballots, ballot])
        })
    }, [_ballots])

    React.useEffect(() => {
        return elekton.onUserCreated((user) => {
            setUsers([..._users, user])
        })
    }, [_users])

    async function signIn(accessKey: string) {
        const keys = accessKey.split(",")
        const privateKey = keys[0]
        const voterPrivateKey = keys[1]

        const user = await elekton.retrieveUser(privateKey)

        if (user) {
            user.voterPrivateKey = voterPrivateKey

            setUser(user)
            localStorage.setItem("user", accessKey)
        }
    }

    function signUp(user: User) {
        localStorage.setItem("user", user.privateKey + "," + user.voterPrivateKey)
        setUser(user)
    }

    function signOut() {
        localStorage.removeItem("user")
        setUser(null)
    }

    async function createUser(data: UserInputData): Promise<User | null> {
        return await elekton.createUser(data)
    }

    async function createBallot(data: BallotInputData) {
        if (_user) {
            await _user.createBallot(data)
        }
    }

    async function vote(ballot: Ballot, vote: number) {
        if (_user) {
            await ballot.vote(_user, vote)
        }
    }

    return {
        _user,
        _users,
        _ballots,
        signIn,
        signUp,
        signOut,
        createUser,
        createBallot,
        vote
    }
}
