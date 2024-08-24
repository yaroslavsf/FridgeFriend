import { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated, View, Text, Image, Easing } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import GoldMedalImage from '../assets/groupmedal.png';
import SilverMedalImage from '../assets/silvermedal.png';
import BronzeMedalImage from '../assets/bronzemedal.png';

const AwardWidget = ({ successBarImg }) => {
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(200)).current; // Initial height value (collapsed)
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value for the medals

    useEffect(() => {
        // Animate the height of the widget
        Animated.timing(heightAnim, {
            toValue: expanded ? 300 : 200, // Adjust the target height as needed
            duration: 300, // Duration of the animation
            easing: Easing.ease, // Easing function
            useNativeDriver: false, // Set to false for animating height
        }).start();

        // Animate the fade-in of the medals
        Animated.timing(fadeAnim, {
            toValue: expanded ? 1 : 0, // Fade in when expanded, fade out when collapsed
            duration: 300, // Duration of the fade animation
            easing: Easing.ease, // Easing function
            useNativeDriver: true, // Use native driver for opacity animation
        }).start();
    }, [expanded]);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity onPress={handleToggleExpand}>
            <Animated.View
                style={{
                    height: heightAnim, // Animated height
                }}
                className="bg-white border border-gray-300 rounded-lg px-4 py-5 flex-row relative mx-5 my-4"
            >
                <View className="w-full">
                    <View className="ml-4 items-center w-full">
                        <View className="flex-row items-center justify-start w-full">
                            <Icon name="trophy" size={30} color="black" />
                            <Text className="text-3xl font-bold ml-5">Mini Erfoulg</Text>
                        </View>
                        <View className="w-full items-center justify-center my-0 h-32">
                            <Image source={successBarImg} className="w-11/12" resizeMode="contain" />
                        </View>
                    </View>

                    {/* Medals Section with Fade Animation */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim, // Animated opacity for fade-in effect
                        }}
                        className="flex flex-row justify-around"
                    >
                        <Image source={GoldMedalImage} />
                        <Image source={SilverMedalImage} />
                        <Image source={BronzeMedalImage} />
                    </Animated.View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default AwardWidget;
