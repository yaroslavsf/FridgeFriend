import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import HeaderWidget from "../HeaderWidget";
import { analyzeImageWithStructuredOutput } from "../../api/open_ai/stuctured_image_output";
import { useRouter } from "expo-router";

const AddItem = () => {
    const router = useRouter();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);
    const navigation = useNavigation();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // State to manage the loader

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="flex-1 justify-center">
                <Text className="text-center pb-4">We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current =>
            current === 'back' ? 'front' : 'back'
        );
    };

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const takePhoto = async () => {
        if (cameraRef.current && isCameraReady) {
            const options = { quality: 0.5, base64: true, skipProcessing: false };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
            handlePhotoUpload(newPhoto.uri);
        }
    };

    const handlePhotoUpload = async (newPhoto) => {
        setIsLoading(true);  // Show loader while waiting for response

        try {
            analyzeImageWithStructuredOutput(newPhoto).then((response) => {
                setIsLoading(false);  // Hide loader after the process is complete
                router.push({
                    pathname: "../EditResults",
                    params: { response: JSON.stringify(response.data) }
                });
            });



        } catch (error) {
            console.error('Upload failed:', error);
        } finally {

        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <HeaderWidget title="Add Item" className="z-50 pb-10 bg-white" />
            <View className="flex-1 justify-center items-center bg-white">
                <CameraView
                    animateShutter={false}
                    mute={true}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute', // Make sure the camera view covers the parent container
                    }}
                    className="mb-6"
                    type={facing}
                    ref={cameraRef}
                    onCameraReady={onCameraReady}
                    ratio="16:9"
                >
                    <View className="flex-1 flex-row bg-transparent m-40">
                        {isLoading ? (  // Show loader if isLoading is true
                            <ActivityIndicator size="large" color="#white" />
                        ) : (
                            <TouchableOpacity className="flex-1 self-end items-center bg-slate-800 opacity-60 py-5 px-3 rounded-full" onPress={takePhoto}>
                                <Text className="text-2xl font-bold text-white ">Take Photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </CameraView>
            </View>
        </View>
    );
};

export default AddItem;
