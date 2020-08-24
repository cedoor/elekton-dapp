import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, IconButton, List, Subheading, TextInput} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from "date-fns";
import {MaterialIcons} from "@expo/vector-icons";
import useTheme from "../hooks/useTheme";

export function CreateElection() {
    const theme = useTheme()

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());

    const [startDatePickerMode, setStartDatePickerMode] = useState('date');
    const [endDatePickerMode, setEndDatePickerMode] = useState('date');

    const [startDatePickerVisibility, setStartDatePickerVisibility] = useState(false);
    const [endDatePickerVisibility, setEndDatePickerVisibility] = useState(false);

    const [options, setOptions] = useState([] as string[])

    const optionTextInputRef = React.createRef()

    const updateStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDatePickerVisibility(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const updateEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDatePickerVisibility(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    const showStartDatePicker = (mode) => {
        setStartDatePickerVisibility(true);
        setStartDatePickerMode(mode);
    };

    const showEndDatePicker = (mode) => {
        setEndDatePickerVisibility(true);
        setEndDatePickerMode(mode);
    };

    const addOption = () => {
        optionTextInputRef.current.clear()
        setOptions([...options, optionTextInputRef.current.state.value])
    }

    const removeOption = (index) => {
        options.splice(index, 1)

        setOptions([...options])
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={{backgroundColor: theme.colors.background}}
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={{backgroundColor: theme.colors.background}}
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <View>
                    <Subheading>Start date</Subheading>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <List.Item style={{flex: 1}}
                                   title="Day"
                                   description={format(startDate, "MMM dd, yyyy")}
                                   left={() => <IconButton
                                       icon={({color, size}) => (
                                           <MaterialIcons name="date-range" size={size} color={color}/>
                                       )}
                                       onPress={() => showStartDatePicker("date")}
                                   />}
                        />
                        <List.Item style={{flex: 1}}
                                   title="Time"
                                   description={format(startDate, "HH:mm a")}
                                   left={() => <IconButton
                                       icon={({color, size}) => (
                                           <MaterialIcons name="access-time" size={size} color={color}/>
                                       )}
                                       onPress={() => showStartDatePicker("time")}
                                   />}
                        />
                    </View>
                    {startDatePickerVisibility && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={startDate}
                            mode={startDatePickerMode}
                            is24Hour={true}
                            display="default"
                            onChange={updateStartDate}
                        />
                    )}
                </View>
                <View>
                    <Subheading>End date</Subheading>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <List.Item style={{flex: 1}}
                                   title="Day"
                                   description={format(endDate, "MMM dd, yyyy")}
                                   left={() => <IconButton
                                       icon={({color, size}) => (
                                           <MaterialIcons name="date-range" size={size} color={color}/>
                                       )}
                                       onPress={() => showEndDatePicker("date")}
                                   />}
                        />
                        <List.Item style={{flex: 1}}
                                   title="Time"
                                   description={format(endDate, "HH:mm a")}
                                   left={() => <IconButton
                                       icon={({color, size}) => (
                                           <MaterialIcons name="access-time" size={size} color={color}/>
                                       )}
                                       onPress={() => showEndDatePicker("time")}
                                   />}
                        />
                    </View>
                    {endDatePickerVisibility && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={endDate}
                            mode={endDatePickerMode}
                            is24Hour={true}
                            display="default"
                            onChange={updateEndDate}
                        />
                    )}
                </View>
                <View>
                    <Subheading>Options</Subheading>
                    {options.map((option, index) =>
                        <List.Item title={option}
                                   key={index}
                                   right={() => <IconButton
                                       icon={({color, size}) => (
                                           <MaterialIcons name="remove" size={size} color={color}/>
                                       )}
                                       onPress={() => removeOption(index)}
                                   />}
                        />
                    )}
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <TextInput
                            style={{backgroundColor: theme.colors.background, flex: 1}}
                            label="New option"
                            ref={optionTextInputRef}
                        />
                        <View style={{justifyContent: "center"}}>
                            <IconButton
                                icon={({color, size}) => (
                                    <MaterialIcons name="add" size={size} color={color}/>
                                )}
                                onPress={addOption}
                            />
                        </View>
                    </View>
                </View>
                <Button style={styles.createButton} mode="outlined">Create</Button>
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