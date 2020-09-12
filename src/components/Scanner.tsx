import React, { useEffect, useState } from "react"
import { Modal, Text } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner"

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
        <Modal visible={visible && _hasPermission} onDismiss={onDismiss} contentContainerStyle={{
            flex: 1,
            margin: 20
        }}>
            <BarCodeScanner onBarCodeScanned={({data}) => onDismiss(data)} style={StyleSheet.absoluteFillObject}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    scanner: {
        height: 100
    }
})
