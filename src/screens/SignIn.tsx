import {Button, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../context/AuthContext";

export default function SignIn({navigation}: any) {
    const {signIn} = React.useContext(AuthContext)

    return (
        <View>
            <Text>SignIn</Text>
            <Button title="Sign In" onPress={() => signIn() }/>
            <Button title="Sign Up" onPress={() => navigation.push("SignUp")}/>
        </View>
    )
}