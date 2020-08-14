import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Details} from './screens/Details';
import {StackNavigatorParamlist} from './Types';
import Elections from "./screens/Elections";
import Header from "./components/Header";

const Stack = createStackNavigator<StackNavigatorParamlist>();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="elections"
            headerMode="screen"
            screenOptions={{
                header: ({scene, previous, navigation}) => (
                    <Header scene={scene} previous={previous} navigation={navigation}/>
                )
            }}>
            <Stack.Screen
                name="elections"
                component={Elections}
                options={{headerTitle: 'Elections'}}
            />
            <Stack.Screen
                name="details"
                component={Details}
                options={{headerTitle: 'Details'}}
            />
        </Stack.Navigator>
    );
};