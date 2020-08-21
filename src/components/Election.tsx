import React, {useEffect, useState} from 'react';
import {Card, Colors, List, ProgressBar, Surface, TouchableRipple} from 'react-native-paper';
import {StyleSheet, View} from "react-native";

type Props = {
    id: number;
    title: string;
    description: string;
    admin: string;
    startTime: number;
    timeInterval: number;
    options: string[];
    onPress: (id: number) => void;
};

export default function Election(props: Props) {
    const calculateTimeLeft = () => {
        return (Date.now() - props.startTime) / props.timeInterval
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
                <List.Item title={props.title} description={props.description}/>
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
    }
});