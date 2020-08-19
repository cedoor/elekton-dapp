import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import Main from "./src/Main";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Main/>
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}
