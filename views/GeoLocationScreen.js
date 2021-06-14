import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet,alert, Button,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from 'react-native-elements';

const GeoLocationScreen = (props) =>{ 
  const [location, setLocation] = useState({
      latitude:0,
      longitude:0,

  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let ubicacion = await Location.getCurrentPositionAsync({});
      setLocation({
          latitude:ubicacion.coords.latitude,
          longitude:ubicacion.coords.longitude,  

      });
      alert(location.coords.latitude);
      alert(location);
    })();
  }, []);
  

  return (
      <ScrollView>
    <View style={styles.container}>
      <Text h1>Latitud:</Text>
      <Text style={styles.paragraph}>{location.latitude}</Text>
      <Text h1>Longitud:</Text>
      <Text style={styles.paragraph}>{location.longitude}</Text>
      
    </View>
    <View>
            <Button title="Abrir mapa"
            onPress={()=>props.navigation.navigate("MapViewScreen")}/>
        </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GeoLocationScreen