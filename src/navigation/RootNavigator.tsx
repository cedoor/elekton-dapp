import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import DrawerNavigator from "./DrawerNavigator"
import AuthNavigator from "./AuthNavigator"
import { AuthContext } from "../context/AuthContext"

const RootStack = createStackNavigator()

export default function RootNavigator () {
    const { _user } = useContext(AuthContext)

    return (
        <RootStack.Navigator headerMode="none">
            { _user ? (
                <RootStack.Screen
                    name="App"
                    component={DrawerNavigator}
                    options={{
                        animationEnabled: false
                    }}
                />
            ) : (
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{
                        animationEnabled: false
                    }}
                />
            )}
        </RootStack.Navigator>
    )
}
