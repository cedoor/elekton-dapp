import React from "react"
import { Text, TouchableRipple } from "react-native-paper"
import { StyleSheet } from "react-native"
import useTheme from "../../hooks/useTheme"

type Props = {
    value: number
    onPress: (value: number) => void
}

export default function TouchableDigit ({ value, onPress }: Props) {
    const theme = useTheme()

    return (
        <TouchableRipple style={[{
            borderColor: theme.colors.border, 
            borderRadius: theme.roundness
        }, styles.container, StyleSheet.absoluteFill]} 
        onPress={() => onPress(value)} borderless={true}>
            <Text>{value}</Text>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: .4
    }
})
