import { BallotInputData } from "elekton/dist/types/types"

export default [
    {
        name: "Parliamentary cut",
        description: "Do you want to reduce the number of parliamentarians?",
        startDate: 1598018870924,
        endDate: 1598105270924,
        proposals: ["Yes", "No"],
        voterPublicKeys: ["Pinco", "Pallino"]
    },
    {
        name: "Regional ballot",
        description: "Which party do you want to vote for?",
        startDate: 1599562562693,
        endDate: 1599684522693,
        proposals: ["PSI", "PA", "DC"],
        voterPublicKeys: ["Pinco", "Pallino"]
    },
    {
        name: "National ballot",
        description: "Which party do you want to vote for?",
        startDate: 1598018870924,
        endDate: 1598105270924,
        proposals: ["PSI", "PA", "DC"],
        voterPublicKeys: ["Pinco", "Pallino"]
    }
] as BallotInputData[]
