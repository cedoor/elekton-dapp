import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigatorParamlist} from "../Types";
import {Caption, Title} from "react-native-paper";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export const Details = (props: Props) => {
    return (
        <View style={styles.container}>
            <Title>{props.route.params.title}</Title>
            <Caption style={styles.handle}>{props.route.params.description}</Caption>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    handle: {
        marginRight: 3,
        lineHeight: 12,
    }
});