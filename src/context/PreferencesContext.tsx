import React from "react"

type PreferencesContextType = {
    _themeType: "light" | "dark"
    toggleTheme: () => Promise<void>
}

export const PreferencesContext = React.createContext<PreferencesContextType>({
    _themeType: "light",
    toggleTheme: () => Promise.resolve()
})
