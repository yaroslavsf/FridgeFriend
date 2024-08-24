import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { ImageBackground, View } from 'react-native';
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';


const TabBarBackground = () => {
    const StyledBlurView = styled(BlurView);
    const StyledLinearGradient = styled(LinearGradient);

    return (
        <StyledBlurView
            className="absolute inset-0"
            intensity={50} // Adjust the blur intensity
            tint="light"  // Options: 'light', 'dark', 'default'
        >
            <StyledLinearGradient
                colors={['#006400', 'transparent']} // Dark green to transparent
                className="absolute inset-0"
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <View className="flex-row justify-around items-center h-full text-white">
                {/* Tab buttons will be rendered here */}
            </View>
        </StyledBlurView>
    );
};


export default function TabLayout() {
    color = "white";
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle: { height: 70 },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 70, // Adjust height as needed
                    overflow: 'hidden',
                    borderTopWidth: 0,
                    paddingBottom: 0,
                },
                tabBarBackground: () => (
                    <BlurView
                        intensity={10}
                        source={require('../../assets/Tabbar.png')} // Replace with your image path
                    >
                        <ImageBackground
                            source={require('../../assets/Tabbar.png')} // Replace with your image path
                        >
                            <View className="flex-row justify-around items-center h-full text-white ">
                                {/* Tab buttons will be rendered here */}
                            </View>
                        </ImageBackground>
                    </BlurView>
                )

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} className="ml-10 shadow-sm" />,
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color }) => <FontAwesome size={45} name="plus-circle" color={color} className="shadow-sm" />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <FontAwesome size={26} name="book" color={color} className="mr-10 shadow-sm" />,
                }}
            />
        </Tabs>
    );
}