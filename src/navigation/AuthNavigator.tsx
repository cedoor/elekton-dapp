import React from "react"
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack"
import Login from "../screens/Login"
import Header from "../components/Header"

const AuthStack = createStackNavigator()

export default function AuthNavigator () {
    return (
        <AuthStack.Navigator
            headerMode="screen"
            screenOptions={{
                // eslint-disable-next-line react/display-name
                header: ({ scene, previous, navigation }: StackHeaderProps) => (
                    <Header scene={scene} previous={previous} navigation={navigation} />
                )
            }}>
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    )
}
