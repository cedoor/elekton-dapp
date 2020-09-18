import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Dialog, Portal, Subheading } from "react-native-paper"
import DatePicker from "../components/DatePicker"
import DynamicList from "../components/DynamicList"
import { Election, ElectionNavigatorParamList } from "../Types"
import cache from "../utils/cache"
import { StackNavigationProp } from "@react-navigation/stack"
import TextInput from "../components/TextInput"
import Snackbar from "../components/Snackbar"
import useTheme from "../hooks/useTheme"
import { bindWithFalse } from "../utils/helper"

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>
}

export function CreateElection (props: Props) {
    const [_title, setTitle] = useState<string | null>(null)
    const [_description, setDescription] = useState<string | null>(null)
    const [_startDate, setStartDate] = useState<Date | null>(null)
    const [_endDate, setEndDate] = useState<Date | null>(null)
    const [_options, setOptions] = useState<string[] | null>(null)
    const [_snackBarVisibility, setSnackBarVisibility] = useState(false)
    const [_dialogVisibility, setDialogVisibility] = useState(false)

    const theme = useTheme()

    const showConfirmDialog = () => {
        if (formHasErrors()) {
            setSnackBarVisibility(true)

            return
        }

        setDialogVisibility(true)
    }

    const createElection = async () => {
        const elections = ((await cache.getElections()) || []) as []
        const election: Election = {
            id: Date.now(),
            admin: "Pinco Pallino",
            title: _title as string,
            description: _description as string,
            startDate: _startDate?.getTime() as number,
            endDate: _endDate?.getTime() as number,
            options: _options as string[]
        }

        await cache.setElections([election, ...elections])

        setDialogVisibility(false)

        props.navigation?.goBack()
    }

    const formHasErrors = () =>
        _title === null || _description === null ||
        _startDate === null || _endDate === null ||
        _options === null

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <TextInput label="Title"
                        onBlurText={setTitle}
                        errors={(title) =>
                            title.length === 0 ? "Title is required" :
                                title.length > 30 ? "Title is too long" : ""
                        }
                        maxLength={30}/>
                    <TextInput label="Description"
                        onBlurText={setDescription}
                        errors={(description) =>
                            description.length === 0 ? "Description is required" :
                                description.length > 30 ? "Description is too long" : ""
                        }
                        maxLength={60}
                        multiline/>
                </View>

                <View>
                    <Subheading>Start date</Subheading>
                    <DatePicker onChange={setStartDate} errors={(startDate) =>
                        startDate.getTime() < Date.now() + 3600000 ?
                            "The start date must be at least one hour after creation" : ""
                    }/>
                </View>

                <View>
                    <Subheading>End date</Subheading>
                    <DatePicker onChange={setEndDate} errors={(endDate) =>
                        _startDate && _startDate.getTime() + 3600000 > endDate.getTime() ?
                            "The end date must be at least one hour after the start date" : ""
                    }/>
                </View>

                <View>
                    <Subheading>Options</Subheading>
                    <DynamicList onChange={setOptions} errors={(options) =>
                        options.length < 2 ? "There must be at least 2 options" : ""
                    }/>
                </View>

                <Button style={styles.createButton} mode="outlined" onPress={showConfirmDialog}>
                    Create
                </Button>

                <Portal>
                    <Dialog style={{backgroundColor: theme.colors.background}} 
                        visible={_dialogVisibility} onDismiss={bindWithFalse(setDialogVisibility)}>
                        <Dialog.Title>Election creation</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Are you sure you want to create this election?</Subheading>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={bindWithFalse(setDialogVisibility)}>No</Button>
                            <Button onPress={createElection}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Snackbar visible={_snackBarVisibility} onDismiss={bindWithFalse(setSnackBarVisibility)}
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
