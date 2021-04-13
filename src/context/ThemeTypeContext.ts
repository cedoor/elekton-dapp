import { Theme } from "@material-ui/core"
import React from "react"

export type ThemeTypeContextType = {
    _theme: Theme
    toggleTheme: () => void
}

export default React.createContext<ThemeTypeContextType | null>(null)
