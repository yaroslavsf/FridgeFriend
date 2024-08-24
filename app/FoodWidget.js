import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// no components folder because otherwise NativeWind somehow doesn't work for elements in the component folder

const FoodWidget = ({ imageUrl, productName, expirationDate, location, isFavorite }) => {
    return (
        <View className="bg-white border border-gray-300 rounded-lg px-4 py-10 flex-row relative mx-5 my-2">
            {/* Image Section */}
            <Image
                source={{ uri: imageUrl }}
                className="w-24 h-24"
            />

            {/* Details Section */}
            <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{productName}</Text>
                <Text className="text-gray-500">Exp. {expirationDate}</Text>
                <View className="flex-row items-center mt-1">
                    <Icon name="location-outline" size={16} color="#000" />
                    <Text className="ml-1 text-gray-500">{location}</Text>
                </View>
            </View>

            {/* Favorite Icon */}
            <Icon
                name={isFavorite ? "heart" : "heart-outline"} // Filled heart if favorite, outline if not
                size={24}
                color="#000"
                className="absolute top-2 right-2"
            />
        </View>
    );
};

export default FoodWidget;