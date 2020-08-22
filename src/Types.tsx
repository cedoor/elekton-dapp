import {Fonts} from "react-native-paper/src/types";

export type StackNavigatorParamlist = {
    Elections: undefined;
    Details: {
        id: number;
        title: string;
        description: string;
        admin: string;
        date: number;
        timeInterval: number;
        options: string[];
    };
};

type Mode = 'adaptive' | 'exact';

export type Theme = {
    dark: boolean;
    mode?: Mode;
    roundness: number;
    colors: {
        primary: string;
        background: string;
        surface: string;
        accent: string;
        error: string;
        text: string;
        onSurface: string;
        onBackground: string;
        disabled: string;
        placeholder: string;
        backdrop: string;
        notification: string;
        card: string;
        border: string;
    };
    fonts: Fonts;
    animation: {
        scale: number;
    };
};