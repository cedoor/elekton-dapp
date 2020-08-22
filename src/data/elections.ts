import React from "react";
import Election from '../components/Election';

type ElectionsProps = React.ComponentProps<typeof Election>;

export const elections: Omit<ElectionsProps, 'onPress'>[] = [
    {
        id: 1,
        title: 'Parliamentary cut',
        description: 'Do you want to reduce the number of parliamentarians?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292f',
        date: 1598018870924,
        timeInterval: 86400000,
        options: [
            'Yes',
            'No'
        ]
    },
    {
        id: 2,
        title: 'Regional elections',
        description: 'Which party do you want to vote for?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292i',
        date: 1598060406071,
        timeInterval: 86400000,
        options: [
            'PSI',
            'PA',
            'DC'
        ]
    },
    {
        id: 3,
        title: 'National elections',
        description: 'Which party do you want to vote for?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292i',
        date: 1598026070924,
        timeInterval: 86400000,
        options: [
            'PSI',
            'PA',
            'DC'
        ]
    }
]