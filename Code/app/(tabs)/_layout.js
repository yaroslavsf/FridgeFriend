import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { ImageBackground, View, SafeAreaView } from 'react-native';
import { BlurView } from "expo-blur";

export default function TabLayout() {
    color = "white";
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle: { height: 115 },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: "white",

                tabBarStyle: {
                    position: 'absolute',
                    bottom: -40,
                    left: 0,
                    right: 0,
                    height: 130, // Increase height slightly to ensure coverage
                    borderTopWidth: 0,
                    paddingBottom: 0,
                },
                tabBarBackground: () => (
                    <SafeAreaView style={{ flex: 1 }}>
                        <BlurView intensity={50} style={{ flex: 1 }}>
                            <ImageBackground
                                source={require('../../assets/Tabbar.png')}
                                style={{ flex: 1, height: '100%', width: '100%' }}
                                resizeMode="cover"
                            >
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                                    {/* Tab buttons will be rendered here */}
                                </View>
                            </ImageBackground>
                        </BlurView>
                    </SafeAreaView>
                ),
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