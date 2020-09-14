import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { Election, ElectionNavigatorParamList } from "../Types"
import { StackNavigationProp } from "@react-navigation/stack"
import { FAB, Portal } from "react-native-paper"
import ElectionListItem from "../components/ElectionListItem"
import { elections } from "../data/elections"
import useTheme from "../hooks/useTheme"
import { MaterialIcons } from "@expo/vector-icons"
import PinKeyboard from "../components/PinKeyboard"

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>
}

export default function Elections (props: Props) {
    const [_refreshing, setRefreshing] = useState(false)
    const [_PinCodeVisibility, setPinCodeVisibility] = useState(false)

    const theme = useTheme()

    const openElectionDetails = (election: Election) => {
        props.navigation?.push("ElectionDetails", { ...election })
    }

    const updateElections = useCallback(() => {
        setRefreshing(true)

        setTimeout(() => setRefreshing(false), 2000)
    }, [])

    const closePinCode = () => setPinCodeVisibility(false)
    const openPinCode = () => setPinCodeVisibility(true)

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={_refreshing} onRefresh={updateElections} />
                }>
                { elections &&
                    elections.map((election: Election, index: number) => (
                        <View key={election.id}>
                            <ElectionListItem
                                election={election}
                                onClick={() => openElectionDetails(election)}
                            />
                            { index !== elections.length - 1 &&
                                <View style={[
                                    styles.itemSeparator, 
                                    {borderBottomColor: theme.colors.border}
                                ]} />
                            }
                        </View>
                    ))
                }
            </ScrollView>
            <FAB style={[{backgroundColor: theme.colors.surface}, styles.fab]}
                color={theme.colors.primary}
                onPress={() => props.navigation?.navigate("CreateElection")}
                label="Create"
                icon={({ color, size }) => (
                    <MaterialIcons name="create" color={color} size={size} />
                )}
            />

            <Portal>
                <PinKeyboard visible={_PinCodeVisibility} onDismiss={closePinCode} />
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0
    },
    itemSeparator: {
        borderBottomWidth: .4,
        marginHorizontal: 16
    }
})
