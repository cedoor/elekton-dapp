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
}

export default function Modal ({ visible, onClose, closeOnBackButton, children }: Props) {
    const theme = useTheme()

    return (
        <OriginalModal visible={visible} onDismiss={onClose} dismissable={closeOnBackButton} contentContainerStyle={[{
            backgroundColor: theme.colors.background
        }, styles.container]}>
            <View style={styles.modalBox}>
                {children}
            </View>
            <View style={[{
                borderColor: theme.colors.border
            }, styles.messageBox]}>
                <Text>Scan the QR code with your personal key</Text>
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
        borderTopWidth: .4,
        paddingVertical: 20,
        marginHorizontal: 20,
        marginTop: -Constants.statusBarHeight,
        alignItems: "center"
    }
})
