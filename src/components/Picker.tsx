import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton, Menu, Text, TouchableRipple } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { bindWithFalse, bindWithTrue } from "../utils/helper"

type Props = {
    selectedValue: number
    onValueChange: (value: number) => void
    items: string[]
}

export default function Picker({ selectedValue, onValueChange, items }: Props) {
    const [_menuVisibility, setMenuVisibility] = useState(false)

    const theme = useTheme()

    const selectValue = (index: number) => {
        onValueChange(index)
        setMenuVisibility(false)
    }

    return (
        <TouchableRipple onPress={bindWithTrue(setMenuVisibility)}>
            <View style={[{ borderBottomColor: theme.colors.border }, styles.container]}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{items[selectedValue]}</Text>
                </View>
                <Menu
                    contentStyle={{ backgroundColor: theme.colors.surface }}
                    visible={_menuVisibility}
                    onDismiss={bindWithFalse(setMenuVisibility)}
                    anchor={<IconButton icon="menu-down" />}
                >
                    {items.map((item, index) => (
                        <Menu.Item
                            key={item}
                            title={item}
                            titleStyle={styles.item}
                            onPress={() => selectValue(index)}
                        />
                    ))}
                </Menu>
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingTop: 12,
        paddingBottom: 4,
        paddingHorizontal: 12
    },
    labelContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 3
    },
    label: {
        fontSize: 16
    },
    item: {
        textAlign: "center"
    }
})
