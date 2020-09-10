import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Login"

const AuthStack = createStackNavigator()

export default function AuthNavigator () {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    )
}
