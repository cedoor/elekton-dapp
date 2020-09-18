import React, { useContext, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import { Button, Portal } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import Scanner from "../components/Scanner"
import { StackNavigationProp } from "@react-navigation/stack"
import { AuthNavigatorParamList } from "../Types"
import Snackbar from "../components/Snackbar"
import Loader from "../components/Loader"
import { bindWithFalse, bindWithTrue } from "../utils/helper"

type Props = {
    navigation?: StackNavigationProp<AuthNavigatorParamList>
}

export default function Login (props: Props) {
    const { signIn } = useContext(AuthContext)

    const [_scannerVisibility, setScannerVisibility] = useState(false)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_snackBarMessage, setSnackBarMessage] = useState("")
    const [_loadingVisibility, setLoadingVisibility] = useState(false)

    const theme = useTheme()

    const tryLogin = async (username?: string) => {
        setScannerVisibility(false)

        if (username) {
            try {
                setLoadingVisibility(true)
                await signIn(username)
            } catch (error) {
                setLoadingVisibility(false)
                showError(error.message)
            }
        }
    }

    const showError = (message: string) => {
        setSnackBarMessage(message)
        setSnackBarVisibility(true)
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image style={styles.logo}
                    source={theme.dark
                        ? require("../../assets/images/dark-icon.png")
                        : require("../../assets/images/icon.png")} />
                <Text style={[{ color: theme.colors.primary }, styles.logoText]}>Elekton</Text>
            </View>
            <View>
                <Button style={styles.button} mode="outlined" onPress={bindWithTrue(setScannerVisibility)}>
                        Sign In
                </Button>
                <Button style={styles.button} mode="outlined"
                    onPress={() => props.navigation?.navigate("SignUp")}>
                        Sign Up
                </Button>
            </View>

            <Portal>
                <Loader visible={_loadingVisibility} />
                <Scanner visible={_scannerVisibility} onClose={tryLogin} onError={showError}/>
                <Snackbar visible={_snackBarVisibility} onDismiss={bindWithFalse(setSnackBarVisibility)}
                    message={_snackBarMessage}/>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 16,
        paddingVertical: 40,
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
