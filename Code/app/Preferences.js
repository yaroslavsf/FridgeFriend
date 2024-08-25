import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import HeaderWidget from './HeaderWidget';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";

const Preferences = () => {
    const router = useRouter();

    const [diet, setDiet] = useState("");
    const [allergies, setAllergies] = useState("");
    const [radius, setRadius] = useState("");

    const handleDietChange = (type) => {
        setDiet(type);
    };

    const handleAllergiesChange = (level) => {
        setAllergies(level);
    };

    const handleRadiusChange = (range) => {
        setRadius(range);
    };

    const buttonStyle = "text-white py-2 px-4 m-2 rounded-full text-center";
    const selectedButtonStyle = "border-2 border-black";

    return (
        <>
        <TouchableOpacity onPress={() => router.back()} className="mt-7 ml-3 flex-row items-center">
                <Icon name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
        <View className="flex-1 justify-center items-center bg-white">
            <HeaderWidget title="Meine Präferenzen" />
            <ScrollView className="w-full">
                <View className="mb-4 mx-4 mt-8">
                    <Text className="text-xl font-semibold mb-2">Ernährungsweise</Text>
                    <View className="flex-row flex-wrap justify-start">
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${diet === "Vegan" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDietChange("Vegan")}
                        >
                            <Text className="text-white">🌱 Vegan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${diet === "Vegetarisch" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDietChange("Vegetarisch")}
                        >
                            <Text className="text-white">🥗 Vegetarisch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${diet === "Fleisch" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDietChange("Fleisch")}
                        >
                            <Text className="text-white">🥩 Fleisch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${diet === "Pescetarish" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDietChange("Pescetarish")}
                        >
                            <Text className="text-white">🐟 Pescetarish</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-4 mx-5">
                    <Text className="text-xl font-semibold mb-2">Allergien</Text>
                    <View className="flex-row flex-wrap justify-start">
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${allergies === "Gluten" ? selectedButtonStyle : ""}`}
                            onPress={() => handleAllergiesChange("Gluten")}
                        >
                            <Text className="text-white">🌾 Gluten</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${allergies === "Laktose" ? selectedButtonStyle : ""}`}
                            onPress={() => handleAllergiesChange("Laktose")}
                        >
                            <Text className="text-white">🥛 Laktose</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${allergies === "Erdnüsse" ? selectedButtonStyle : ""}`}
                            onPress={() => handleAllergiesChange("Erdnüsse")}
                        >
                            <Text className="text-white">🥜 Erdnüsse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${allergies === "Krustentiere" ? selectedButtonStyle : ""}`}
                            onPress={() => handleAllergiesChange("Krustentiere")}
                        >
                            <Text className="text-white">🦀 Krustentiere</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${allergies === "Soja" ? selectedButtonStyle : ""}`}
                            onPress={() => handleAllergiesChange("Soja")}
                        >
                            <Text className="text-white">🫛 Soja</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-4 mx-5">
                    <Text className="text-xl font-semibold mb-2">Entfernung</Text>
                    <View className="flex-row flex-wrap justify-start">
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${radius === ">500m" ? selectedButtonStyle : ""}`}
                            onPress={() => handleRadiusChange(">500m")}
                        >
                            <Text className="text-white">{"🚶 >500m"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${radius === ">1km" ? selectedButtonStyle : ""}`}
                            onPress={() => handleRadiusChange(">1km")}
                        >
                            <Text className="text-white">{"🚲 >1km"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${radius === ">3km" ? selectedButtonStyle : ""}`}
                            onPress={() => handleRadiusChange(">3km")}
                        >
                            <Text className="text-white">{"🚍 >3km"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${radius === ">5km" ? selectedButtonStyle : ""}`}
                            onPress={() => handleRadiusChange(">5km")}
                        >
                            <Text className="text-white">{"🚘 >5km"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        </>
    );
};

export default Preferences;