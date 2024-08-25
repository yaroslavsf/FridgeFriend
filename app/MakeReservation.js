import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import HeaderWidget from "./HeaderWidget";
import { useRouter } from "expo-router";


const MakeReservation = () => {
    const router = useRouter()

    // State to manage if the button is clicked
    const [isClicked, setIsClicked] = useState(false);

    // Function to toggle the button state
    const handlePress = () => {
        setIsClicked(!isClicked);
    };

    return (
        <>
            <TouchableOpacity onPress={() => router.back()} className="mt-7 ml-3 flex-row items-center">
                <Icon2 name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
            <View className="flex-1 items-center bg-white">
                <HeaderWidget title="Reservieren" />
                <View className="mt-10 bg-white p-6 rounded-2xl border border-gray-300 w-80">
                    {/* Avatar */}
                    <View className="items-center">
                        <Icon name="user-circle" size={64} color="black" />
                    </View>

                    {/* Name */}
                    <Text className="text-lg font-semibold text-center mt-4">
                        Jan Mustermann
                    </Text>

                    {/* Phone */}
                    <View className="flex-row items-center  mt-2">
                        <Icon name="phone" size={24} color="black" />
                        <Text className="ml-2 text-base">079 123 45 67</Text>
                    </View>

                    {/* Address */}
                    <View className="flex-row items-center  mt-2">
                        <Icon name="map-marker-alt" size={24} color="black" />
                        <Text className="ml-2 text-base">Musterweg 1, 3006 Bern</Text>
                    </View>

                    {/* Contact Button */}
                    <TouchableOpacity
                     style={{backgroundColor: isClicked ? "white" : "#769C65", borderColor: "#769C65"}}
                className={`py-3 px-4 rounded-lg mt-6 ${
                    'bg-transparent'
                }`}
                onPress={handlePress}
            >
                <Text
                style={{color: isClicked ?"#769C65": "white" }}
                    className={`text-center font-semibold`}
                >
                    {isClicked ? (<>Kontaktiert ✅</>) :  (<>Kontaktieren</>)}
                </Text>
            </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default MakeReservation;