import React from "react"
import { HelperText, TextInput } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { View } from "react-native"

type Props = {
    label: string
    maxLength?: number
    onBlurText: (value: string | null) => void
    multiline?: boolean
    errors?: (value: string) => string
}

export default function CTextInput ({ label, maxLength, onBlurText, multiline, errors }: Props) {
    const [_title, setTitle] = React.useState({value: "", error: ""})

    const theme = useTheme()

    return (
        <View>
            <TextInput
                style={{ backgroundColor: theme.colors.background }}
                label={label}
                value={_title.value}
                maxLength={maxLength}
                onChangeText={(value) => {
                    setTitle({
                        value,
                        error: errors ? errors(value) : ""
                    })
                }}
                onBlur={() => onBlurText(!_title.error ? _title.value : null)}
                error={!!_title.error}
                multiline={multiline}
            />
            {!!_title.error && <HelperText type="error">{_title.error}</HelperText>}
        </View>
    )
}
