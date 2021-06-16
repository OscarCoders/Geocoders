import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet,alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from 'react-native-elements';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";

const MapViewScreen = (props) =>{ 

    const [region, setRegion] = useState({
        latitude: props.route.params.userLatitud,
        longitude: props.route.params.userLongitud,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });



      
    return (
        <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
        <Marker coordinate={{ latitude: props.route.params.userLatitud, longitude: props.route.params.userLongitud }} />
      </MapView>
    );
  };

  
  
  export default MapViewScreen;