import React, { useContext, useState } from "react"
import { Appbar, Menu } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { StackHeaderProps } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { PreferencesContext } from "../context/PreferencesContext"
import { MaterialIcons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"

export default function Header ({ scene, previous, navigation }: StackHeaderProps | any) {
    const [_menuVisibility, setMenuVisibility] = useState(false)

    const { userToken } = useContext(AuthContext)
    const { themeType, toggleTheme } = useContext(PreferencesContext)

    const theme = useTheme()

    const openMenu = () => setMenuVisibility(true)
    const closeMenu = () => setMenuVisibility(false)

    return (
        <Appbar.Header
            style={[{backgroundColor: theme.colors.background}, styles.header]}>
            {!previous && userToken && <Appbar.Action onPress={navigation.openDrawer} icon="menu"/>}
            {previous && <Appbar.BackAction onPress={navigation.goBack} />}

            <Appbar.Content title={scene.descriptor.options.title} />

            <Menu contentStyle={{backgroundColor: theme.colors.surface}}
                visible={_menuVisibility}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action color={theme.colors.text}
                        onPress={openMenu} icon="dots-vertical"/>
                }>
                <Menu.Item onPress={toggleTheme} 
                    title={themeType === "light" ? "Dark theme" : "Light theme"}
                    titleStyle={styles.item}
                    icon="theme-light-dark"/>
                {!userToken &&
                    <Menu.Item onPress={() => console.log("Pressed")}
                        title="Verify elections"
                        titleStyle={styles.item}
                        icon={({ color, size }) => (
                            <MaterialIcons name="verified-user" color={color} size={size} />
                        )}/>
                }
            </Menu>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 0
    },
    item: {
        marginLeft: -10
    }
})
