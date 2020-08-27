import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigatorParamlist} from "../Types";
import {Button, Divider, List, RadioButton, Subheading, Title} from "react-native-paper";
import {format} from "date-fns";
import useTheme from "../hooks/useTheme";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export function Details(props: Props) {
    const theme = useTheme()

    const [option, setOption] = React.useState<string>("");

    function vote() {
        console.log(Number(option))
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title style={styles.title}>{props.route.params.title}</Title>

                <Divider/>

                <View style={styles.list}>
                    <List.Item style={styles.listItem} title="Administrator"
                               description={props.route.params.admin}
                               left={() => <List.Icon
                                   icon={({color, size}) => (
                                       <FontAwesome name="user" size={size} color={color}/>
                                   )}
                               />}/>
                    <List.Item style={styles.listItem} title="Start date"
                               description={format(props.route.params.startDate, "H:mm a, MMM dd yyyy")}
                               left={() => <List.Icon
                                   icon={({color, size}) => (
                                       <MaterialIcons name="date-range" size={size} color={color}/>
                                   )}
                               />}/>
                    <List.Item style={styles.listItem} title="End date"
                               description={format(props.route.params.endDate, "H:mm a, MMM dd yyyy")}
                               left={() => <List.Icon
                                   icon={({color, size}) => (
                                       <MaterialIcons name="date-range" size={size} color={color}/>
                                   )}
                               />}/>
                </View>

                <View style={[{borderColor: theme.colors.border, borderRadius: theme.roundness}, styles.paper]}>
                    <Subheading style={styles.description}>{props.route.params.description}</Subheading>
                    <RadioButton.Group onValueChange={setOption} value={option}>
                        {props.route.params.options.map((option, index) =>
                            <RadioButton.Item style={styles.option} key={index} label={option}
                                              value={index.toString()}/>
                        )}
                    </RadioButton.Group>
                </View>

                <Button style={styles.createButton}
                        mode="outlined" onPress={vote}>
                    Vote
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center"
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
        borderWidth: .8
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
});