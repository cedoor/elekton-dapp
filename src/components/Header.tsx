import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';

export default function Header({scene, previous, navigation}: any) {
    const theme = useTheme();
    const {options} = scene.descriptor;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : scene.route.name;

    const _handleSearch = () => console.log('Searching');

    return (
        <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary}/>
            ) : (
                <Appbar.Action icon="menu" onPress={navigation.openDrawer}/>
            )}
            <Appbar.Content title={title}/>
            <Appbar.Action icon="magnify" onPress={_handleSearch}/>
        </Appbar.Header>
    );
};