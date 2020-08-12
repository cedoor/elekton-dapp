import * as React from 'react';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Sidebar from "../components/Sidebar";
import {AntDesign} from "@expo/vector-icons";
import {View} from "react-native";
import {Header} from "react-native-elements";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}
                          initialRouteName="TabOne">
            <Drawer.Screen name="TabOne" component={TabOneScreen}
                           options={{
                               drawerIcon: ({focused, color, size}) =>
                                   <AntDesign size={size} style={{marginBottom: -3}} name="user" color={color}/>,
                           }}/>
            <Drawer.Screen name="TabTwo" component={TabTwoScreen}
                           options={{
                               drawerIcon: ({focused, color, size}) =>
                                   <AntDesign size={size} style={{marginBottom: -3}} name="team" color={color}/>,
                           }}/>
        </Drawer.Navigator>
    );
}
