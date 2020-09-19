import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import useTheme from "../../hooks/useTheme"
import { IconButton, Text } from "react-native-paper"
import TouchableDigit from "./TouchableDigit"

type Props = {
    onConfirm: (pinCode: string) => void,
    max?: number,
    checkFunction?: (pinCode: string) => boolean | Promise<boolean>
}

export default function PinKeyboard ({ onConfirm, max = 10, checkFunction }: Props) {
    const [_pinCode, setPinCode] = useState("")
    const [_error, setError] = useState(false)

    const theme = useTheme()

    const addDigit = (digit: number) => {
        if (_pinCode.length < max) {
            setPinCode(_pinCode + digit)
            setError(false)
        }
    }

    const removeDigit = () => {
        const pinCode = _pinCode.slice(0, -1)

        setPinCode(pinCode)
        setError(pinCode.length === 0)
    }

    const confirmPinCode = async () => {
        if (!_pinCode || (checkFunction && !(await checkFunction(_pinCode)))) {
            setError(true)
            return
        }

        onConfirm(_pinCode)
    }

    return (
        <View style={styles.container}>
            <Text style={[{
                borderColor: _error ? theme.colors.error : theme.colors.primary
            }, styles.pinCode]}>
                {"•".repeat(_pinCode.length)}
            </Text>
            <View style={styles.keyboard}>
                <View style={[{borderColor: theme.colors.border}, styles.keyboardRow]}>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={1} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={2} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={3} onPress={addDigit}/>
                    </View>
                </View>
                <View style={styles.keyboardRow}>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={4} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={5} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={6} onPress={addDigit}/>
                    </View>
                </View>
                <View style={styles.keyboardRow}>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={7} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={8} onPress={addDigit}/>
                    </View>
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={9} onPress={addDigit}/>
                    </View>
                </View>
                <View style={styles.keyboardRow}>
                    <IconButton style={styles.keyboardItem} color={theme.colors.placeholder}
                        icon="backspace" size={24} onPress={removeDigit} />
                    <View style={styles.keyboardItem}>
                        <TouchableDigit value={0} onPress={addDigit}/>
                    </View>
                    <IconButton style={styles.keyboardItem} color={theme.colors.primary}
                        icon="check" size={24} onPress={confirmPinCode} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    pinCode: {
        borderBottomWidth: .4,
        borderStyle: "solid",
        paddingBottom: 10,
        width: 230,
        fontSize: 20,
        letterSpacing: 15,
        textAlign: "center"
    },
    keyboard: {
        marginTop: 20
    },
    keyboardRow: {
        flexDirection: "row"
    },
    keyboardItem: {
        height: 50,
        width: 70,
        margin: 5
    }
})
