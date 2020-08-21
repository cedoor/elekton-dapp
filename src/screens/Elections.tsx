import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Election from "../components/Election";
import {StackNavigatorParamlist} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {elections} from "../data/elections";
import {Surface} from "react-native-paper";

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
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        marginHorizontal: 16
    }
});