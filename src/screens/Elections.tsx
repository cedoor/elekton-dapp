import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Election, ElectionNavigatorParamList} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {FAB} from "react-native-paper";
import ElectionListItem from "../components/ElectionListItem";
import {elections} from "../data/elections";

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>;
};

export default function Elections(props: Props) {
    const [refreshing, setRefreshing] = React.useState(false);

    const openElectionDetails = (election: Election) => {
        props.navigation?.push('ElectionDetails', {...election})
    };

    const updateElections = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => setRefreshing(false), 2000)
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateElections}/>}>
                {
                    elections && elections.map((election: Election, index: number) =>
                        <ElectionListItem key={index.toString()} election={election}
                                          onClick={() => openElectionDetails(election)}/>
                    )
                }
            </ScrollView>
            <FAB style={styles.fab}
                 icon="plus"
                 onPress={() => props.navigation?.navigate("CreateElection")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});