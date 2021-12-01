import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
//import firebase from "../Database/firebase";
import * as Firebase from 'firebase';
import * as ImagePicker from "expo-image-picker";

import {config} from "../Database/firebase";

const UploadImage = () => {
  if(!Firebase.apps.length){
     Firebase.initializeApp(config)
  }

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () =>{
      const blob = await new Promise((resolve, reject) =>{
          const xhr = new XMLHttpRequest();
          xhr.onload = function(){
              resolve(xhr.response);
          };
          xhr.onerror = function(){
              reject(new TypeError('network request failed'))
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);

      });

      const ref = Firebase.storage().ref().child(new Date().toISOString());
      const snapshot = ref.put(blob)
      snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,()=>{
        setUploading(true)
      }, (error) =>{
          setUploading(false)
          console.log(error)
          blob.close()
          return;
      }, () =>{
          snapshot.snapshot.ref.getDownloadURL().then((url)=>{
            setUploading(false)
            console.log('download url: ', url)
            blob.close()
            return url;
          });
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <View>
          
          <Image source ={{uri:image}} style={{width:'100%', height:300}}/>
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Elige una imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadImage}
            style={[styles.button, styles.buttonOutline]}
            disabled={uploading ? true : false}
          >
            <Text style={styles.buttonOutlineText}>{uploading ? 'cargando...' : 'subir imagen'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
