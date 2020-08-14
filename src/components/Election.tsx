import React from 'react';
import {View} from 'react-native';
import {Text, TouchableRipple,} from 'react-native-paper';

type Props = {
    id: number;
    title: string;
    message: string;
    admin: string;
    timestamp: number;
    options: string[];
    onPress: (id: number) => void;
};

export default function Election(props: Props) {
    return (
        <TouchableRipple onPress={() => props.onPress(props.id)}>
            <View>
                <Text>
                    {props.title}
                </Text>
            </View>
        </TouchableRipple>
    );
};