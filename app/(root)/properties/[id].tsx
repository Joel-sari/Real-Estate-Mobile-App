import {View, Text} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router";

const Property = () => {

    // It provides with the functionality to get the id from the parameters!
    const { id } = useLocalSearchParams();

    return (
        <View>
            {/* Will show us the id*/}
            <Text>Property { id }</Text>
        </View>
    )
}
    export default Property
