import React from "react"

type PreferencesContextType = {
    themeType: "light" | "dark"
    toggleTheme: () => Promise<void>
}

export const PreferencesContext = React.createContext<PreferencesContextType>({
    themeType: "light",
    toggleTheme: () => Promise.resolve()
})
