import React, { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import useTheme from "../hooks/useTheme"
import { Button, IconButton, Text } from "react-native-paper"
import { AuthContext } from "../context/AuthContext"
import { User } from "../Types"
import cache from "../utils/cache"
import Modal from "./Modal"
import TouchableDigit from "./TouchableDigit"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Constants from "expo-constants"

type Props = {
    visible: boolean
    onClose: (pinCode?: string) => void
    closeOnBackButton?: boolean
}

export default function PinKeyboard ({ visible, onClose, closeOnBackButton = true }: Props) {
    const {signOut, _user} = useContext(AuthContext)

    const [_pinCode, setPinCode] = useState("")
    const [_wrongCode, setWrongCode] = useState(false)

    const theme = useTheme()

    const addDigit = (digit: number) => {
        if (_pinCode.length < 6) {
            setPinCode(_pinCode + digit)
            setWrongCode(false)
        }
    }

    const removeDigit = () => {
        setPinCode(_pinCode.slice(0, -1))
        setWrongCode(false)
    }

    const sendCode = async () => {
        if (_pinCode.length === 0) {
            setWrongCode(true)
            return
        }

        if (_user) {
            const cachedUser: User = await cache.getUser()
            
            if (_pinCode !== cachedUser.pinCode) {
                setWrongCode(true)
                return
            }
        }

        close(_pinCode)
    }

    const close = (pinCode?: string) => {
        onClose(pinCode)
        setPinCode("")
    }

    return (
        <Modal visible={visible} closeOnBackButton={closeOnBackButton} onClose={close}
            message={!_user ? "Set a pin code to encrypt your key" : "Unlock your account with your pin code"}>
            <View style={styles.container}>
                <View style={styles.topIcon}>
                    <MaterialCommunityIcons name="lock" size={24} color={theme.colors.placeholder}/>
                </View>
                <View style={styles.pinKeyboard}>
                    <Text style={[{
                        borderColor: _wrongCode ? theme.colors.error : theme.colors.primary
                    }, styles.pinCode]}>
                        {"•".repeat(_pinCode.length)}
                    </Text>
                    <View style={[{borderColor: theme.colors.border}, styles.keyboard]}>
                        <View style={[{borderColor: theme.colors.border}, styles.keyboardRow]}>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={1} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={2} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={3} onPress={addDigit}/>
                            </View>
                        </View>
                        <View style={styles.keyboardRow}>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={4} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={5} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={6} onPress={addDigit}/>
                            </View>
                        </View>
                        <View style={styles.keyboardRow}>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={7} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={8} onPress={addDigit}/>
                            </View>
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={9} onPress={addDigit}/>
                            </View>
                        </View>
                        <View style={styles.keyboardRow}>
                            <IconButton style={styles.keyboardButton} color={theme.colors.placeholder}
                                icon="backspace" size={24} onPress={removeDigit} />
                            <View style={styles.keyboardNumber}>
                                <TouchableDigit value={0} onPress={addDigit}/>
                            </View>
                            <IconButton style={styles.keyboardButton} color={theme.colors.primary}
                                icon="check" size={24} onPress={sendCode} />
                        </View>
                    </View>
                    {!!_user && <Button style={styles.button} onPress={signOut}>Sign Out</Button>}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"  
    },
    topIcon: {
        marginTop: Constants.statusBarHeight + 20
    },
    pinKeyboard: {
        flex: 1, justifyContent: "center"
    },
    pinCode: {
        borderBottomWidth: .4,
        borderStyle: "solid",
        marginTop: 20,
        padding: 10,
        width: 230,
        fontSize: 20,
        letterSpacing: 15,
        textAlign: "center"
    },
    keyboard: {
        alignItems: "center",
        marginTop: 20
    },
    keyboardRow: {
        flexDirection: "row"
    },
    keyboardNumber: {
        height: 50,
        width: 70,
        margin: 5
    },
    keyboardButton: {
        height: 50,
        width: 70,
        margin: 5
    },
    button: {
        marginTop: 30
    }
})
