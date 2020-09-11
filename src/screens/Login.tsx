import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import { Appbar, Button, Menu } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import useTheme from "../hooks/useTheme"
import { PreferencesContext } from "../context/PreferencesContext"

export default function Login () {
    const [visible, setVisible] = React.useState(false)

    const { signIn, signUp } = React.useContext(AuthContext)
    const { themeType, toggleTheme } = React.useContext(PreferencesContext)

    const theme = useTheme()

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
                    <Menu.Item onPress={() => console.log("Pressed")}
                        title="Verify elections"
                        titleStyle={styles.menuItemTitle}
                        icon={({ color, size }) => (
                            <MaterialIcons name="verified-user" color={color} size={size} />
                        )}/>
                </Menu>
            </View>
            <View style={styles.content}>
                <View style={{ alignItems: "center" }}>
                    <Image style={styles.logo} 
                        source={theme.dark
                            ? require("../../assets/images/dark-icon.png")
                            : require("../../assets/images/icon.png")} />
                    <Text style={[{ color: theme.colors.primary }, styles.logoText]}>Elekton</Text>
                </View>
                <View>
                    <Button style={styles.button} mode="outlined" onPress={() => signUp()}>
                        Sign Up
                    </Button>
                    <Button style={styles.button} mode="outlined" onPress={() => signIn()}>
                        Sign In
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingHorizontal: 10,
        paddingVertical: 30,
        flex: 1
    },
    header: {
        flexDirection: "row-reverse"
    },
    menuItemTitle: {
        marginLeft: -10
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
    },
    button: {
        marginBottom: 10,
        width: 250
    },
    logo: {
        width: 160,
        height: 160
    },
    logoText: {
        marginTop: 10,
        fontSize: 26
    }
})
