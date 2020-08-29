import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Election, ElectionNavigatorParamList} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {FAB} from "react-native-paper";
import ElectionListItem from "../components/ElectionListItem";
import {elections} from "../data/elections";

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>;
};

export default function Elections(props: Props) {
    const openElectionDetails = (election: Election) => {
        props.navigation?.push('ElectionDetails', {...election})
    }

    return (
        <View style={styles.container}>
            {
                elections && elections.map((election: Election, index: number) =>
                    <ElectionListItem key={index.toString()} value={election}
                                      onClick={() => openElectionDetails(election)}/>
                )
            }
            <FAB
                style={styles.fab}
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