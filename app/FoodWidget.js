import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodWidget = ({ imageUrl, productName, expirationDate, location, address }) => {
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(96)).current; // Initial height value (collapsed)
    const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity value for the button
    const translateYAnim = useRef(new Animated.Value(20)).current; // Initial position for the button

    useEffect(() => {
        // Animate the height of the widget
        Animated.timing(heightAnim, {
            toValue: expanded ? 230 : 130, // Expanded and collapsed height
            duration: 300, // Duration of the animation
            easing: Easing.ease, // Easing function
            useNativeDriver: false, // Set to true if animating transform properties
        }).start();

        // Animate the button appearance
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: expanded ? 1 : 0, // Fade in or out
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: expanded ? 0 : 20, // Slide in or out
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    }, [expanded]);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Pressable onPress={handleExpand}>
            <Animated.View
                style={{
                    height: heightAnim, // Animated height
                }}
                className="bg-white border border-gray-300 rounded-lg px-4 py-8 mx-8 my-2"
            >
                {/* Image Section */}
                <View className="flex-row">
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
                </View>

                {/* Info Icon */}
                <View className="absolute top-2 right-2">
                    <Icon
                        name={expanded ? "information-circle-outline" : "information-circle-sharp"} // Filled heart if favorite, outline if not
                        size={24}
                        color={expanded ? "#759B64" : "#759B64"} // Change color based on favorite status
                    />
                </View>

                <Animated.View
                    style={{
                        opacity: opacityAnim,
                        transform: [{ translateY: translateYAnim }],
                        backgroundColor: 'w-full'
                    }}
                >

                    <Text className="text-lg text-black bg-blue w-full mt-5">{address}</Text>

                </Animated.View>

                {/* Animated Button */}
                <Animated.View
                    style={{
                        opacity: opacityAnim,
                        transform: [{ translateY: translateYAnim }],
                        backgroundColor: '#769C65'
                    }}
                    className="p-3 mt-3 rounded-full"
                >
                    <TouchableOpacity onPress={() => alert('Button Pressed')}>
                        <Text className="ml-3 text-white text-lg">Reservieren</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

export default FoodWidget;
