import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { Context } from '../App';

export default function TakePictureButton() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  const [reference, setReference] = useState(null); 
  const [userId, setUserId] = useContext(Context);

  useEffect(() => {
    console.log("takePicutreButton log")
    if(userId){
      setReference(storage().ref(`users/${userId}/image.png`));
    }
    else{
      setReference(null);
    }
  }, [userId]);

  if(reference == null){
    return(
      <View>
        <Text>Please Sign in Before Taking Photos</Text>
      </View>
    );
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    if(facing == 'back'){
        setFacing('front');
    }
    else{
        setFacing('back');
    }
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  }

  async function acceptPicture() {
    console.log('picture taken');
    await uploadPhotoToStorage();

    setPhotoUri(null); 
  }

  function retakePicture() {
    setPhotoUri(null);
  }

  const uploadPhotoToStorage = async () => {
    const pathToFile = photoUri;
    await reference.putFile(pathToFile);
  }

  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.camera} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={async () => {acceptPicture()}}>
            <Text style={styles.text}>✅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.text}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>📸</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
