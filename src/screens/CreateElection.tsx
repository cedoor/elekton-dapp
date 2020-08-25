import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, IconButton, List, Subheading, TextInput} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import useTheme from "../hooks/useTheme";
import DatePicker from "../components/DatePicker";

export function CreateElection() {
    const theme = useTheme()

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const [options, setOptions] = useState([] as string[])

    const optionTextInputRef = React.createRef()

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
                    <DatePicker value={startDate} onChange={setStartDate}/>
                </View>
                <View>
                    <Subheading>End date</Subheading>
                    <DatePicker value={endDate} onChange={setEndDate}/>
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