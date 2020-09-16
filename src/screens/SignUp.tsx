import React, { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import TextInput from "../components/TextInput"
import { Button, Dialog, Portal, Subheading } from "react-native-paper"
import { AuthContext } from "../context/AuthContext"
import Picker from "../components/Picker"
import QRCodeViewer from "../components/QRCodeViewer"
import Snackbar from "../components/Snackbar"
import PinKeyboard from "../components/PinKeyboard"
import useTheme from "../hooks/useTheme"

export default function SignUp () {
    const { signUp } = useContext(AuthContext)

    const [_name, setName] = useState<string | null>(null)
    const [_surname, setSurname] = useState<string | null>(null)
    const [_username, setUsername] = useState<string | null>(null)
    const [_role, setRole] = useState(0)
    const [_pinCode, setPinCode] = useState<string | null>(null)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_dialogVisibility, setDialogVisibility] = useState(false)
    const [_QRCodeViewerVisibility, setQRCodeViewerVisibility] = useState(false)
    const [_PinCodeVisibility, setPinCodeVisibility] = useState(false)

    const theme = useTheme()

    const closeSnackBar = () => setSnackBarVisibility(false)
    const openSnackBar = () => setSnackBarVisibility(true)

    const closeDialog = () => setDialogVisibility(false)
    const showDialog = () => {
        if (formHasErrors()) {
            openSnackBar()

            return
        }

        setDialogVisibility(true)
    }

    const closeQRCodeViewer = () => setQRCodeViewerVisibility(false)
    const openQRCodeViewer = () => setQRCodeViewerVisibility(true)

    const openPinKeyboard = () => setPinCodeVisibility(true)
    const closePinKeyboard = async (code: string) => {
        setPinCodeVisibility(false)
        setPinCode(code)
        openQRCodeViewer()
    }

    const createPinCode = async () => {
        closeDialog()
        openPinKeyboard()
    }

    const formHasErrors = () =>
        _name === null || _surname === null || _username === null

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <TextInput label="Name"
                        onBlurText={setName}
                        errors={(name) =>
                            name.length === 0 ? "Name is required" :
                                name.length > 30 ? "Name is too long" : ""
                        }
                        maxLength={20}/>
                    <TextInput label="Surname"
                        onBlurText={setSurname}
                        errors={(surname) =>
                            surname.length === 0 ? "Surname is required" :
                                surname.length > 30 ? "Surname is too long" : ""
                        }
                        maxLength={20} />
                    <TextInput label="Username"
                        onBlurText={setUsername}
                        errors={(username) =>
                            username.length === 0 ? "Username is required" :
                                username.length > 30 ? "Username is too long" : ""
                        }
                        maxLength={15} />
                    <Picker selectedValue={_role} onValueChange={setRole} items={["Elector", "Admin"]} />
                </View>

                <Button style={styles.createButton} mode="outlined" onPress={showDialog}>
                    Create
                </Button>

                <Portal>
                    <QRCodeViewer value={_username as string} visible={_QRCodeViewerVisibility} 
                        onDismiss={closeQRCodeViewer}
                        buttons={[{ title: "Sign Up", onPress: () => signUp({
                            name: _name as string,
                            surname: _surname as string,
                            username: _username as string,
                            role: _role as number,
                            pinCode: _pinCode as string
                        }) }]}/>

                    <PinKeyboard visible={_PinCodeVisibility} onDismiss={closePinKeyboard} />

                    <Dialog style={{backgroundColor: theme.colors.background}} 
                        visible={_dialogVisibility} onDismiss={closeDialog}>
                        <Dialog.Title>User creation</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Are you sure you want to create this user?</Subheading>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={closeDialog}>No</Button>
                            <Button onPress={createPinCode}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Snackbar visible={_snackBarVisibility} onDismiss={closeSnackBar}
                        message="Fill out all the fields or fix the errors!"/>
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
