import React, { useState } from "react"
import { IconButton, List, TextInput } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import useTheme from "../hooks/useTheme"

type Props = {
    options: string[]
    onChange: (options: string[]) => void
}

export default function DynamicList({ options, onChange }: Props) {
    const [_inputValue, setInputValue] = useState<string>("")
    const [_options, setOptions] = useState<string[]>(options)

    const theme = useTheme()

    const addOption = () => {
        if (_inputValue) {
            const newOptions = [..._options, _inputValue]

            setOptions(newOptions)
            setInputValue("")
            onChange(newOptions)
        }
    }

    const removeOption = (index: number) => {
        _options.splice(index, 1)

        setOptions(_options.slice())
        onChange(_options.slice())
    }

    return (
        <View style={styles.container}>
            {_options.length > 0 && (
                <View
                    style={[
                        {
                            borderColor: theme.colors.border,
                            borderRadius: theme.roundness
                        },
                        styles.options
                    ]}
                >
                    {_options.map((option, index) => (
                        <List.Item
                            style={styles.option}
                            title={option}
                            key={index}
                            right={() => (
                                <IconButton
                                    icon={({ color, size }) => (
                                        <MaterialIcons name="remove" size={size} color={color} />
                                    )}
                                    onPress={() => removeOption(index)}
                                />
                            )}
                        />
                    ))}
                </View>
            )}
            <TextInput
                style={[{ backgroundColor: theme.colors.background }, styles.input]}
                label="Add new option"
                value={_inputValue}
                onChangeText={setInputValue}
                onBlur={addOption}
                maxLength={20}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
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
        flexDirection: "row"
    },
    input: {
        flex: 1
    }
})
