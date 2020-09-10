import React from "react"
import { StyleSheet, View } from "react-native"
import {
    DrawerContentComponentProps,
    DrawerContentScrollView, DrawerItem
} from "@react-navigation/drawer"
import {
    Caption, Drawer, Paragraph, Switch, Text,
    Title, TouchableRipple
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PreferencesContext } from "../context/PreferencesContext"
import Animated from "react-native-reanimated"
import { AuthContext } from "../context/AuthContext"

export default function DrawerContent (props: DrawerContentComponentProps) {
    const { themeType, toggleTheme } = React.useContext(PreferencesContext)

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0]
    })

    const { signOut } = React.useContext(AuthContext)

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                style={[
                    styles.drawerContent,
                    {
                        transform: [{ translateX }]
                    }
                ]}
            >
                <View style={styles.userInfoSection}>
                    <Title style={styles.title}>Pinco Pallino</Title>
                    <Caption style={styles.caption}>@pinco</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>25</Paragraph>
                            <Caption style={styles.caption}>Available elections</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="logout" color={color} size={size} />
                        )}
                        label="Sign out"
                        onPress={signOut}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={toggleTheme}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={themeType === "dark"} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
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
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
