import {Election} from "../Types"

export const elections: Election[] = [
    {
        id: 1,
        title: 'Parliamentary cut',
        description: 'Do you want to reduce the number of parliamentarians?',
        admin: '0x03Ed9bE36c5FC315B0559Cf344801653e2CE292f',
        startDate: 1598018870924,
        endDate: 1598105270924,
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
        startDate: 1598018870924,
        endDate: 1598105270924,
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
        startDate: 1598018870924,
        endDate: 1598105270924,
        options: [
            'PSI',
            'PA',
            'DC'
        ]
    }
]