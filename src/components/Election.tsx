import React, {useEffect, useState} from 'react';
import {Colors, List, ProgressBar, TouchableRipple} from 'react-native-paper';
import {StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import useTheme from "../hooks/useTheme";

type Props = {
    id: number;
    title: string;
    description: string;
    admin: string;
    date: number;
    timeInterval: number;
    options: string[];
    onPress: (id: number) => void;
};

export default function Election(props: Props) {
    const theme = useTheme()

    const calculateTimeLeft = () => {
        return (Date.now() - props.date) / props.timeInterval
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timeout if the component is unmounted.
        return () => clearTimeout(timer);
    });

    return (
        <TouchableRipple onPress={() => props.onPress(props.id)}>
            <View>
                <List.Item title={props.title} description={props.description}
                           right={() =>
                               <View style={styles.date}>
                                   <Text style={[{color: theme.colors.placeholder}, styles.dateText]}>
                                       {format(props.date, "MMM dd")}
                                   </Text>
                                   <Text style={[{color: theme.colors.placeholder}, styles.dateText]}>
                                       {format(props.date, "H:mm a")}
                                   </Text>
                               </View>
                           }/>
                <View>{
                    timeLeft > 0 && timeLeft < 1 &&
                    <ProgressBar style={styles.timer} progress={timeLeft}
                                 color={timeLeft < 0.8 ? Colors.green800 : Colors.red800}/>
                }</View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    timer: {
        marginHorizontal: 16,
        marginBottom: 16
    },
    date: {
        justifyContent: "center",
        paddingRight: 10,
        alignItems: "flex-end"
    },
    dateText: {
        fontSize: 13
    }
});