import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Dialog, Portal, Snackbar, Subheading } from "react-native-paper"
import DatePicker from "../components/DatePicker"
import DynamicList from "../components/DynamicList"
import { Election, ElectionNavigatorParamList } from "../Types"
import * as storage from "../utils/storage"
import { StackNavigationProp } from "@react-navigation/stack"
import CTextInput from "../components/CTextInput"

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>
}

export function CreateElection (props: Props) {
    const [_startDate, setStartDate] = useState<Date | null>(null)
    const [_endDate, setEndDate] = useState<Date | null>(null)
    const [_options, setOptions] = useState<string[]>([])
    const [_snackBarVisibility, setSnackBarVisibility] = React.useState(false)
    const [_dialogVisibility, setDialogVisibility] = React.useState(false)

    let title: string | null = null
    let description: string | null = null

    const createElection = async () => {
        const elections = ((await storage.getItem("@elections")) || []) as []
        const election: Election = {
            id: Date.now(),
            admin: "Pinco Pallino",
            title: title as string,
            description: description as string,
            startDate: _startDate?.getTime() as number,
            endDate: _endDate?.getTime() as number,
            options: _options
        }

        await storage.setItem("@elections", [election, ...elections])

        hideDialog()
        props.navigation?.navigate("Elections")
    }

    const hideSnackBar = () => setSnackBarVisibility(false)
    const showSnackBar = (duration: number = Snackbar.DURATION_MEDIUM) => {
        setSnackBarVisibility(true)

        setTimeout(() => hideSnackBar(), duration)
    }

    const hideDialog = () => setDialogVisibility(false)
    const showDialog = () => {
        if (hasErrors()) {
            showSnackBar()

            return
        }

        setDialogVisibility(true)
    }

    const hasErrors = () => title === null || description === null

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <CTextInput label="Title" 
                        onBlurText={(text) => {
                            title = text
                        }}
                        errors={(value) =>  
                            value.length === 0 ? "Title is required" :
                                value.length > 30 ? "Title is too long" : ""
                        }
                        maxLength={30}/>
                    <CTextInput label="Description"
                        onBlurText={(text) => {
                            description = text
                        }}
                        errors={(text) =>
                            text.length === 0 ? "Description is required" :
                                text.length > 30 ? "Description is too long" : ""
                        }
                        maxLength={60}
                        multiline/>
                </View>

                <View>
                    <Subheading>Start date</Subheading>
                    <DatePicker onChange={setStartDate} errors={(date) =>
                        date.getTime() < Date.now() + 3600000 ?
                            "You can create an election up to one hour in advance" : ""
                    }/>
                </View>

                <View>
                    <Subheading>End date</Subheading>
                    <DatePicker onChange={setEndDate} errors={(date) =>
                        _startDate && _startDate.getTime() + 3600000 > date.getTime() ?
                            "The end date must be at least one hour after the start date" : ""
                    }/>
                </View>

                <View>
                    <Subheading>Options</Subheading>
                    <DynamicList options={_options} onChange={setOptions} />
                </View>

                <Button style={styles.createButton} mode="outlined" onPress={showDialog}>
                    Create
                </Button>

                <Portal>
                    <Dialog visible={_dialogVisibility} onDismiss={hideDialog}>
                        <Dialog.Title>Election creation</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Are you sure you want to create this election?</Subheading>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={createElection}>Yes</Button>
                            <Button onPress={hideDialog}>No</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Snackbar
                        visible={_snackBarVisibility}
                        onDismiss={hideSnackBar}
                        action={{
                            label: "Ok",
                            onPress: hideSnackBar
                        }}>
                        There are errors!
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
    createButton: {
        marginTop: 20
    }
})
