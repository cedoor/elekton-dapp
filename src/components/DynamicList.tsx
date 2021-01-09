import React, { useState } from "react"
import { HelperText, IconButton, List, TextInput } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import useTheme from "../hooks/useTheme"

type Props = {
    options?: string[]
    onChange: (options: string[] | null) => void
    errors?: (options: string[]) => string
}

export default function DynamicList({ options = [], onChange, errors }: Props) {
    const [_inputValue, setInputValue] = useState("")
    const [_options, setOptions] = useState({ value: options, error: "" })

    const theme = useTheme()

    const addOption = () => {
        if (_inputValue) {
            const options = [..._options.value, _inputValue]
            const error = errors ? errors(options) : ""

            setOptions({ value: options, error })
            setInputValue("")
            onChange(!error ? options : null)
        }
    }

    const removeOption = (index: number) => {
        _options.value.splice(index, 1)

        const options = _options.value.slice()
        const error = errors ? errors(options) : ""

        setOptions({ value: options, error })
        onChange(!error ? options : null)
    }

    return (
        <View style={styles.container}>
            {_options.value.length > 0 && (
                <View
                    style={[
                        {
                            borderColor: theme.colors.border,
                            borderRadius: theme.roundness
                        },
                        styles.options
                    ]}
                >
                    {_options.value.map((option, index) => (
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
                style={{ backgroundColor: theme.colors.background }}
                label="Add new option"
                value={_inputValue}
                onChangeText={setInputValue}
                onBlur={addOption}
                maxLength={20}
                error={!!_options.error}
            />
            {!!_options.error && <HelperText type="error">{_options.error}</HelperText>}
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
    }
})
