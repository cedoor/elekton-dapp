import React, { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import useTheme from "../../hooks/useTheme"
import { Button } from "react-native-paper"
import { AuthContext } from "../../context/AuthContext"
import { User } from "../../Types"
import cache from "../../utils/cache"
import Modal from "../Modal"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Constants from "expo-constants"
import PinKeyboard from "./PinKeyboard"

type Props = {
    visible: boolean
    onClose: (pinCode?: string) => void
    closeOnBackButton?: boolean
}

export default function PinKeyboardModal({ visible, onClose, closeOnBackButton = true }: Props) {
    const { _user, signOut } = useContext(AuthContext)

    const theme = useTheme()

    const checkFunction = async (pinCode: string) => {
        if (!_user) {
            return true
        }

        const user: User = await cache.getUser()

        return pinCode === user.pinCode
    }

    return (
        <Modal
            visible={visible}
            closeOnBackButton={closeOnBackButton}
            onClose={onClose}
            message={!_user ? "Set a pin code to encrypt your key" : "Unlock your account with your pin code"}
        >
            <View style={styles.topIcon}>
                <MaterialCommunityIcons name="lock" size={24} color={theme.colors.placeholder} />
            </View>
            <View style={styles.content}>
                <PinKeyboard onConfirm={onClose} max={6} checkFunction={checkFunction} />
                {!!_user && (
                    <Button style={styles.button} onPress={signOut}>
                        Sign Out
                    </Button>
                )}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    topIcon: {
        alignItems: "center",
        marginTop: Constants.statusBarHeight + 20
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        marginTop: 30
    }
})
