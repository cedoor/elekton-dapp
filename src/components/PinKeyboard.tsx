import React, { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import useTheme from "../hooks/useTheme"
import { Button, Text, TouchableRipple } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import { User } from "../Types"
import * as storage from "../utils/storage"
import Modal from "./Modal"

type Props = {
    visible: boolean
    onClose: (pinCode?: string) => void
    closeOnBackButton?: boolean
}

export default function PinKeyboard ({ visible, onClose, closeOnBackButton = true }: Props) {
    const [_pinCode, setPinCode] = useState("")
    const [_wrongCode, setWrongCode] = useState(false)

    const {signOut, _user} = useContext(AuthContext)

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
            const cachedUser: User = await storage.getItem("@user")
            
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
        <Modal visible={visible} closeOnBackButton={closeOnBackButton} onClose={close}>
            <Text style={[{borderColor: _wrongCode ? theme.colors.error : theme.colors.border}, styles.code]}>
                {"•".repeat(_pinCode.length)}
            </Text>
            <View style={[{borderColor: theme.colors.border}, styles.keyboard]}>
                <View style={[{borderColor: theme.colors.border}, styles.keyboardRow]}>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(1)}>
                        <Text>1</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(2)}>
                        <Text>2</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(3)}>
                        <Text>3</Text>
                    </TouchableRipple>
                </View>
                <View style={styles.keyboardRow}>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(4)}>
                        <Text>4</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(5)}>
                        <Text>5</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(6)}>
                        <Text>6</Text>
                    </TouchableRipple>
                </View>
                <View style={styles.keyboardRow}>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(7)}>
                        <Text>7</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(8)}>
                        <Text>8</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(9)}>
                        <Text>9</Text>
                    </TouchableRipple>
                </View>
                <View style={styles.keyboardRow}>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={removeDigit}>
                        <MaterialCommunityIcons name="backspace" size={20} color={theme.colors.text} />
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={() => addDigit(0)}>
                        <Text>0</Text>
                    </TouchableRipple>
                    <TouchableRipple style={[{borderColor: theme.colors.border}, styles.keyboardNumber]}
                        onPress={sendCode}>
                        <MaterialCommunityIcons name="check" size={20} color={theme.colors.text} />
                    </TouchableRipple>
                </View>
            </View>
            {!!_user && <Button style={styles.button} mode="outlined" onPress={signOut}>Sign Out</Button>}
        </Modal>
    )
}

const styles = StyleSheet.create({
    code: {
        borderWidth: .4,
        marginTop: 20,
        padding: 10,
        width: 210,
        letterSpacing: 15,
        textAlign: "center"
    },
    keyboard: {
        alignItems: "center",
        marginTop: 20,
        borderLeftWidth: .4,
        borderTopWidth: .4
    },
    keyboardRow: {
        flexDirection: "row"
    },
    keyboardNumber: {
        height: 50,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: .4,
        borderBottomWidth: .4
    },
    button: {
        marginTop: 30,
        width: 210
    }
})
