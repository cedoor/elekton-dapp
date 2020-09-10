import * as React from "react"
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { Election, ElectionNavigatorParamList } from "../Types"
import { StackNavigationProp } from "@react-navigation/stack"
import { FAB } from "react-native-paper"
import ElectionListItem from "../components/ElectionListItem"
import { elections } from "../data/elections"
import useTheme from "../hooks/useTheme"

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>
}

export default function Elections (props: Props) {
    const [_refreshing, setRefreshing] = React.useState(false)

    const theme = useTheme()

    const openElectionDetails = (election: Election) => {
        props.navigation?.push("ElectionDetails", { ...election })
    }

    const updateElections = React.useCallback(() => {
        setRefreshing(true)

        setTimeout(() => setRefreshing(false), 2000)
    }, [])

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
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => props.navigation?.navigate("CreateElection")}
            />
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
        borderBottomWidth: 1,
        marginHorizontal: 16
    }
})
