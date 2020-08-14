import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {Text, View} from '../components/Themed';
import {FAB, Portal} from "react-native-paper";
import {Entypo} from "@expo/vector-icons";
import Election from "../components/Election";
import {StackNavigatorParamlist} from "../Types";
import {StackNavigationProp} from "@react-navigation/stack";
import {elections} from "../data/elections";

type ElectionsProps = React.ComponentProps<typeof Election>;

function renderItem({ item }: { item: ElectionsProps }) {
    return <Election {...item} />;
}

function keyExtractor(item: ElectionsProps) {
    return item.id.toString();
}

type Props = {
    navigation?: StackNavigationProp<StackNavigatorParamlist>;
};

export default function Elections(props: Props) {
    const isFocused = useIsFocused();

    const theme = useTheme();

    const data = elections.map(electionProps => ({
        ...electionProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('details', {
                ...electionProps,
            }),
    }));

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ backgroundColor: theme.colors.background }}
                style={{ backgroundColor: theme.colors.background }}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={() => (
                    <View style={{ height: StyleSheet.hairlineWidth }} />
                )}
            />
            <Portal>
                <FAB
                    visible={isFocused} // show FAB only when this screen is focused
                    icon={({color, size}) => (
                        <Entypo
                            name="new-message"
                            color={color}
                            size={size}
                        />
                    )}
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }}
                />
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
