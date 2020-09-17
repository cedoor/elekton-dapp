import React from "react"
import { ThemeType } from "../Types"

type ThemeContextType = {
    _themeType: ThemeType
    toggleTheme: () => Promise<void>
}

export const ThemeContext = React.createContext<ThemeContextType>({
    _themeType: "light",
    toggleTheme: () => Promise.resolve()
})
