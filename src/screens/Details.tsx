import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigatorParamlist} from "../Types";
import {Caption, RadioButton, Subheading, Title} from "react-native-paper";
import {format} from "date-fns";
import useTheme from "../hooks/useTheme";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export const Details = (props: Props) => {
    const theme = useTheme()
    const [option, setOption] = React.useState('0');

    return (
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Title style={styles.title}>{props.route.params.title}</Title>
                <Caption style={styles.date}>{format(props.route.params.date, "H:mm a, MMM dd yyyy")}</Caption>
                <View style={[{borderColor: theme.colors.border, borderRadius: theme.roundness}, styles.paper]}>
                    <Subheading style={styles.description}>{props.route.params.description}</Subheading>
                    <RadioButton.Group onValueChange={option => setOption(option)} value={option}>
                        {props.route.params.options.map((option, index) =>
                            <RadioButton.Item style={styles.option} key={index} label={option}
                                              value={index.toString()}/>
                        )}
                    </RadioButton.Group>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24
    },
    date: {
        fontSize: 14
    },
    paper: {
        marginTop: 18,
        padding: 16,
        borderWidth: 1
    },
    description: {
        paddingBottom: 8
    },
    option: {
        paddingVertical: 0
    }
});