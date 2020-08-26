import React, {useState} from 'react';
import {IconButton, List, TextInput} from 'react-native-paper';
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
    value: string[],
    onChange: (options: string[]) => void
}

export default function DynamicList({value, onChange}: Props) {
    const theme = useTheme()

    const [inputValue, setInputValue] = useState<string>("")
    const [options, setOptions] = useState<string[]>(value)

    function addOption() {
        if (inputValue) {
            setOptions([...options, inputValue])
            setInputValue("")

            onChange(options)
        }
    }

    function removeOption(index: number) {
        options.splice(index, 1)
        setOptions([...options])

        onChange(options)
    }

    return (
        <View style={styles.container}>
            {options.length > 0 &&
            <View style={[{borderColor: theme.colors.border, borderRadius: theme.roundness}, styles.options]}>
                {options.map((option, index) =>
                    <List.Item style={styles.option}
                               title={option}
                               key={index}
                               right={() => <IconButton
                                   icon={({color, size}) => (
                                       <MaterialIcons name="remove" size={size} color={color}/>
                                   )}
                                   onPress={() => removeOption(index)}
                               />}
                    />
                )}
            </View>}
            <TextInput
                style={[{backgroundColor: theme.colors.background}, styles.input]}
                label="New option"
                value={inputValue}
                onChangeText={setInputValue}
                onBlur={addOption}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    options: {
        marginTop: 10,
        borderWidth: 1,
        paddingVertical: 6
    },
    option: {
        paddingHorizontal: 12,
        paddingVertical: 0,
        marginVertical: -2
    },
    newOption: {
        display: "flex",
        flexDirection: "row",
    },
    input: {
        flex: 1
    }
});