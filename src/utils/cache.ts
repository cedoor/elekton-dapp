import AsyncStorage from "@react-native-community/async-storage"
import { Election, User } from "../Types"

enum Key {
    THEME = "@theme",
    ELECTIONS = "@elections",
    USER = "@user",
    USERS = "@users" // TODO: to remove.
}

const setItem = async (key: string, value: any) => {
    if (typeof value !== "string") {
        value = JSON.stringify(value)
    }

    return AsyncStorage.setItem(key, value)
}

const getItem = async (key: string): Promise<any | null> => {
    const value = await AsyncStorage.getItem(key)

    if (value !== null) {
        try {
            return JSON.parse(value)
        } catch (error) {
            return value
        }
    }

    return null
}

const removeItem = async (key: string) => {
    return AsyncStorage.removeItem(key)
}

const addItemToArray = async (key: Key, value: any) => {
    const items = await getItem(key)

    if (!Array.isArray(items)) {
        throw TypeError("Cached item is not an array")
    }

    return setItem(key, [...items, value])
}

export default {
    getTheme: async () => getItem(Key.THEME),
    setTheme: async (theme: "light" | "dark") => setItem(Key.THEME, theme),
    getElections: async () => getItem(Key.ELECTIONS),
    setElections: async (elections: Election[]) => setItem(Key.ELECTIONS, elections),
    addElection: async (election: Election) => addItemToArray(Key.ELECTIONS, election),
    getUsers: async () => getItem(Key.USERS), // TODO: to remove.
    setUsers: async (users: User[]) => setItem(Key.USERS, users), // TODO: to remove.
    addUser: async (user: User) => addItemToArray(Key.USERS, user), // TODO: to remove.
    getUser:  async () => getItem(Key.USER),
    setUser: async (user: User) => setItem(Key.USER, user),
    removeUser: async () => removeItem(Key.USER)
}
