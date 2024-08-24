import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodWidget = ({ imageUrl, productName, expirationDate, location, isFavorite, onToggleFavorite }) => {
    return (
        <View className="bg-white border border-gray-300 rounded-lg px-4 py-8 flex-row relative mx-8 my-2">
            {/* Image Section */}
            <Image
                source={{ uri: imageUrl }}
                className="w-24 h-24 rounded-md"
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
            <TouchableOpacity onPress={onToggleFavorite} className="absolute top-2 right-2">
                <Icon
                    name={isFavorite ? "heart" : "heart-outline"} // Filled heart if favorite, outline if not
                    size={24}
                    color={isFavorite ? "#759B64" : "#000"} // Change color based on favorite status
                />
            </TouchableOpacity>
        </View>
    );
};

export default FoodWidget;