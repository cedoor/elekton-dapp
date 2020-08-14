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
import {useColorScheme} from 'react-native-appearance';
import {PreferencesContext} from './context/PreferencesContext';
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import DrawerContent from "./components/DrawerContent";
import {createDrawerNavigator} from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";

const CombinedDefaultTheme = {
    ...PaperDefaultTheme, ...NavigationDefaultTheme,
    colors: {...PaperDefaultTheme.colors, ...NavigationDefaultTheme.colors}
};
const CombinedDarkTheme = {
    ...PaperDarkTheme, ...NavigationDarkTheme,
    colors: {...PaperDarkTheme.colors, ...NavigationDarkTheme.colors}
};

const Drawer = createDrawerNavigator();

export function Main() {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = React.useState<'light' | 'dark'>(
        colorScheme === 'dark' ? 'dark' : 'light'
    );
    const combinedTheme: any = theme === 'light' ? CombinedDarkTheme : CombinedDefaultTheme;

    function toggleTheme() {
        setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
    }

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            theme,
        }),
        [theme]
    );

    return (
        <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={combinedTheme}>
                <NavigationContainer linking={LinkingConfiguration} theme={combinedTheme}>
                    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                        <Drawer.Screen name="root" component={StackNavigator}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </PreferencesContext.Provider>
    );
};