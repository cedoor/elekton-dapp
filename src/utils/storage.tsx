import AsyncStorage from "@react-native-community/async-storage"

export async function setItem (key: string, value: any): Promise<void> {
    if (typeof value !== "string") {
        value = JSON.stringify(value)
    }

    return AsyncStorage.setItem(key, value)
}

export async function getItem (key: string): Promise<any | null> {
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
