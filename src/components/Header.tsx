import React, { useContext, useState } from "react"
import { Appbar, Menu } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { StackHeaderProps } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { PreferencesContext } from "../context/PreferencesContext"

export default function Header ({ scene, previous, navigation }: StackHeaderProps | any) {
    const [visible, setVisible] = useState(false)

    const { themeType, toggleTheme } = useContext(PreferencesContext)
    const theme = useTheme()

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <Appbar.Header
            style={[{backgroundColor: theme.colors.background}, styles.header]}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : (
                <Appbar.Action onPress={navigation.openDrawer}
                    icon="menu"/>
            )}

            <Appbar.Content title={scene.descriptor.options.title} />

            <Menu contentStyle={{backgroundColor: theme.colors.surface}}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action color={theme.colors.text}
                        onPress={openMenu} icon="dots-vertical"/>
                }>
                <Menu.Item onPress={toggleTheme} 
                    title={themeType === "light" ? "Dark theme" : "Light theme"}
                    titleStyle={styles.menuItemTitle}
                    icon="theme-light-dark"/>
            </Menu>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 0
    },
    menuItemTitle: {
        marginLeft: -10
    }
})
