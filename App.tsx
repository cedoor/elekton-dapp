import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Main from "./src/Main"
import { ThemeType, User } from "./src/Types"
import cache from "./src/utils/cache"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"

export default function App() {
    const [_isLoadingComplete, setLoadingComplete] = useState(false)
    const [_user, setUser] = useState<User | null>(null)
    const [_themeType, setThemeType] = useState<"light" | "dark">("light")

    // Load any resources or data that we need prior to rendering the app.
    useEffect(() => {
        ;(async () => {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load fonts.
                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
                })

                // Load user if it exists.
                const user: User | null = await cache.getUser()

                if (user) {
                    delete user.pinCode
                    setUser(user)
                }

                // Load theme if it exists.
                const themeType: ThemeType | null = await cache.getTheme()

                if (themeType) {
                    setThemeType(themeType)
                }
            } catch (e) {
                // We might want to provide this error information to an error reporting service.
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        })()
    }, [])

    if (!_isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                <Main user={_user} themeType={_themeType} />
            </SafeAreaProvider>
        )
    }
}
