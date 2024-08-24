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
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
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
        console.log('Uploading photo:', newPhoto);

        setIsLoading(true);  // Show loader while waiting for response

        try {
            analyzeImageWithStructuredOutput(newPhoto).then((response) => {
                console.log('Upload success:', JSON.stringify(response.data));
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
        <View style={styles.container}>
            <HeaderWidget title="Scanne deinen Kühlschrank!" />
            <CameraView
                animateShutter={false}
                mute={true}
                style={styles.camera}
                type={facing}
                ref={cameraRef}
                onCameraReady={onCameraReady}
                ratio="16:9"
            >
                <View style={styles.buttonContainer}>
                    {isLoading ? (  // Show loader if isLoading is true
                        <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 0.8,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default AddItem;
