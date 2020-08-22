import React from 'react';
import {Appbar} from 'react-native-paper';
import useTheme from "../hooks/useTheme";

export default function Header({scene, previous, navigation}: any) {
    const theme = useTheme();
    const {options} = scene.descriptor;
    const title = options.title || scene.route.name;

    const _handleSearch = () => console.log('Searching');

    return (
        <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary}/>
            ) : (
                <Appbar.Action icon="menu" onPress={navigation.openDrawer}/>
            )}
            <Appbar.Content title={title}/>
            <Appbar.Action icon="dots-vertical" onPress={_handleSearch}/>
        </Appbar.Header>
    );
};