import React, { useState } from "react"
import { HelperText, List, TouchableRipple } from "react-native-paper"
import { format } from "date-fns"
import { MaterialIcons } from "@expo/vector-icons"
import { Platform, StyleSheet, View } from "react-native"
import DateTimePicker, { Event } from "@react-native-community/datetimepicker"

type Props = {
    date?: Date
    onChange: (date: Date | null) => void
    errors?: (data: Date) => string
    maximumDate?: Date
    minimumDate?: Date
}

export default function DatePicker ({ date = new Date(), onChange, errors }: Props) {
    const [_date, setDate] = useState({value: date, error: ""})
    const [_datePickerMode, setDatePickerMode] = useState<"date" | "time">("date")
    const [_datePickerVisibility, setDatePickerVisibility] = useState(false)

    const updateDate = (event: Event, date: Date = _date.value) => {
        setDatePickerVisibility(Platform.OS === "ios")
        setDate({value: date, error: errors ? errors(date) : ""})
        onChange(!_date.error ? date : null)
    }

    const showDatePicker = (mode: "date" | "time") => {
        setDatePickerVisibility(true)
        setDatePickerMode(mode)
    }

    return (
        <View style={styles.container}>
            <View style={styles.items}>
                <TouchableRipple style={styles.button} onPress={() => showDatePicker("date")}>
                    <List.Item
                        style={styles.item}
                        title="Day"
                        description={format(_date.value, "MMM dd, yyyy")}
                        left={() => (
                            <List.Icon
                                icon={({ color, size }) => (
                                    <MaterialIcons name="today" size={size} color={color} />
                                )}
                            />
                        )}
                    />
                </TouchableRipple>
                <TouchableRipple style={styles.button} onPress={() => showDatePicker("time")}>
                    <List.Item
                        style={styles.item}
                        title="Time"
                        description={format(_date.value, "hh:mm a")}
                        left={() => (
                            <List.Icon
                                icon={({ color, size }) => (
                                    <MaterialIcons name="access-time" size={size} color={color} />
                                )}
                            />
                        )}
                    />
                </TouchableRipple>
            </View>
            {!!_date.error && <HelperText type="error">{_date.error}</HelperText>}
            {_datePickerVisibility && (
                <DateTimePicker
                    value={_date.value}
                    mode={_datePickerMode}
                    is24Hour={false}
                    display="default"
                    onChange={updateDate}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6
    },
    items: {
        display: "flex",
        flexDirection: "row"
    },
    button: {
        flex: 1
    },
    item: {
        padding: 0
    }
})
