import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Text, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function App() {

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text  className="text-sky-300" >Open up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

