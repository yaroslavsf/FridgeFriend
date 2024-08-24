import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import HeaderWidget from "../HeaderWidget";
import axios from 'axios';

const AddItem = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);
    const navigation = useNavigation();
    const [isCameraReady, setIsCameraReady] = useState(false);

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
            handlePhotoUpload(newPhoto);
        }
    };

    const handlePhotoUpload = async (newPhoto) => {

        console.log('Uploading photo:', newPhoto);

        try {
            let formData = new FormData();
            formData.append('photo', {
                uri: newPhoto.uri,
                name: 'photo.jpg',
                type: 'image/jpg',
            });

            // const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });

            // console.log('Upload success:', response.data);

        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderWidget title="Scanne deinen Kühlschrank!" />
            <CameraView
                style={styles.camera}
                type={facing}
                ref={cameraRef}
                onCameraReady={onCameraReady}
                ratio="16:9"
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
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
        flex: 1,
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
