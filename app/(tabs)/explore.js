import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, Button } from "react-native";
import HeaderWidget from '../HeaderWidget';
import { Video } from 'expo-av';
import CookingAnimation from "../../assets/CookingAnimation.mp4";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {analyzeImageWithStructuredOutput} from "../../api/open_ai/structured_recipe_output";
import RecipeScreen from "../DetailedRecipe";
import {useRouter} from "expo-router";

const explore = () => {
    const [mealType, setMealType] = useState("🍳 Frühstück");
    const [difficulty, setDifficulty] = useState("🤩 Einfach");
    const [radius, setRadius] = useState("🚶 >500m");
    const [slide, setSlide] = useState(0);
    const [AiRecipes, setAiRecipes] = useState(ai_recipes);
    const navigation = useNavigation();

    // example prompt: Ich habe [ingredients]. Welche Rezepte kann man erstellen die diese Zutaten enthalten? Bitte gebe mir als Antwort eine Antwort auf Schweizerdeutsch im Format als Array:

    const router = useRouter();

    const ai_recipes = [
    ];

    const handleMealTypeChange = (type) => {
        setMealType(type);
    };

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
    };

    const handleRadiusChange = (range) => {
        setRadius(range);
    };

    const sampleData = [
        {
            "imageUrl": "https://example.com/images/product1.jpg",
            "productName": "Organic Apple Juice",
            "expirationDate": "2024-10-05",
            "productId": "12345678",
            "location": "3012 Bern",
            "address": "Münsterplatz 1"
        },
        {
            "imageUrl": "https://example.com/images/product2.jpg",
            "productName": "Whole Wheat Bread",
            "expirationDate": "2024-11-15",
            "productId": "23456789",
            "location": "3012 Bern",
            "address": "Kramgasse 12"
        },
        {
            "imageUrl": "https://example.com/images/product3.jpg",
            "productName": "Almond Milk",
            "expirationDate": "2024-09-22",
            "productId": "34567890",
            "location": "3012 Bern",
            "address": "Marktgasse 15"
        },
        {
            "imageUrl": "https://example.com/images/product4.jpg",
            "productName": "Granola Bars",
            "expirationDate": "2024-08-30",
            "productId": "45678901",
            "location": "3012 Bern",
            "address": "Gerechtigkeitsgasse 3"
        },
        {
            "imageUrl": "https://example.com/images/product5.jpg",
            "productName": "Greek Yogurt",
            "expirationDate": "2024-12-12",
            "productId": "56789012",
            "location": "3012 Bern",
            "address": "Schwarztorstrasse 7"
        },
        {
            "imageUrl": "https://example.com/images/product6.jpg",
            "productName": "Dark Chocolate",
            "expirationDate": "2024-11-08",
            "productId": "67890123",
            "location": "3012 Bern",
            "address": "Postgasse 22"
        },
        {
            "imageUrl": "https://example.com/images/product7.jpg",
            "productName": "Avocado Oil",
            "expirationDate": "2024-10-27",
            "productId": "78901234",
            "location": "3012 Bern",
            "address": "Bollwerk 5"
        },
        {
            "imageUrl": "https://example.com/images/product8.jpg",
            "productName": "Quinoa Pasta",
            "expirationDate": "2024-09-15",
            "productId": "89012345",
            "location": "3012 Bern",
            "address": "Schauplatzgasse 11"
        },
        {
            "imageUrl": "https://example.com/images/product9.jpg",
            "productName": "Honey Oats Cereal",
            "expirationDate": "2024-12-01",
            "productId": "90123456",
            "location": "3012 Bern",
            "address": "Waisenhausplatz 18"
        },
        {
            "imageUrl": "https://example.com/images/product10.jpg",
            "productName": "Chia Seeds",
            "expirationDate": "2024-08-15",
            "productId": "01234567",
            "location": "3012 Bern",
            "address": "Bundesgasse 30"
        },
        {
            "imageUrl": "https://example.com/images/product11.jpg",
            "productName": "Coconut Water",
            "expirationDate": "2024-09-10",
            "productId": "11234567",
            "location": "3012 Bern",
            "address": "Zytgloggelaube 8"
        },
        {
            "imageUrl": "https://example.com/images/product12.jpg",
            "productName": "Peanut Butter",
            "expirationDate": "2024-10-20",
            "productId": "21234567",
            "location": "3012 Bern",
            "address": "Neuengasse 23"
        },
        {
            "imageUrl": "https://example.com/images/product13.jpg",
            "productName": "Whole Grain Rice",
            "expirationDate": "2024-12-31",
            "productId": "31234567",
            "location": "3012 Bern",
            "address": "Spitalgasse 9"
        },
        {
            "imageUrl": "https://example.com/images/product14.jpg",
            "productName": "Organic Almonds",
            "expirationDate": "2024-11-05",
            "productId": "41234567",
            "location": "3012 Bern",
            "address": "Theaterplatz 4"
        },
        {
            "imageUrl": "https://example.com/images/product15.jpg",
            "productName": "Green Tea",
            "expirationDate": "2024-09-25",
            "productId": "51234567",
            "location": "3012 Bern",
            "address": "Länggassstrasse 13"
        },
        {
            "imageUrl": "https://example.com/images/product16.jpg",
            "productName": "Sunflower Seeds",
            "expirationDate": "2024-10-15",
            "productId": "61234567",
            "location": "3012 Bern",
            "address": "Lorrainebrücke 19"
        },
        {
            "imageUrl": "https://example.com/images/product17.jpg",
            "productName": "Vegetable Chips",
            "expirationDate": "2024-12-20",
            "productId": "71234567",
            "location": "3012 Bern",
            "address": "Helvetiaplatz 6"
        },
        {
            "imageUrl": "https://example.com/images/product18.jpg",
            "productName": "Cashew Butter",
            "expirationDate": "2024-08-28",
            "productId": "81234567",
            "location": "3012 Bern",
            "address": "Monbijoustrasse 17"
        },
        {
            "imageUrl": "https://example.com/images/product19.jpg",
            "productName": "Organic Tomato Sauce",
            "expirationDate": "2024-09-18",
            "productId": "91234567",
            "location": "3012 Bern",
            "address": "Effingerstrasse 27"
        },
        {
            "imageUrl": "https://example.com/images/product20.jpg",
            "productName": "Brown Rice Syrup",
            "expirationDate": "2024-11-29",
            "productId": "10234567",
            "location": "3012 Bern",
            "address": "Laupenstrasse 14"
        }
    ];

    const handleSubmit = () => {
        setSlide(1);
        // wait 5 seconds then switch to slide 2
        analyzeImageWithStructuredOutput(sampleData, mealType).then((response) => {
            console.log(response.data["choices"][0]["message"]["content"], "response");
            setAiRecipes(JSON.parse(response.data["choices"][0]["message"]["content"])["recipes"])
            setSlide(2);

        })
    };

    const buttonStyle = "text-white py-2 px-4 m-2 rounded-full text-center";
    const selectedButtonStyle = "border-2 border-black";

    const video = React.useRef(null);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            {slide == 0 && (
                <>
                    < HeaderWidget title="Rezeptbuch" />
                    <ScrollView className="w-full">
                        <View className="mb-4 mx-4 mt-8">
                            <Text className="text-lg font-semibold mb-2">Art</Text>
                            <View className="flex-row flex-wrap justify-start">
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🍳 Frühstück" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🍳 Frühstück")}
                                >
                                    <Text className="text-white">🍳 Frühstück</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🥗 Lunch" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🥗 Lunch")}
                                >
                                    <Text className="text-white">🥗 Lunch</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🍛 Abendessen" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🍛 Abendessen")}
                                >
                                    <Text className="text-white">🍛 Abendessen</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🥪 Snacks" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🥪 Snacks")}
                                >
                                    <Text className="text-white">🥪 Snacks</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🍮 Dessert" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🍮 Dessert")}
                                >
                                    <Text className="text-white">🍮 Dessert</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${mealType === "🥤 Smoothies" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleMealTypeChange("🥤 Smoothies")}
                                >
                                    <Text className="text-white">🥤 Smoothies</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mb-4 mx-5">
                            <Text className="text-lg font-semibold mb-2">Schwierigkeit</Text>
                            <View className="flex-row flex-wrap justify-start">
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${difficulty === "🤩 Einfach" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleDifficultyChange("🤩 Einfach")}
                                >
                                    <Text className="text-white">🤩 Einfach</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${difficulty === "😌 Mittel" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleDifficultyChange("😌 Mittel")}
                                >
                                    <Text className="text-white">😌 Mittel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${difficulty === "🤓 Anspruchsvoll" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleDifficultyChange("🤓 Anspruchsvoll")}
                                >
                                    <Text className="text-white">🤓 Anspruchsvoll</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mb-4 mx-5">
                            <Text className="text-lg font-semibold mb-2">Entfernung</Text>
                            <View className="flex-row flex-wrap justify-start">
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${radius === "🚶 >500m" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleRadiusChange("🚶 >500m")}
                                >
                                    <Text className="text-white">{"🚶 >500m"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${radius === "🚲 >1km" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleRadiusChange("🚲 >1km")}
                                >
                                    <Text className="text-white">{"🚲 >1km"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${radius === "🚍 >3km" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleRadiusChange("🚍 >3km")}
                                >
                                    <Text className="text-white">{"🚍 >3km"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${buttonStyle} bg-[#769C65] ${radius === "🚘 >5km" ? selectedButtonStyle : ""}`}
                                    onPress={() => handleRadiusChange("🚘 >5km")}
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
                </>

            )}

            {slide == 1 && (
                <>
                    <Video
                        ref={video}
                        source={CookingAnimation}
                        style={{ width: 150, height: 150 }}
                        useNativeControls
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                    />
                    <View className="flex flex-row mb-5 mx-4">
                        <View className={`${buttonStyle} bg-[#769C65]`}>
                            <Text className="text-white">{mealType}</Text>
                        </View>
                        <View className={`${buttonStyle} bg-[#769C65]`}>
                            <Text className="text-white">{difficulty}</Text>
                        </View>
                        <View className={`${buttonStyle} bg-[#769C65]`}>
                            <Text className="text-white">{radius}</Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-center mx-10">
                        <Icon name="sparkles" size={35} color="#000" />
                        <Text className="font-bold text-xl ml-5 flex-1">Deine Rezeptvorschläge werden generiert...</Text>
                    </View>
                </>
            )
            }
            {slide == 2 && (
                <>
                    <HeaderWidget title="Rezepte" />
                    <ScrollView className="w-full">
                        <Text className="mx-4 text-lg mb-5 mt-2">Rezepte, basierend auf deinen Eingaben.</Text>
                        <View className="flex flex-row">
                            <View className={`${buttonStyle} bg-[#769C65]`}>
                                <Text className="text-white">{mealType}</Text>
                            </View>
                            <View className={`${buttonStyle} bg-[#769C65]`}>
                                <Text className="text-white">{difficulty}</Text>
                            </View>
                            <View className={`${buttonStyle} bg-[#769C65]`}>
                                <Text className="text-white">{radius}</Text>
                            </View>
                        </View>

                        {AiRecipes.map((recipe, index) => (
                            <TouchableOpacity onPress={() => {
                                router.push({
                                    pathname: "../DetailedRecipe",
                                    params: { data: JSON.stringify(recipe) }
                                });
                            }} className="bg-white border border-gray-300 rounded-lg px-4 pt-3 pb-8 mx-8 my-2" key={index}>
                                <View className="flex-row">
                                    <View className=" flex-1">
                                        <Text className="text-xl font-bold">{recipe.name}</Text>
                                        {/*<Text className="text-gray-500 text-lg ">Zutaten: {recipe.ingredientsNearby.join(", ")}</Text>*/}
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-lg text-black font-bold w-full mt-5">Anleitung</Text>
                                    <Text className="text-lg text-black bg-blue w-full mt-2">{recipe.description}</Text>
                                </View>
                                <View>
                                    <Text className="text-lg text-black font-bold w-full mt-5">Anleitung</Text>
                                    {recipe.products.map((product, index) => {
                                        return <Text>{product.productName}</Text>
                                    })}
                                </View>
                                <TouchableOpacity
                                    className="bg-blue-500 text-white rounded-lg mt-5 w-full py-5"
                                    onPress={() => navigation.navigate('index')}
                                >
                                    <Text className="text-center w-full text-white">Bestäue</Text>
                                </TouchableOpacity>

                            </TouchableOpacity>
                        ))}

                    </ScrollView>


                </>
            )

            }


        </View>
    );
};

export default explore;
