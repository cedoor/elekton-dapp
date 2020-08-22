import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {AuthContext} from "../context/AuthContext";
import {Button, IconButton, Surface} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import useTheme from "../hooks/useTheme";

export default function Login() {
    const {signIn, signUp} = React.useContext(AuthContext)
    const theme = useTheme();

    return (
        <Surface style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon={({color, size}) => (
                        <MaterialIcons
                            name="verified-user"
                            color={color}
                            size={size}
                        />
                    )}
                    color={theme.colors.primary}
                    size={24}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <View style={styles.content}>
                <View style={{alignItems: "center"}}>
                    <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
                    <Text style={[{color: theme.colors.primary}, styles.logoText]}>Elekton</Text>
                </View>
                <View>
                    <Button style={[{borderRadius: theme.roundness}, styles.button]} mode="outlined"
                            onPress={() => signUp()}>
                        Sign Up
                    </Button>
                    <Button style={styles.button} mode="outlined" onPress={() => signIn()}>
                        Sign In
                    </Button>
                </View>
            </View>
        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingHorizontal: 10,
        paddingVertical: 30,
        flex: 1
    },
    header: {
        alignItems: "flex-end"
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
    },
    button: {
        marginBottom: 10,
        width: 250
    },
    logo: {
        width: 160,
        height: 160
    },
    logoText: {
        marginTop: 10,
        fontSize: 26
    }
});