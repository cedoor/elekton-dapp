import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";

const RootStack = createStackNavigator();

export default function RootNavigator({userToken}: any) {
    return (
        <RootStack.Navigator headerMode="none">
            {userToken ?
                <RootStack.Screen
                    name="App"
                    component={DrawerNavigator}
                    options={{
                        animationEnabled: false
                    }}
                /> :
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{
                        animationEnabled: false
                    }}
                />
            }
        </RootStack.Navigator>
    );
};