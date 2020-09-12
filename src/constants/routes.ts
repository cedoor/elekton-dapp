import * as Linking from "expo-linking"

export default {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            App: {
                screens: {
                    Elections: {
                        screens: {
                            Elections: "elections",
                            ElectionDetails: "details",
                            CreateElection: "create-election"
                        }
                    }
                }
            },
            Auth: {
                screens: {
                    Login: "login",
                    SignUp: "sign-up"
                }
            }
        }
    }
}
