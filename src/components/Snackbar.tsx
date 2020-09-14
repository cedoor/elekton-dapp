import React from "react"
import { Snackbar as OriginalSnackbar, Text } from "react-native-paper"
import useTheme from "../hooks/useTheme"

type Props = {
    visible: boolean
    message: string
    onDismiss: () => void
}

export default function Snackbar ({ visible, message, onDismiss }: Props) {
    const theme = useTheme()

    return (
        <OriginalSnackbar style={{backgroundColor: theme.colors.surface}}
            visible={visible}
            duration={OriginalSnackbar.DURATION_MEDIUM}
            onDismiss={onDismiss}
            action={{
                label: "Ok",
                onPress: onDismiss
            }}>
            <Text>{message}</Text>
        </OriginalSnackbar>
    )
}
