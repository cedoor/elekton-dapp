import React, { ReactElement } from "react"
import { Modal as OriginalModal, Text } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import useTheme from "../hooks/useTheme"
import Constants from "expo-constants"

type Props = {
    visible: boolean
    onClose: () => void
    closeOnBackButton?: boolean
    children: ReactElement | ReactElement[] | any
    message: string
}

export default function Modal({ visible, onClose, closeOnBackButton, children, message }: Props) {
    const theme = useTheme()

    return (
        <OriginalModal
            visible={visible}
            onDismiss={onClose}
            dismissable={closeOnBackButton}
            contentContainerStyle={[
                {
                    backgroundColor: theme.colors.background
                },
                styles.container
            ]}
        >
            <View style={styles.modalBox}>{children}</View>
            <View
                style={[
                    {
                        borderColor: theme.colors.border
                    },
                    styles.messageBox
                ]}
            >
                <Text style={styles.message}>{message}</Text>
            </View>
        </OriginalModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    messageBox: {
        borderTopWidth: 0.4,
        paddingVertical: 20,
        marginHorizontal: 20,
        marginTop: -Constants.statusBarHeight
    },
    message: {
        textAlign: "center"
    }
})
