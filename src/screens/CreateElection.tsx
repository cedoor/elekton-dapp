import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Subheading, TextInput} from "react-native-paper";
import useTheme from "../hooks/useTheme";
import DatePicker from "../components/DatePicker";
import DynamicList from "../components/DynamicList";

export function CreateElection() {
    const theme = useTheme()

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [options, setOptions] = useState<string []>([])

    function createElection() {
        console.log({
            title,
            description,
            startDate,
            endDate,
            options
        })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={{backgroundColor: theme.colors.background}}
                        label="Title"
                        value={title}
                        onChangeText={setTitle}/>
                    <TextInput
                        style={{backgroundColor: theme.colors.background}}
                        label="Description"
                        value={description}
                        onChangeText={setDescription}/>
                </View>
                <View>
                    <Subheading>Start date</Subheading>
                    <DatePicker value={startDate} onChange={setStartDate}/>
                </View>
                <View>
                    <Subheading>End date</Subheading>
                    <DatePicker value={endDate} onChange={setEndDate}/>
                </View>
                <View>
                    <Subheading>Options</Subheading>
                    <DynamicList value={options} onChange={setOptions}/>
                </View>
                <Button style={styles.createButton}
                        mode="outlined" onPress={createElection}>
                    Create
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    createButton: {
        marginTop: 20
    }
});