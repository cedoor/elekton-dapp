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
import linkingConfiguration from "./constants/routes"
import { AuthContext } from "./context/AuthContext"
import RootNavigator from "./navigation/RootNavigator"
import theme from "./constants/theme"
import { ThemeType, User } from "./Types"
import cache from "./utils/cache"
import { StatusBar } from "expo-status-bar"

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        ...theme.colors.light
    },
    roundness: theme.roundness
}
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, ...theme.colors.dark },
    roundness: theme.roundness
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

            await cache.setTheme(themeType)
            setTheme(themeType)
        }
    }), [_themeType])

    const auth = useMemo(() => ({
        _user,
        async signIn (username: string) {
            const users: User[] | null = await cache.getUsers()

            if (!users) {
                throw Error("No registered users!")
            }

            const user = users.find((u) => u.username === username)

            if (!user) {
                throw Error("This user does not exist!")
            }

            await cache.setUser(user)

            delete user.pinCode

            setUser(user)
        },
        async signUp (user: User) {
            const users: User[] = (await cache.getUsers()) || []

            await cache.setUsers([user, ...users])
            await cache.setUser(user)

            setUser(user)
        },
        async signOut () {
            await cache.removeUser()

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
                    <NavigationContainer linking={linkingConfiguration} theme={combinedTheme}>
                        <RootNavigator/>
                    </NavigationContainer>
                </PaperProvider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}
