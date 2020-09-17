import React, { useRef } from "react"
import { Button } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import useTheme from "../hooks/useTheme"
import Modal from "./Modal"

type Props = {
    visible: boolean
    value: string
    onDismiss: (data?: string) => void
    buttons?: {title: string, onPress: () => void}[]
}

export default function QRCodeViewer ({ visible, value, onDismiss, buttons }: Props) {
    const theme = useTheme()

    let qrCodeRef: any = useRef(null)

    // const backupQRCode = () => {
    //     qrCodeRef.toDataURL(async (data: string) => {
    //         // https://github.com/joltup/rn-fetch-blob
    //         console.log(data)
    //     })
    // }

    return (
        <Modal visible={visible} onClose={onDismiss}>
            <QRCode backgroundColor="transparent" color={theme.colors.text} size={210}
                value={value} getRef={(ref) => (qrCodeRef = ref)}/>
            {/* <Button style={styles.button} mode="outlined" onPress={backupQRCode}>Backup</Button>*/}
            {buttons && buttons.map((button, index) =>
                <Button key={index} style={styles.button} mode="outlined" onPress={button.onPress}>
                    {button.title}
                </Button>
            )}
        </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        width: 210
    }
})
