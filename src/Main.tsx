import React, { useMemo, useState } from "react"
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer
} from "@react-navigation/native"
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider
} from "react-native-paper"
import { ThemeContext } from "./context/ThemeContext"
import LinkingConfiguration from "./constants/routes"
import { AuthContext } from "./context/AuthContext"
import RootNavigator from "./navigation/RootNavigator"
import Theme from "./constants/theme"
import { ThemeType, User } from "./Types"
import * as storage from "./utils/storage"
import { StatusBar } from "expo-status-bar"

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        ...Theme.colors.light
    },
    roundness: Theme.roundness
}
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, ...Theme.colors.dark },
    roundness: Theme.roundness
}

type Props = {
    user: User | null
    themeType: ThemeType
}

export default function Main ({user, themeType} : Props) {
    const [_themeType, setTheme] = useState(themeType)
    const [_user, setUser] = useState(user)

    const combinedTheme = _themeType === "light" ? CombinedDefaultTheme : CombinedDarkTheme

    const theme = useMemo(() => ({
        _themeType,
        async toggleTheme () {
            const themeType = _themeType === "light" ? "dark" : "light"

            await storage.setItem("@theme", { themeType })
            setTheme(themeType)
        }
    }), [_themeType])

    const auth = useMemo(() => ({
        _user,
        async signIn (username: string) {
            const users: User[] | null = await storage.getItem("@users")

            if (!users) {
                throw Error("No registered users!")
            }

            const user = users.find((u) => u.username === username)

            if (!user) {
                throw Error("This user does not exist!")
            }

            await storage.setItem("@user", user)

            delete user.pinCode

            setUser(user)
        },
        async signUp (user: User) {
            const users: User[] = (await storage.getItem("@users")) || []

            await storage.setItem("@users", [user, ...users])
            await storage.setItem("@user", user)

            setUser(user)
        },
        async signOut () {
            await storage.removeItem("@user")

            setUser(null)
        },
        unlockUser (pinCode: string) {
            if (_user) {
                setUser({..._user, pinCode})
            }
        }
    }), [_user])

    return (
        <AuthContext.Provider value={auth}>
            <ThemeContext.Provider value={theme}>
                <PaperProvider theme={combinedTheme}>
                    <StatusBar style={_themeType === "light" ? "dark" : "light"} />
                    <NavigationContainer linking={LinkingConfiguration} theme={combinedTheme}>
                        <RootNavigator/>
                    </NavigationContainer>
                </PaperProvider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}
