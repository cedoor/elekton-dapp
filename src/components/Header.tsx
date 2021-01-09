import React, { useContext, useState } from "react"
import { Appbar, Menu } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { StackHeaderProps } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { ThemeContext } from "../context/ThemeContext"
import { AuthContext } from "../context/AuthContext"
import { bindWithFalse, bindWithTrue } from "../utils/helper"

export default function Header({ scene, previous, navigation }: StackHeaderProps | any) {
    const { _user } = useContext(AuthContext)
    const { _themeType, toggleTheme } = useContext(ThemeContext)

    const [_menuVisibility, setMenuVisibility] = useState(false)

    const theme = useTheme()

    return (
        <Appbar.Header style={[{ backgroundColor: theme.colors.background }, styles.header]}>
            {!previous && _user && <Appbar.Action onPress={navigation.openDrawer} icon="menu" />}
            {previous && <Appbar.BackAction onPress={navigation.goBack} />}

            <Appbar.Content title={scene.descriptor.options.title} />

            <Menu
                contentStyle={{ backgroundColor: theme.colors.surface }}
                visible={_menuVisibility}
                onDismiss={bindWithFalse(setMenuVisibility)}
                anchor={
                    <Appbar.Action
                        color={theme.colors.text}
                        onPress={bindWithTrue(setMenuVisibility)}
                        icon="dots-vertical"
                    />
                }
            >
                <Menu.Item
                    onPress={toggleTheme}
                    title={_themeType === "light" ? "Dark theme" : "Light theme"}
                    titleStyle={styles.item}
                    icon="theme-light-dark"
                />
                {/* {!user &&*/}
                {/*    <Menu.Item onPress={() => console.log("Pressed")}*/}
                {/*        title="Verify elections"*/}
                {/*        titleStyle={styles.item}*/}
                {/*        icon={({ color, size }) => (*/}
                {/*            <MaterialIcons name="verified-user" color={color} size={size} />*/}
                {/*        )}/>*/}
                {/* }*/}
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
