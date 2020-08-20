import React from 'react';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider
} from "react-native-paper";
import {PreferencesContext} from './context/PreferencesContext';
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import {AuthContext} from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import useColorScheme from "./hooks/useColorScheme";
import Colors from "./constants/Colors";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";

const CombinedDefaultTheme = {
    ...PaperDefaultTheme, ...NavigationDefaultTheme,
    colors: {...PaperDefaultTheme.colors, ...NavigationDefaultTheme.colors, ...Colors.light}
};
const CombinedDarkTheme = {
    ...PaperDarkTheme, ...NavigationDarkTheme,
    colors: {...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, ...Colors.dark}
};

export default function Main() {
    const colorScheme = useColorScheme();
    const [themeType, setTheme] = React.useState<'light' | 'dark'>(
        colorScheme === 'dark' ? 'dark' : 'light'
    );
    const combinedTheme: any = themeType === 'light' ? CombinedDefaultTheme : CombinedDarkTheme;

    function toggleTheme() {
        setTheme(themeType => (themeType === 'light' ? 'dark' : 'light'));
    }

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            themeType,
        }),
        [themeType]
    );

    const [userToken, setUserToken] = React.useState<string | null>("hello");

    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken("hello")
        },
        signUp: () => {
            setUserToken("hello")
        },
        signOut: () => {
            setUserToken(null)
        },
    }), [])

    return (
        <AuthContext.Provider value={authContext}>
            <PaperProvider theme={combinedTheme}>
                <StatusBar style={themeType === "light" ? "dark" : "light"}/>
                <NavigationContainer linking={LinkingConfiguration} theme={combinedTheme}>
                    <PreferencesContext.Provider value={preferences}>
                        <RootNavigator userToken={userToken}/>
                    </PreferencesContext.Provider>
                </NavigationContainer>
            </PaperProvider>
        </AuthContext.Provider>
    );
};