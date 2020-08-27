import React from 'react';
import {Appbar} from 'react-native-paper';
import useTheme from "../hooks/useTheme";
import {StackHeaderProps} from "@react-navigation/stack/lib/typescript/src/types";

export default function Header({scene, previous, navigation}: StackHeaderProps | any) {
    const theme = useTheme();

    return (
        <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary}/>
            ) : (
                <Appbar.Action icon="menu" onPress={navigation.openDrawer}/>
            )}

            <Appbar.Content title={scene.descriptor.title || scene.route.name}/>

            <Appbar.Action icon="dots-vertical"/>
        </Appbar.Header>
    );
};