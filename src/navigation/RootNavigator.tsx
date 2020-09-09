import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import DrawerNavigator from "./DrawerNavigator"
import AuthNavigator from "./AuthNavigator"

const RootStack = createStackNavigator()

type Props = {
    userToken: string | null
}

export default function RootNavigator({ userToken }: Props) {
    return (
        <RootStack.Navigator headerMode="none">
            { userToken ? (
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
