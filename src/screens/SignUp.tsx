import React, { useContext, useState } from "react"
import { Picker, ScrollView, StyleSheet, View } from "react-native"
import TextInput from "../components/TextInput"
import { Button, Dialog, Portal, Snackbar, Subheading } from "react-native-paper"
import * as storage from "../utils/storage"
import { User } from "../Types"
import { AuthContext } from "../context/AuthContext"
import useTheme from "../hooks/useTheme"

export default function SignUp () {
    const [_name, setName] = useState<string | null>(null)
    const [_surname, setSurname] = useState<string | null>(null)
    const [_username, setUsername] = useState<string | null>(null)
    const [_role, setRole] = useState<0 | 1>(0)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_dialogVisibility, setDialogVisibility] = useState(false)

    const { signUp } = useContext(AuthContext)

    const theme = useTheme()

    const closeSnackBar = () => setSnackBarVisibility(false)
    const openSnackBar = () => setSnackBarVisibility(true)

    const closeDialog = () => setDialogVisibility(false)
    const showDialog = () => {
        if (formHasErrors()) {
            openSnackBar()

            setTimeout(() => closeSnackBar(), Snackbar.DURATION_MEDIUM)

            return
        }

        setDialogVisibility(true)
    }

    const createUser = async () => {
        const users = ((await storage.getItem("@users")) || []) as []
        const user: User = {
            name: _name as string,
            surname: _surname as string,
            username: _username as string,
            role: _role as number
        }

        await storage.setItem("@users", [user, ...users])

        closeDialog()
        signUp()
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
                        maxLength={20}
                        multiline/>
                    <TextInput label="Username"
                        onBlurText={setUsername}
                        errors={(username) =>
                            username.length === 0 ? "Username is required" :
                                username.length > 30 ? "Username is too long" : ""
                        }
                        maxLength={15}
                        multiline/>
                </View>

                <Picker style={{color: theme.colors.text}}
                    selectedValue={_role} onValueChange={setRole} mode="dropdown">
                    <Picker.Item label="Elector" value={0} />
                    <Picker.Item label="Admin" value={1} />
                </Picker>

                <Button style={styles.createButton} mode="outlined" onPress={showDialog}>
                    Create
                </Button>

                <Portal>
                    <Dialog visible={_dialogVisibility} onDismiss={closeDialog}>
                        <Dialog.Title>User creation</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Are you sure you want to create this user?</Subheading>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={closeDialog}>No</Button>
                            <Button onPress={createUser}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Snackbar visible={_snackBarVisibility}
                        duration={Snackbar.DURATION_MEDIUM}
                        onDismiss={closeSnackBar}
                        action={{
                            label: "Ok",
                            onPress: closeSnackBar
                        }}>
                        Fill out all the fields or fix the errors!
                    </Snackbar>
                </Portal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    picker: {

    },
    pickerItem: {

    },
    createButton: {
        marginTop: 20
    }
})
