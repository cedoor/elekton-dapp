import React from 'react';
import {List, Surface, Text, TouchableRipple} from 'react-native-paper';

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
    return (
        <TouchableRipple onPress={() => props.onPress(props.id)}>
            <Surface>
                <List.Item title={props.title} description={props.description}
                           right={props => <Text {...props}>10/03/2020</Text>}/>
            </Surface>
        </TouchableRipple>
    );
};