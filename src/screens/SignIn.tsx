import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {AuthContext} from "../context/AuthContext";
import {Button, IconButton, Surface} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";

export default function SignIn({navigation}: any) {
    const {signIn} = React.useContext(AuthContext)

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
                    size={24}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <View style={styles.content}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
                <View>
                    <Button style={styles.button} mode="outlined" onPress={() => navigation.push("SignUp")}>
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
        padding: 10,
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
        marginTop: 10,
        width: 250,
        borderRadius: 20
    },
    logo: {
        width: 100,
        height: 100
    }
});