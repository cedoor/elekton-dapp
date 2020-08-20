import React from 'react';
import {List, Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {StyleSheet, View} from "react-native";

type Props = {
    id: number;
    title: string;
    description: string;
    admin: string;
    timestamp: number;
    options: string[];
    onPress: (id: number) => void;
};

export default function Election(props: Props) {
    const theme = useTheme()

    return (
        <TouchableRipple onPress={() => props.onPress(props.id)}>
            <Surface>
                <List.Item title={props.title}
                           description={props.description}
                           right={() =>
                               <View style={styles.timer}>
                                   <Text style={[{color: theme.colors.primary}, styles.timerText]}>
                                       10:20
                                   </Text>
                               </View>
                           }/>
            </Surface>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    timer: {
        justifyContent: "center",
        paddingRight: 10
    },
    timerText: {
        fontWeight: "bold"
    }
});