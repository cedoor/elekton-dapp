import React from "react"
import { List, TouchableRipple } from "react-native-paper"
import { StyleSheet, Text, View } from "react-native"
import { format } from "date-fns"
import useTheme from "../../hooks/useTheme"
import { Election } from "../../Types"
import ElectionStopwatch from "./ElectionStopwatch"

type Props = {
    election: Election
    onClick: (id: number) => void
}

export default function ElectionListItem({ election, onClick }: Props) {
    const theme = useTheme()

    return (
        <TouchableRipple onPress={() => onClick(election.id)}>
            <View>
                <List.Item
                    title={election.title}
                    description={election.description}
                    descriptionStyle={{ color: theme.colors.placeholder }}
                    right={() => (
                        <View style={styles.date}>
                            <Text style={[{ color: theme.colors.placeholder }, styles.dateText]}>
                                {format(election.startDate, "MMM dd")}
                            </Text>
                            <Text style={[{ color: theme.colors.placeholder }, styles.dateText]}>
                                {format(election.startDate, "HH:mm")}
                            </Text>
                        </View>
                    )}
                />
                <ElectionStopwatch startDate={election.startDate} endDate={election.endDate} />
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    date: {
        justifyContent: "center",
        paddingRight: 10,
        alignItems: "flex-end"
    },
    dateText: {
        fontSize: 13
    }
})
