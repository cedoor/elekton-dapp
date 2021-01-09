import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import Modal from "./Modal"
import { Text } from "react-native-paper"

type Props = {
    visible: boolean
    onClose: (data?: string) => void
    onError: (message: string) => void
}

export default function Scanner({ visible, onClose, onError }: Props) {
    const [_hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        ;(async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()

            if (status !== "granted") {
                onError("No access to camera")
                return
            }

            setHasPermission(true)
        })()
    }, [])

    return (
        <Modal visible={visible && _hasPermission} onClose={onClose} message="Scan the QR code with your personal key">
            <BarCodeScanner onBarCodeScanned={({ data }) => onClose(data)} style={styles.scanner} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    scanner: {
        flex: 1,
        width: 210
    }
})
