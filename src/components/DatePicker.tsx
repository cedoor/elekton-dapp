import React, {useState} from 'react';
import {List, TouchableRipple} from 'react-native-paper';
import {format} from "date-fns";
import {MaterialIcons} from "@expo/vector-icons";
import {Platform, StyleSheet, View} from "react-native";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";

type Props = {
    date: Date,
    onChange: (date: Date) => void
}

export default function DatePicker({date, onChange}: Props) {
    const [_date, setDate] = useState<Date>(date);
    const [_datePickerMode, setDatePickerMode] = useState<"date" | "time">("date");
    const [_datePickerVisibility, setDatePickerVisibility] = useState<boolean>(false);

    const updateDate = (event: Event, selectedDate?: Date) => {
        setDatePickerVisibility(Platform.OS === 'ios');
        setDate(selectedDate || _date);
        onChange(selectedDate || _date)
    }

    const showDatePicker = (mode: "date" | "time") => {
        setDatePickerVisibility(true);
        setDatePickerMode(mode);
    }

    return (
        <View style={styles.container}>
            <TouchableRipple style={styles.button} onPress={() => showDatePicker("date")}>
                <List.Item style={styles.item} title="Day"
                           description={format(_date, "MMM dd, yyyy")}
                           left={() => <List.Icon
                               icon={({color, size}) => (
                                   <MaterialIcons name="today" size={size} color={color}/>
                               )}
                           />}
                />
            </TouchableRipple>
            <TouchableRipple style={styles.button} onPress={() => showDatePicker("time")}>
                <List.Item style={styles.item} title="Time"
                           description={format(_date, "hh:mm a")}
                           left={() => <List.Icon
                               icon={({color, size}) => (
                                   <MaterialIcons name="access-time" size={size} color={color}/>
                               )}
                           />}
                />
            </TouchableRipple>
            {_datePickerVisibility && (
                <DateTimePicker
                    value={_date}
                    mode={_datePickerMode}
                    is24Hour={false}
                    display="default"
                    onChange={updateDate}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 6
    },
    button: {
        flex: 1
    },
    item: {
        padding: 0
    }
});