import React from 'react';
import {List, TouchableRipple} from 'react-native-paper';
import {StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import useTheme from "../hooks/useTheme";
import {Election} from "../Types";
import ElectionStopwatch from "./ElectionStopwatch";

type Props = {
    election: Election
    onClick: (id: number) => void
}

export default function ElectionListItem({election, onClick}: Props) {
    const theme = useTheme()
    const now = Date.now()

    return (
        <TouchableRipple onPress={() => onClick(election.id)}>
            <View>
                <List.Item title={election.title} description={election.description}
                           right={() =>
                               <View style={styles.date}>
                                   <Text style={[{color: theme.colors.placeholder}, styles.dateText]}>
                                       {format(election.startDate, "mm/dd/yyyy")}
                                   </Text>
                                   <Text style={[{color: theme.colors.placeholder}, styles.dateText]}>
                                       {format(election.startDate, "hh:mm a")}
                                   </Text>
                               </View>
                           }/>
                {
                    now >= election.startDate && now <= election.endDate &&
                    <ElectionStopwatch startDate={election.startDate} endDate={election.endDate}/>
                }
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    date: {
        justifyContent: "center",
        paddingRight: 10,
        alignItems: "flex-end"
    },
    dateText: {
        fontSize: 13
    }
});