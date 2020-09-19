import React, { useContext, useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { Election, ElectionNavigatorParamList } from "../Types"
import { StackNavigationProp } from "@react-navigation/stack"
import { ActivityIndicator, FAB, Portal, Text } from "react-native-paper"
import ElectionListItem from "../components/ElectionListItem/ElectionListItem"
import useTheme from "../hooks/useTheme"
import PinKeyboardModal from "../components/PinKeyboardModal/PinKeyboardModal"
import cache from "../utils/cache"
import { AuthContext } from "../context/AuthContext"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type Props = {
    navigation?: StackNavigationProp<ElectionNavigatorParamList>
}

export default function Elections (props: Props) {
    const {_user, unlockUser} = useContext(AuthContext)

    const [_elections, setElections] = useState<Election[] | null>(null)
    const [_refreshing, setRefreshing] = useState(false)
    const [_pinKeyboardVisibility, setPinKeyboardVisibility] = useState(!_user?.pinCode)

    const theme = useTheme()

    const openElectionDetails = (election: Election) => {
        props.navigation?.push("ElectionDetails", { ...election })
    }

    const unlock = async (pinCode?: string) => {
        if (pinCode) {
            unlockUser(pinCode)
            setPinKeyboardVisibility(false)
        }
    }

    const updateElections = async () => {
        setRefreshing(true)

        setElections((await cache.getElections()) || [])

        setRefreshing(false)
    }

    useEffect(() => {
        if (_user?.pinCode) {
            (async () => {
                setElections(await cache.getElections() || [])
            })()
        }
    }, [_user])

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={_refreshing} onRefresh={updateElections} />
                }>

                { _elections && _elections.map((election: Election, index: number) =>
                    <View key={election.id}>
                        <ElectionListItem
                            election={election}
                            onClick={() => openElectionDetails(election)}
                        />
                        { index !== _elections.length - 1 &&
                                <View style={[
                                    styles.itemSeparator, 
                                    {borderBottomColor: theme.colors.border}
                                ]} />
                        }
                    </View>)
                }
            </ScrollView>

            {_elections && _elections.length === 0 &&
                <View style={styles.centralContent}>
                    <MaterialCommunityIcons size={60} color={theme.colors.placeholder} name="emoticon-sad-outline"/>
                    <Text style={{color: theme.colors.placeholder}}>No elections</Text>
                </View>
            }

            {!_elections &&
                <View style={styles.centralContent}>
                    <ActivityIndicator size="large" color={theme.colors.placeholder}/>
                </View>
            }

            {_user &&
                <FAB style={[{backgroundColor: theme.colors.surface}, styles.fab]}
                    color={theme.colors.primary}
                    onPress={() => props.navigation?.navigate("CreateElection")}
                    label="Create"
                    icon="pencil"
                />
            }

            <Portal>
                <PinKeyboardModal visible={_pinKeyboardVisibility} onClose={unlock} closeOnBackButton={false}/>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centralContent: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0
    },
    itemSeparator: {
        borderBottomWidth: .4,
        marginHorizontal: 16
    }
})
