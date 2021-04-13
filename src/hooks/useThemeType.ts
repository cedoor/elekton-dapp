import React from "react"
import { createMuiTheme, PaletteType } from "@material-ui/core"
import { ThemeTypeContextType } from "../context/ThemeTypeContext"

export default function useThemeType(): ThemeTypeContextType {
    const themeType = localStorage.getItem("theme-type") as PaletteType
    const [_themeType, setThemeType] = React.useState<PaletteType>(themeType || "light")
    const _theme = React.useMemo(() => {
        return createMuiTheme({
            palette: {
                type: _themeType,
                primary: {
                    main: "#729167"
                }
            }
        })
    }, [_themeType])

    function toggleTheme() {
        const newThemeType = _themeType === "dark" ? "light" : "dark"

        localStorage.setItem("theme-type", newThemeType)
        setThemeType(newThemeType)
    }

    return {
        _theme,
        toggleTheme
    }
}
