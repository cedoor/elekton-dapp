import { useTheme as _useNavigationTheme } from "@react-navigation/native"
import { useTheme as _usePaperTheme } from "react-native-paper"
import deepmerge from "deepmerge"
import { Theme } from "../Types"

export default function useTheme(): Theme {
    return deepmerge(_useNavigationTheme(), _usePaperTheme())
}
