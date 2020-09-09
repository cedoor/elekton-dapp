import React from "react"
import { ElectionDetails } from "../screens/ElectionDetails"
import { ElectionNavigatorParamList } from "../Types"
import Elections from "../screens/Elections"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack"
import Header from "../components/Header"
import DrawerContent from "../components/DrawerContent"
import { CreateElection } from "../screens/CreateElection"

const Drawer = createDrawerNavigator()
const ElectionStack = createStackNavigator<ElectionNavigatorParamList>()

function ElectionNavigator() {
    return (
        <ElectionStack.Navigator
            initialRouteName="Elections"
            headerMode="screen"
            screenOptions={{
                // eslint-disable-next-line react/display-name
                header: ({ scene, previous, navigation }: StackHeaderProps) => (
                    <Header scene={scene} previous={previous} navigation={navigation} />
                )
            }}>
            <ElectionStack.Screen
                name="Elections"
                component={Elections}
                options={{ title: "Elections" }}
            />
            <ElectionStack.Screen
                name="ElectionDetails"
                component={ElectionDetails}
                options={{ title: "Details" }}
            />
            <ElectionStack.Screen
                name="CreateElection"
                component={CreateElection}
                options={{ title: "Create election" }}
            />
        </ElectionStack.Navigator>
    )
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Elections" component={ElectionNavigator} />
        </Drawer.Navigator>
    )
}
