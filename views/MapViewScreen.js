import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet,alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from 'react-native-elements';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const MapViewScreen = (props) =>{ 

    const [region, setRegion] = useState({
        latitude: props.route.params.userLatitud,
        longitude: props.route.params.userLongitud,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
      const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
      //const credenciales = 'AIzaSyDTSM-YvE0SdPCyFAxGSXoBuwC0YUNtKCY';
    // const coordinates = [
    //   {
    //     latitude: 20.6649716,
    //     longitude: -105.2158435,
    //   },
    //   {
    //     latitude: props.route.params.userLatitud,
    //     longitude: props.route.params.userLongitud,
    //   }
    // ]
    const getLocation = async () => {
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
          latitude: ubicacion.coords.latitude,
          longitude: ubicacion.coords.longitude,
          
  
      });
      // alert(location.coords.latitude);
      // alert(location);
  }
  //fin del fetch
      useEffect(() => {
          getLocation();
         
      }, []);


      
    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        <Marker coordinate={{ latitude: props.route.params.userLatitud, longitude: props.route.params.userLongitud }} />
        {/* <MapViewDirections 
        origin={{ latitude: 20.6649716, longitude: -105.2158435 }} 
        destination={{ latitude: props.route.params.userLatitud, longitude: props.route.params.userLongitud }}
        apikey={credenciales}
        /> */}
      </MapView>
    );
  };

  
  
  export default MapViewScreen;