import React, { useContext, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import { Appbar, Button, Menu, Portal, Snackbar } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import useTheme from "../hooks/useTheme"
import { PreferencesContext } from "../context/PreferencesContext"
import Scanner from "../components/Scanner"

export default function Login () {
    const [_menuVisibility, setMenuVisibility] = useState(false)
    const [_scannerVisibility, setScannerVisibility] = useState(false)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_snackBarMessage, setSnackBarMessage] = useState("")

    const { signIn, signUp } = useContext(AuthContext)
    const { themeType, toggleTheme } = useContext(PreferencesContext)

    const theme = useTheme()

    const closeSnackBar = () => setSnackBarVisibility(false)
    const openSnackBar = (message: string) => {
        setSnackBarMessage(message)
        setSnackBarVisibility(true)
    }

    const closeScanner = (data?: string) => {
        setScannerVisibility(false)

        if (data) {
            signIn()
        }
    }
    const openScanner = () => setScannerVisibility(true)

    const closeMenu = () => setMenuVisibility(false)
    const openMenu = () => setMenuVisibility(true)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Menu contentStyle={{backgroundColor: theme.colors.surface}}
                    visible={_menuVisibility}
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
                    <Button style={styles.button} mode="outlined" onPress={openScanner}>
                        Sign In
                    </Button>
                    <Button style={styles.button} mode="outlined" onPress={() => signUp()}>
                        Sign Up
                    </Button>
                </View>
            </View>

            <Scanner visible={_scannerVisibility} onDismiss={closeScanner} onError={openSnackBar}/>

            <Portal>
                <Snackbar visible={_snackBarVisibility}
                    duration={Snackbar.DURATION_MEDIUM} onDismiss={closeSnackBar}
                    action={{ label: "Ok", onPress: closeSnackBar }}>
                    {_snackBarMessage}
                </Snackbar>
            </Portal>
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
