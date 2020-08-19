import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigatorParamlist} from "../Types";
import {Caption, Surface, Title} from "react-native-paper";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export const Details = (props: Props) => {
    return (
        <Surface style={styles.container}>
            <Title>{props.route.params.title}</Title>
            <Caption style={styles.handle}>{props.route.params.description}</Caption>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    handle: {
        marginRight: 3,
        lineHeight: 12,
    }
});