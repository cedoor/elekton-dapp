import React from "react";
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from "@react-navigation/drawer";
import {Linking} from "react-native";

export default function Sidebar({...props}: DrawerContentComponentProps<DrawerContentOptions>) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Help"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
        </DrawerContentScrollView>
    )
}