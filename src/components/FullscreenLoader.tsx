import React from "react"
import { ActivityIndicator, Colors } from "react-native-paper"
import { Modal, StyleSheet, View } from "react-native"

type Props = {
    visible: boolean
}

export default function FullscreenLoader({ visible }: Props) {
    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="fade">
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.grey200} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        flex: 1,
        justifyContent: "center"
    }
})
