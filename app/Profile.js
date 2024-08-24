import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import SuccessBarImg from '../assets/SuccessBarImg.png';
import { useState } from 'react';
import { ModalItem } from './ModalItem';
import AwardWidget from './AwardWidget';

const Profile = () => {
    const router = useRouter();

    // Modal item Location config
    const [dropdownVisibleLocation, setDropdownVisibleLocation] = useState(false);
    const optionsLocation = [
        'Berlin',
        'Munich',
        'Hamburg'
    ];
    const closeDropdownLocation = () => {
        setDropdownVisibleLocation(false);
    };

    // Modal item Language config
    const [dropdownVisibleLanguage, setDropdownVisibleLanguage] = useState(false);
    const optionsLanguage = [
        'Bern Deutsch',
        'Deutsch',
        'Englisch'
    ];
    const closeDropdownLanguage = () => {
        setDropdownVisibleLanguage(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => router.back()} className="mt-7 ml-3 flex-row items-center">
                <Icon name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-between w-full mt-3">
                <Text className="text-3xl font-bold ml-5">Hallo, Jan!</Text>
                <Icon name="person-circle-outline" size={35} color="#000" className="mr-5" />
            </View>
            <View className="bg-white border border-gray-300 rounded-lg px-4 py-5 flex-row relative mx-5 my-4">
                <View className="ml-4 flex-1 items-center">
                    <View className="flex-row items-center justify-start w-full">
                        <Icon name="trophy" size={30} color="black" />
                        <Text className="text-3xl font-bold ml-5">Mini Erfoulg</Text>
                    </View>
                    <View className="w-full items-center justify-center my-0 h-32">
                        <Image source={SuccessBarImg} className="w-full" resizeMode="contain" />
                    </View>
                </View>
            </View>

            <AwardWidget successBarImg={SuccessBarImg} />
            <ScrollView className="min-h-screen">
                <Pressable onPress={() => { router.navigate("Preferences") }}>
                    <View className="mt-5 ml-5 flex-row items-center justify-start w-full">
                        <Icon name="heart" size={30} color="#AFE1AF" className="mr-2" />
                        <Text className="text-xl font-bold">Präferenzen</Text>
                    </View>
                </Pressable>


                <Pressable onPress={() => { router.navigate("Reservations") }}>
                    <View className="flex-row items-center justify-start w-full mt-5 ml-5">
                        <Icon name="bag-handle-outline" size={30} color="#000000" className="mr-2" />
                        <Text className="text-xl font-bold">Reservationen</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => { router.navigate("Products") }}>
                    <View className="flex-row items-center justify-start w-full mt-5 ml-5">
                        <Icon name="cube-outline" size={30} color="#000000" className="mr-2" />
                        <Text className="text-xl font-bold">Meine Produkte</Text>
                    </View>
                </Pressable>
                {/* Modal Location */}
                <Pressable onPress={() => setDropdownVisibleLocation(!dropdownVisibleLocation)}>
                    <View className="flex-row items-center justify-start w-full mt-5 ml-5">
                        <Icon name="navigate" size={30} color="#000000" className="mr-2" />
                        <Text className="text-xl font-bold">Standort</Text>
                    </View>
                    <ModalItem visible={dropdownVisibleLocation} onClose={closeDropdownLocation} options={optionsLocation} />
                </Pressable>

                <Pressable onPress={() => { router.navigate("Settings") }}>
                    <View className="flex-row items-center justify-start w-full mt-5 ml-5">
                        <Icon name="settings" size={30} color="#000000" className="mr-2" />
                        <Text className="text-xl font-bold">Kontoeinstellungen</Text>
                    </View>
                </Pressable>
                {/* Modal Location */}
                <Pressable onPress={() => setDropdownVisibleLanguage(!dropdownVisibleLanguage)}>
                    <View className="flex-row items-center justify-start w-full mt-5 ml-5">
                        <Icon name="language" size={30} color="#000000" className="mr-2" />
                        <Text className="text-xl font-bold">Sprache</Text>
                    </View>
                    <ModalItem visible={dropdownVisibleLanguage} onClose={closeDropdownLanguage} options={optionsLanguage} />
                </Pressable>

            </ScrollView>
        </View>
    );
};



export default Profile;