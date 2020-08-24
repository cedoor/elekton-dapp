import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Election from "../components/Election";
import {StackNavigatorParamlist} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {elections} from "../data/elections";
import useTheme from "../hooks/useTheme";
import {FAB} from "react-native-paper";

type ElectionsProps = React.ComponentProps<typeof Election>;

function renderItem({item}: { item: ElectionsProps }) {
    return <Election {...item} />;
}

function keyExtractor(item: ElectionsProps) {
    return item.id.toString();
}

type Props = {
    navigation?: StackNavigationProp<StackNavigatorParamlist>;
};

export default function Elections(props: Props) {
    const theme = useTheme();

    const data = elections.map(electionProps => ({
        ...electionProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...electionProps,
            }),
    }));

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{backgroundColor: theme.colors.background}}
                style={{backgroundColor: theme.colors.background}}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={() => (
                    <View style={[{backgroundColor: theme.colors.border}, styles.separator]}/>
                )}
            />
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
    separator: {
        height: 1,
        marginHorizontal: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});