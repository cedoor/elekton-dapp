import React from "react"
import { HelperText, TextInput } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { View } from "react-native"

type Props = {
    label: string
    maxLength?: number
    onBlurText: (text: string | null) => void
    multiline?: boolean
    errors?: (text: string) => string
}

export default function CTextInput ({ label, maxLength, onBlurText, multiline, errors }: Props) {
    const [_text, setText] = React.useState({value: "", error: ""})

    const theme = useTheme()

    return (
        <View>
            <TextInput
                style={{ backgroundColor: theme.colors.background }}
                label={label}
                value={_text.value}
                maxLength={maxLength}
                onChangeText={(value) => setText({ value, error: errors ? errors(value) : "" })}
                onBlur={() => onBlurText(!_text.error ? _text.value : null)}
                error={!!_text.error}
                multiline={multiline}
            />
            {!!_text.error && <HelperText type="error">{_text.error}</HelperText>}
        </View>
    )
}
