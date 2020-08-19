import {Button, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../context/AuthContext";

export default function SignUp() {
    const {signUp} = React.useContext(AuthContext)

    return (
        <View>
            <Text>SignUp</Text>
            <Button title="Sign Up" onPress={() => signUp()}/>
        </View>
    )
}