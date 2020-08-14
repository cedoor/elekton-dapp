import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {Text, View} from "react-native";
import {StackNavigatorParamlist} from "../Types";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'details'>;
};

export const Details = (props: Props) => {
    return (
        <View>
            <Text>{props.route.params.id}</Text>
        </View>
    );
};