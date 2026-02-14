import {View, Text, Animated, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import images from "@/constants/images"
import icons from "@/constants/icons"

const SignIn = () => {

    const handleLogin = () =>{

    }
    return (
        // SafeAreaView ensure that your content never goes outside the screen! No matter what the screen is
        <SafeAreaView className="bg-white h-full">
            {/* This component allows the user to scroll if the content is to large for their mini screens*/}
            <ScrollView contentContainerClassName="h-full">
                {/* the container className gives it a height thats full*/}
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain"/>
                    {/* View is like a div in refular React*/}
                    <View className="px-10">
                        <Text className="text-base text-center uppercase font-rubik text-black-200"> Welcome to UrbanKey</Text>
                        <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                            Find The Key {"\n"}
                            <Text className="text-primary-300">To Your Future Home</Text>
                        </Text>
                            <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                                Login to UrbanKey with Google
                            </Text>


                            {/*Buttons in ReactNative Are called TouchableOpacity*/}
                            <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded w-full py-4 mt-5">
                                <View className="flex flex-row items-center justify-center">
                                    <Image
                                        source={icons.google}
                                        className="h-5 w-5"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-lg font-rubik-medium text-black-300 ml-2"> Continue with Google</Text>
                                </View>

                            </TouchableOpacity>



                    </View>


            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn
