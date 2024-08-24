import React from "react";
import HeaderWidget from "../HeaderWidget";

import { Text, View } from "react-native";
import { Screen } from "expo-router/build/views/Screen";

const explore = () => {

    return (
        <View className="flex-1 items-center justify-start bg-white">
            <HeaderWidget title="Rezepte" className="w-full" />
            <Text className="text-sky-300" >Open up App.js to start working on your app!</Text>
        </View>

    );

}

export default explore; 