import "./global.css"
import {View, Text} from 'react-native'
import React, {useEffect} from 'react'
import {SplashScreen, Stack} from "expo-router"
import { useFonts } from 'expo-font';

const Layout = () => {
    const [fontsLoaded] = useFonts(
        {
            "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
            "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
            "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
            "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
            "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
            "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
        }

    )

    useEffect(() => {
        // if the fonts are loaded we can hide the splash screen! Our splash Screen is the loading screen
        if(fontsLoaded){
            SplashScreen.hideAsync();

        }
    }, [fontsLoaded])

    if (!fontsLoaded){
        return null
    }
    return (
        // NOTE Headershown is what hides the navbar!
        <Stack screenOptions={{ headerShown: false}}></Stack>
    )
}
export default Layout
