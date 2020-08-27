import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ElectionListItem from "../components/ElectionListItem";
import {ElectionNavigatorParamList} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {elections} from "../data/elections";
import useTheme from "../hooks/useTheme";
import {Divider, FAB} from "react-native-paper";

type ElectionListItemProps = React.ComponentProps<typeof ElectionListItem>;

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>;
};

export default function Elections(props: Props) {
    const theme = useTheme();

    const data = elections.map(election => ({
        value: election,
        onClick: () =>
            props.navigation?.push('ElectionDetails', {
                ...election,
            }),
    }));

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{backgroundColor: theme.colors.background}}
                style={{backgroundColor: theme.colors.background}}
                data={data}
                renderItem={({item}: { item: ElectionListItemProps }) => <ElectionListItem {...item} />}
                keyExtractor={(item: ElectionListItemProps) => item.value.id.toString()}
                ItemSeparatorComponent={() => <Divider style={styles.divider}/>}
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
    divider: {
        marginHorizontal: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});