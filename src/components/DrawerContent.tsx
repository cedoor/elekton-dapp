import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { Caption, Paragraph, Title } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { AuthContext } from "../context/AuthContext"
import useTheme from "../hooks/useTheme"

export default function DrawerContent(props: DrawerContentComponentProps) {
    const { _user, signOut } = useContext(AuthContext)

    const theme = useTheme()

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0]
    })

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
            <Animated.View
                style={[
                    styles.drawerContent,
                    {
                        transform: [{ translateX }]
                    }
                ]}
            >
                <View style={styles.userInfo}>
                    <Title style={styles.name}>
                        {_user?.name} {_user?.surname}
                    </Title>
                    <Caption style={styles.username}>@{_user?.username}</Caption>
                    <Paragraph style={styles.role}>{_user?.role === 0 ? "Elector" : "Admin"}</Paragraph>
                </View>
                <DrawerItem
                    style={[{ borderTopColor: theme.colors.border }, styles.drawerItem]}
                    labelStyle={{ color: theme.colors.text }}
                    icon={({ color, size }) => <MaterialCommunityIcons name="logout" color={color} size={size} />}
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
    userInfo: {
        paddingLeft: 20
    },
    name: {
        marginTop: 20,
        fontWeight: "bold"
    },
    username: {
        fontSize: 14,
        lineHeight: 14
    },
    role: {
        fontWeight: "bold",
        marginTop: 10
    },
    drawerItem: {
        marginTop: 15,
        borderTopWidth: 0.4
    }
})
