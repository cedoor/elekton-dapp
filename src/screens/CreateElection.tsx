import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, Snackbar, Subheading, TextInput} from "react-native-paper";
import useTheme from "../hooks/useTheme";
import DatePicker from "../components/DatePicker";
import DynamicList from "../components/DynamicList";
import {Election, ElectionNavigatorParamList} from "../Types";
import * as storage from "../utils/storage"
import {StackNavigationProp} from "@react-navigation/stack";

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>;
};

export function CreateElection(props: Props) {
    const theme = useTheme()

    const [_title, setTitle] = React.useState('');
    const [_description, setDescription] = React.useState('');
    const [_startDate, setStartDate] = useState<Date>(new Date());
    const [_endDate, setEndDate] = useState<Date>(new Date());
    const [_options, setOptions] = useState<string []>([])
    const [_snackBarVisibility, setSnackBarVisibility] = React.useState(false);
    const [_dialogVisibility, setDialogVisibility] = React.useState(false);

    const createElection = async () => {
        const elections = ((await storage.getItem("@elections")) || []) as []
        const election: Election = {
            id: Date.now(),
            admin: "Pinco Pallino",
            title: _title,
            description: _description,
            startDate: _startDate.getTime(),
            endDate: _endDate.getTime(),
            options: _options
        }

        await storage.setItem("@elections", [election, ...elections])

        hideDialog()
        props.navigation?.navigate("Elections")
    }

    const hideSnackBar = () => setSnackBarVisibility(false);
    const showSnackBar = (duration: number = Snackbar.DURATION_MEDIUM) => {
        setSnackBarVisibility(true);

        setTimeout(() => {
            hideSnackBar()
        }, duration)
    }

    const hideDialog = () => setDialogVisibility(false)
    const showDialog = () => {
        if (_title.length < 1 || _title.length > 30 ||
            _description.length < 1 || _description.length > 60 ||
            _startDate < new Date() || _endDate < _startDate ||
            _options.length < 2) {

            showSnackBar()

            return
        }

        setDialogVisibility(true)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <TextInput style={{backgroundColor: theme.colors.background}}
                               label="Title"
                               value={_title}
                               onChangeText={setTitle}
                               maxLength={30}/>
                    <TextInput style={{backgroundColor: theme.colors.background}}
                               label="Description"
                               value={_description}
                               onChangeText={setDescription}
                               maxLength={60}
                               multiline/>
                </View>

                <View>
                    <Subheading>Start date</Subheading>
                    <DatePicker date={_startDate} onChange={setStartDate}/>
                </View>

                <View>
                    <Subheading>End date</Subheading>
                    <DatePicker date={_endDate} onChange={setEndDate}/>
                </View>

                <View>
                    <Subheading>Options</Subheading>
                    <DynamicList options={_options} onChange={setOptions}/>
                </View>

                <Button style={styles.createButton}
                        mode="outlined" onPress={showDialog}>
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

                    <Snackbar visible={_snackBarVisibility}
                              onDismiss={hideSnackBar}
                              action={{
                                  label: 'Ok',
                                  onPress: hideSnackBar,
                              }}>
                        There are errors!
                    </Snackbar>
                </Portal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    createButton: {
        marginTop: 20
    }
});