import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { ElectionNavigatorParamList } from "../Types"
import {
    Button,
    Divider,
    List,
    RadioButton,
    Subheading,
    Title
} from "react-native-paper"
import { format } from "date-fns"
import useTheme from "../hooks/useTheme"
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

type Props = {
  route: RouteProp<ElectionNavigatorParamList, "ElectionDetails">;
};

export function ElectionDetails (props: Props) {
    const theme = useTheme()

    const [_option, setOption] = useState<string>("")

    const vote = () => {
        console.log(Number(_option))
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title style={styles.name}>{props.route.params.name}</Title>

                <View style={[{borderBottomColor: theme.colors.border}, styles.divider]} />

                <View style={styles.list}>
                    <List.Item
                        style={styles.listItem}
                        descriptionStyle={{color: theme.colors.placeholder}}
                        title="Administrator"
                        description={props.route.params.admin}
                        left={() => (
                            <List.Icon
                                icon={({ color, size }) => (
                                    <MaterialCommunityIcons name="human-male" size={size} color={color} />
                                )}
                            />
                        )}
                    />
                    <List.Item
                        style={styles.listItem}
                        descriptionStyle={{color: theme.colors.placeholder}}
                        title="Start date"
                        description={format(
                            props.route.params.startDate,
                            "MMM dd yyyy - HH:mm"
                        )}
                        left={() => (
                            <List.Icon
                                icon={({ color, size }) => (
                                    <MaterialIcons name="date-range" size={size} color={color} />
                                )}
                            />
                        )}
                    />
                    <List.Item
                        style={styles.listItem}
                        descriptionStyle={{color: theme.colors.placeholder}}
                        title="End date"
                        description={format(
                            props.route.params.endDate,
                            "MMM dd yyyy - HH:mm"
                        )}
                        left={() => (
                            <List.Icon
                                icon={({ color, size }) => (
                                    <MaterialIcons name="date-range" size={size} color={color} />
                                )}
                            />
                        )}
                    />
                </View>

                <View
                    style={[
                        { borderColor: theme.colors.border, borderRadius: theme.roundness },
                        styles.paper
                    ]}
                >
                    <Subheading style={styles.description}>
                        {props.route.params.description}
                    </Subheading>
                    <RadioButton.Group onValueChange={setOption} value={_option}>
                        {props.route.params.options.map((option, index) => (
                            <RadioButton.Item
                                style={styles.option}
                                key={index}
                                label={option}
                                value={index.toString()}
                            />
                        ))}
                    </RadioButton.Group>
                </View>

                <Button style={styles.createButton} mode="outlined" onPress={vote}>
          Vote
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    name: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center"
    },
    divider: {
        borderBottomWidth: .4
    },
    list: {
        paddingTop: 6
    },
    listItem: {
        padding: 0
    },
    paper: {
        marginTop: 18,
        padding: 16,
        borderWidth: .4
    },
    description: {
        paddingBottom: 8
    },
    option: {
        paddingVertical: 0
    },
    createButton: {
        marginTop: 20
    }
})
