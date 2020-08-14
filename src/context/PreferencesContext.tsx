import React from 'react';

type PreferencesContextType = {
    themeType: 'light' | 'dark';
    toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
    themeType: 'light',
    toggleTheme: () => {
    }
});
