import { Fonts } from "react-native-paper/src/types"

export type ElectionNavigatorParamList = {
    Elections: undefined
    ElectionDetails: Election
    CreateElection: undefined
}

export type AuthNavigatorParamList = {
    Login: undefined
    SignUp: undefined
}

export type ThemeType = "light" | "dark"

export type User = {
    name: string
    surname: string
    username: string
    role: number
    pinCode?: string
}

export type Election = {
    id: number
    title: string
    description: string
    admin: string
    startDate: number
    endDate: number
    options: string[]
}

type Mode = "adaptive" | "exact"

export type Theme = {
    dark: boolean
    mode?: Mode
    roundness: number
    colors: {
        primary: string
        background: string
        surface: string
        accent: string
        error: string
        text: string
        onSurface: string
        onBackground: string
        disabled: string
        placeholder: string
        backdrop: string
        notification: string
        card: string
        border: string
    }
    fonts: Fonts
    animation: {
        scale: number
    }
}
