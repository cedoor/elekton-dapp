import { Ballot } from "elekton/dist/types/Ballot"
import { BallotInputData, UserInputData } from "elekton/dist/types/types"
import { User } from "elekton/dist/types/User"
import React from "react"

export type ElektonContextType = {
    _user: User | null | undefined
    _users: User[]
    _ballots: Ballot[]
    signIn: (accessKey: string) => Promise<void>
    signUp: (user: User) => void
    signOut: () => void
    createUser: (data: UserInputData) => Promise<User | null>
    createBallot: (data: BallotInputData) => Promise<void>
    vote: (ballot: Ballot, vote: number) => Promise<void>
}

export default React.createContext<ElektonContextType | null>(null)
