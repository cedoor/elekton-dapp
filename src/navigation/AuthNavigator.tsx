import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: "Sign In" }}/>
            <AuthStack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }}/>
        </AuthStack.Navigator>
    );
};