import React from "react"
import { Appbar } from "react-native-paper"
import useTheme from "../hooks/useTheme"
import { Scene, StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types"
import { Route, ParamListBase } from "@react-navigation/native"

type Props = {
    scene: Scene<Route<string>>
    previous?: Scene<Route<string>>
    navigation: StackNavigationProp<ParamListBase> & {openDrawer: () => void}
}

export default function Header({ scene, previous, navigation }: Props) {
    const theme = useTheme()

    return (
        <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
            ) : (
                <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
            )}

            <Appbar.Content title={scene.descriptor.options.title || scene.route.name} />

            <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>
    )
}
