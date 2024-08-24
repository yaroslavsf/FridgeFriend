import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { ImageBackground, View } from 'react-native';

export default function TabLayout() {
    color = "white";
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle: { height: 135 },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: "#DCDCDC",
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100, // Adjust height as needed
                    overflow: 'hidden',
                    borderTopWidth: 0,
                    paddingBottom: 0,
                },
                tabBarBackground: () => (
                    <ImageBackground
                        source={require('../../assets/Tabbar.png')} // Replace with your image path
                    >
                        <View className="flex-row justify-around items-center h-full text-white ">
                            {/* Tab buttons will be rendered here */}
                        </View>
                    </ImageBackground>
                )

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color }) => <FontAwesome size={45} name="plus-circle" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <FontAwesome size={26} name="book" color={color} />,
                }}
            />
        </Tabs>
    );
}