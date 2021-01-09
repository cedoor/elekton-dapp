import React from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"
import useTheme from "../hooks/useTheme"

type Props = {
    visible: boolean
    message?: string
}

export default function BackgroundLoader({ visible, message = "" }: Props) {
    const theme = useTheme()

    return !visible ? null : (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={theme.colors.primary} size={20} />
            <Text style={[{ color: theme.colors.placeholder }, styles.message]}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 10
    },
    message: {
        marginLeft: 10,
        fontSize: 13
    }
})
