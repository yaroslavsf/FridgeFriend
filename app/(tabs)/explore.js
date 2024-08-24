import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import HeaderWidget from '../HeaderWidget';

const explore = () => {
    const [mealType, setMealType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [radius, setRadius] = useState("");

    const handleMealTypeChange = (type) => {
        setMealType(type);
    };

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
    };

    const handleRadiusChange = (range) => {
        setRadius(range);
    };

    const handleSubmit = () => {
        Alert.alert(`Creating recipe for: ${mealType}, ${difficulty}, ${radius}`);
    };

    const buttonStyle = "text-white py-2 px-4 m-2 rounded-full text-center";
    const selectedButtonStyle = "border-2 border-black";

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <HeaderWidget title="Rezeptbuch" />
            <ScrollView className="w-full">
                <View className="mb-4 mx-4 mt-8">
                    <Text className="text-xl font-semibold mb-2">Art</Text>
                    <View className="flex-row flex-wrap justify-start">
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Frühstück" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Frühstück")}
                        >
                            <Text className="text-white">🍳 Frühstück</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Lunch" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Lunch")}
                        >
                            <Text className="text-white">🥗 Lunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Abendessen" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Abendessen")}
                        >
                            <Text className="text-white">🍛 Abendessen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Snacks" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Snacks")}
                        >
                            <Text className="text-white">🥪 Snacks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Dessert" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Dessert")}
                        >
                            <Text className="text-white">🍮 Dessert</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${mealType === "Smoothies" ? selectedButtonStyle : ""}`}
                            onPress={() => handleMealTypeChange("Smoothies")}
                        >
                            <Text className="text-white">🥤 Smoothies</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-4 mx-5">
                    <Text className="text-xl font-semibold mb-2">Schwierigkeit</Text>
                    <View className="flex-row flex-wrap justify-start">
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${difficulty === "Einfach" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDifficultyChange("Einfach")}
                        >
                            <Text className="text-white">🤩 Einfach</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${difficulty === "Mittel" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDifficultyChange("Mittel")}
                        >
                            <Text className="text-white">😌 Mittel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${buttonStyle} bg-[#769C65] ${difficulty === "Anspruchsvoll" ? selectedButtonStyle : ""}`}
                            onPress={() => handleDifficultyChange("Anspruchsvoll")}
                        >
                            <Text className="text-white">🤓 Anspruchsvoll</Text>
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

                <TouchableOpacity
                    className={`mb-36 mt-4 bg-[#769C65] text-white py-6 mx-20 rounded-full text-center`}
                    onPress={handleSubmit}
                >
                    <Text className="text-center text-white font-bold text-xl">✨ Mach mein Rezept!</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default explore;