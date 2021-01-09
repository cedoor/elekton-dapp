import React, { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import TextInput from "../components/TextInput"
import { Button, Dialog, Portal, Subheading } from "react-native-paper"
import { AuthContext } from "../context/AuthContext"
import Picker from "../components/Picker"
import QRCodeViewer from "../components/QRCodeViewer"
import Snackbar from "../components/Snackbar"
import PinKeyboardModal from "../components/PinKeyboardModal/PinKeyboardModal"
import useTheme from "../hooks/useTheme"
import FullscreenLoader from "../components/FullscreenLoader"
import { bindWithFalse } from "../utils/helper"

export default function SignUp() {
    const { signUp } = useContext(AuthContext)

    const [_name, setName] = useState<string | null>(null)
    const [_surname, setSurname] = useState<string | null>(null)
    const [_username, setUsername] = useState<string | null>(null)
    const [_role, setRole] = useState(0)
    const [_pinCode, setPinCode] = useState<string | null>(null)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_dialogVisibility, setDialogVisibility] = useState(false)
    const [_QRCodeViewerVisibility, setQRCodeViewerVisibility] = useState(false)
    const [_pinKeyboardVisibility, setPinKeyboardVisibility] = useState(false)
    const [_loadingVisibility, setLoadingVisibility] = useState(false)

    const theme = useTheme()

    const showConfirmDialog = () => {
        if (formHasErrors()) {
            setSnackBarVisibility(true)

            return
        }

        setDialogVisibility(true)
    }

    const showPinKeyboard = async () => {
        setPinKeyboardVisibility(true)
        setDialogVisibility(false)
    }

    const addPinCode = async (pinCode?: string) => {
        if (pinCode) {
            setPinCode(pinCode)
            setQRCodeViewerVisibility(true)
        }

        setPinKeyboardVisibility(false)
    }

    const createUser = async () => {
        setLoadingVisibility(true)

        await signUp({
            name: _name as string,
            surname: _surname as string,
            username: _username as string,
            role: _role as number,
            pinCode: _pinCode as string
        })
    }

    const formHasErrors = () => _name === null || _surname === null || _username === null

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <TextInput
                        label="Name"
                        onBlurText={setName}
                        errors={(name) =>
                            name.length === 0 ? "Name is required" : name.length > 30 ? "Name is too long" : ""
                        }
                        maxLength={20}
                    />
                    <TextInput
                        label="Surname"
                        onBlurText={setSurname}
                        errors={(surname) =>
                            surname.length === 0
                                ? "Surname is required"
                                : surname.length > 30
                                ? "Surname is too long"
                                : ""
                        }
                        maxLength={20}
                    />
                    <TextInput
                        label="Username"
                        onBlurText={setUsername}
                        errors={(username) =>
                            username.length === 0
                                ? "Username is required"
                                : username.length > 30
                                ? "Username is too long"
                                : ""
                        }
                        maxLength={15}
                    />
                    <Picker selectedValue={_role} onValueChange={setRole} items={["Elector", "Admin"]} />
                </View>

                <Button style={styles.createButton} mode="outlined" onPress={showConfirmDialog}>
                    Create
                </Button>

                <Portal>
                    <FullscreenLoader visible={_loadingVisibility} />

                    <QRCodeViewer
                        value={_username as string}
                        visible={_QRCodeViewerVisibility}
                        onDismiss={bindWithFalse(setQRCodeViewerVisibility)}
                        buttons={[{ title: "Sign Up", onPress: createUser }]}
                    />

                    <PinKeyboardModal visible={_pinKeyboardVisibility} onClose={addPinCode} />

                    <Dialog
                        style={{ backgroundColor: theme.colors.background }}
                        visible={_dialogVisibility}
                        onDismiss={bindWithFalse(setDialogVisibility)}
                    >
                        <Dialog.Title>User creation</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Are you sure you want to create this user?</Subheading>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={bindWithFalse(setDialogVisibility)}>No</Button>
                            <Button onPress={showPinKeyboard}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Snackbar
                        visible={_snackBarVisibility}
                        onDismiss={bindWithFalse(setSnackBarVisibility)}
                        message="Fill out all the fields or fix the errors!"
                    />
                </Portal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    createButton: {
        marginTop: 20
    }
})
