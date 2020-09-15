import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { Caption, Paragraph, Title } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { AuthContext } from "../context/AuthContext"
import useTheme from "../hooks/useTheme"

export default function DrawerContent (props: DrawerContentComponentProps) {
    const {user, signOut} = useContext(AuthContext)

    const theme = useTheme()

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0]
    })

    return (
        <DrawerContentScrollView {...props} style={{backgroundColor: theme.colors.background}}>
            <Animated.View style={[
                styles.drawerContent,
                {
                    transform: [{ translateX }]
                }
            ]}>
                <View style={styles.userInfoSection}>
                    <Title style={styles.title}>{user?.name} {user?.surname}</Title>
                    <Caption style={styles.caption}>@{user?.username}</Caption>
                </View>
                <DrawerItem style={[{borderTopColor: theme.colors.border}, styles.drawerItem]}
                    labelStyle={{color: theme.colors.text}}
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons name="logout" color={color} size={size} />
                    )}
                    label="Sign out"
                    onPress={signOut}
                />
            </Animated.View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        marginTop: 20,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerItem: {
        marginTop: 15,
        borderTopWidth: .4
    }
})
