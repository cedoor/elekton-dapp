import React, { useContext, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../context/AuthContext"
import { Button, Portal, Snackbar } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import Scanner from "../components/Scanner"
import { StackNavigationProp } from "@react-navigation/stack"
import { AuthNavigatorParamList } from "../Types"

type Props = {
    navigation?: StackNavigationProp<AuthNavigatorParamList>
}

export default function Login (props: Props) {
    const [_scannerVisibility, setScannerVisibility] = useState(false)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_snackBarMessage, setSnackBarMessage] = useState("")

    const { signIn } = useContext(AuthContext)

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
                <Button style={styles.button} mode="outlined" onPress={openScanner}>
                        Sign In
                </Button>
                <Button style={styles.button} mode="outlined" onPress={() => props.navigation?.navigate("SignUp")}>
                        Sign Up
                </Button>
            </View>

            <Portal>
                <Scanner visible={_scannerVisibility} onDismiss={closeScanner} onError={openSnackBar}/>

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
