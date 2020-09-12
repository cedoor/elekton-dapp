import React, { useEffect, useState } from "react"
import { Modal } from "react-native-paper"
import { StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"

type Props = {
    visible: boolean
    onDismiss: (data?: string) => void
    onError: (message: string) => void
}

export default function Scanner ({ visible, onDismiss, onError }: Props) {
    const [_hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()

            if (status !== "granted") {
                onError("No access to camera")
                return
            }

            setHasPermission(true)
        })()
    })

    return (
        <Modal visible={visible && _hasPermission} onDismiss={onDismiss} contentContainerStyle={styles.container}>
            <BarCodeScanner onBarCodeScanned={({data}) => onDismiss(data)} style={StyleSheet.absoluteFillObject}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    }
})
