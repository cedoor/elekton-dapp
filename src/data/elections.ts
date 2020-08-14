import React from "react";
import Election from '../components/Election';

type ElectionsProps = React.ComponentProps<typeof Election>;

export const elections: Omit<ElectionsProps, 'onPress'>[] = [
    {
        id: 1,
        title: 'Parliamentary cut',
        message: 'Do you want to reduce the number of parliamentarians?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292f',
        timestamp: 1597403558561,
        options: [
            'Yes',
            'No'
        ]
    },
    {
        id: 2,
        title: 'National elections',
        message: 'Which party do you want to vote for?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292i',
        timestamp: 1597403558562,
        options: [
            'PSI',
            'PA',
            'DC'
        ]
    }
]