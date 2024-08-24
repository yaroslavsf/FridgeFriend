import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, ScrollView, Image } from "react-native";
import SuccessBarImg from '../assets/SuccessBarImg.png';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
    const router = useRouter();

    return (
        <View >
            <TouchableOpacity onPress={() => router.back()} className="mt-7 ml-3 flex-row items-center">
                <Icon name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-between w-full mt-3">
                <Text className="text-3xl font-bold ml-5">Hallo, Jan!</Text>
                <Icon name="person-circle-outline" size={35} color="#000" className="mr-5" />
            </View>
            
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'white', marginTop: 50 }}>
            <ScrollView>
                 {/* Profile Picture Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Icon name="image-outline" size={24} color="black" />
                <Text style={{ marginLeft: 8, fontSize: 16 }}>Profilbild ändern</Text>
            </View>

            {/* Name Section */}
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: 80 }}>Name</Text>
                <Text style={{ fontSize: 16 }}>Jan Musterman</Text>
            </View>

            {/* Contact Details Section */}
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Kontaktdaten</Text>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, width: 80 }}>Adresse</Text>
                    <Text style={{ fontSize: 16 }}>Musterweg 5</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, width: 80 }}>Ort</Text>
                    <Text style={{ fontSize: 16 }}>3012 Bern</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, width: 80 }}>email</Text>
                    <Text style={{ fontSize: 16 }}>jan.muster@icloud.com</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, width: 80 }}>Tel.</Text>
                    <Text style={{ fontSize: 16 }}>078 111 11 11</Text>
                </View>
            </View>

            {/* Delete Profile */}
            <TouchableOpacity className="mt-24 ml-32">
                <Text style={{ color: 'gray', fontSize: 16 }}>Profil löschen</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
           
        </View>
    )
}

export default Profile;