import React, { useEffect, useMemo, useState } from "react"
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
import { PreferencesContext } from "./context/PreferencesContext"
import LinkingConfiguration from "./constants/routes"
import { AuthContext } from "./context/AuthContext"
import RootNavigator from "./navigation/RootNavigator"
import Theme from "./constants/theme"
import { StatusBar } from "expo-status-bar"
import { Preferences, User } from "./Types"
import * as storage from "./utils/storage"

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

export default function Main () {
    const [_user, setUser] = useState<User | null>(null)
    const [_themeType, setTheme] = useState<"light" | "dark">("dark")
    const [_loading, setLoading] = useState(true)

    const combinedTheme = _themeType === "light" ? CombinedDefaultTheme : CombinedDarkTheme

    const preferences = useMemo(() => ({
        _themeType,
        async toggleTheme () {
            const themeType = _themeType === "light" ? "dark" : "light"

            await storage.setItem("@preferences", { themeType })
            setTheme(themeType)
        }
    }), [_themeType])

    const authContext = useMemo(() => ({
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

    useEffect(() => {
        (async () => {
            if (!_user) {
                const user: User = await storage.getItem("@user")

                if (user) {
                    delete user.pinCode
                    setUser(user)
                }
            }

            const preferences: Preferences = await storage.getItem("@preferences")

            if (preferences) {
                setTheme(preferences.themeType)
            }

            setLoading(false)
        })()
    })

    return (
        <AuthContext.Provider value={authContext}>
            <PaperProvider theme={combinedTheme}>
                <StatusBar style={_themeType === "light" ? "dark" : "light"} />
                <NavigationContainer linking={LinkingConfiguration} theme={combinedTheme}>
                    <PreferencesContext.Provider value={preferences}>
                        {!_loading && <RootNavigator/>}
                    </PreferencesContext.Provider>
                </NavigationContainer>
            </PaperProvider>
        </AuthContext.Provider>
    )
}
