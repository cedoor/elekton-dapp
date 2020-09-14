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
import { PreferencesContext } from "./context/PreferencesContext"
import LinkingConfiguration from "./constants/routes"
import { AuthContext } from "./context/AuthContext"
import RootNavigator from "./navigation/RootNavigator"
import useColorScheme from "./hooks/useColorScheme"
import Theme from "./constants/theme"
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

export default function Main () {
    const [userToken, setUserToken] = useState<string | null>("euao")
    const [themeType, setTheme] = useState<"light" | "dark">("light")

    const combinedTheme = themeType === "light" ? CombinedDefaultTheme : CombinedDarkTheme

    const toggleTheme = () => {
        setTheme((themeType) => (themeType === "light" ? "dark" : "light"))
    }

    const preferences = useMemo(
        () => ({
            themeType,
            toggleTheme
        }),
        [themeType]
    )

    const authContext = useMemo(
        () => ({
            userToken,
            signIn () {
                setUserToken("hello")
            },
            signUp () {
                setUserToken("hello")
            },
            signOut () {
                setUserToken(null)
            }
        }),
        [userToken]
    )

    return (
        <AuthContext.Provider value={authContext}>
            <PaperProvider theme={combinedTheme}>
                <StatusBar style={themeType === "light" ? "dark" : "light"} />
                <NavigationContainer linking={LinkingConfiguration} theme={combinedTheme}>
                    <PreferencesContext.Provider value={preferences}>
                        <RootNavigator/>
                    </PreferencesContext.Provider>
                </NavigationContainer>
            </PaperProvider>
        </AuthContext.Provider>
    )
}
