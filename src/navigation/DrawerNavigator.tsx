import React from 'react';
import {Details} from '../screens/Details';
import {StackNavigatorParamlist} from '../Types';
import Elections from "../screens/Elections";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import Header from "../components/Header";
import DrawerContent from "../components/DrawerContent";
import {CreateElection} from "../screens/CreateElection";

const Drawer = createDrawerNavigator<StackNavigatorParamlist>();
const ElectionStack = createStackNavigator<StackNavigatorParamlist>();

function ElectionNavigator() {
    return (
        <ElectionStack.Navigator
            initialRouteName="Elections"
            headerMode="screen"
            screenOptions={{
                header: ({scene, previous, navigation}) => (
                    <Header scene={scene} previous={previous} navigation={navigation}/>
                )
            }}>
            <ElectionStack.Screen
                name="Elections"
                component={Elections}
                options={{title: 'Elections'}}
            />
            <ElectionStack.Screen
                name="Details"
                component={Details}
                options={{title: 'Details'}}
            />
            <ElectionStack.Screen
                name="CreateElection"
                component={CreateElection}
                options={{title: 'Create election'}}
            />
        </ElectionStack.Navigator>
    );
};

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Elections" component={ElectionNavigator}/>
        </Drawer.Navigator>
    );
};