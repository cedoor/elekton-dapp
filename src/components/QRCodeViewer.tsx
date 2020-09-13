import React, { useRef } from "react"
import { Button, Modal, Text } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import useTheme from "../hooks/useTheme"

type Props = {
    visible: boolean
    value: string
    onDismiss: (data?: string) => void
    buttons?: {title: string, onPress: () => void}[]
}

export default function QRCodeViewer ({ visible, value, onDismiss, buttons }: Props) {
    const theme = useTheme()

    let qrCodeRef: any = useRef(null)

    const backupQRCode = () => {
        qrCodeRef.toDataURL(async (data: string) => {
            // https://github.com/joltup/rn-fetch-blob
            console.log(data)
        })
    }

    return (
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[{
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness
        }, styles.container]}>
            <View style={{borderWidth: 0, borderColor: theme.colors.border}}>
                <QRCode backgroundColor="transparent" color={theme.colors.text} size={200} 
                    value={value} getRef={(ref) => (qrCodeRef = ref)}/>
            </View>
            <Text style={styles.message}>
                Your private key has been generated, in the future you will need to
                scan the related qr code to login, backup it and keep it safe!
            </Text>
            <Button style={styles.button} mode="outlined" onPress={backupQRCode}>Backup</Button>
            {buttons && buttons.map((button, index) =>
                <Button key={index} style={styles.button} mode="outlined" onPress={button.onPress}>
                    {button.title}
                </Button>
            )}
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 20,
        marginHorizontal: 20
    },
    message: {
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    button: {
        marginBottom: 10,
        width: 200
    }
})
