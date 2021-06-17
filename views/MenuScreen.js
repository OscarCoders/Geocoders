// Dependencies
import React  from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,BackHandler
} from "react-native";
import { useState } from "react";
import  firebase from '../Database/firebase'

const MenuScreen=(props)=>{

    return(
        <View>
        <Button title="Consulta de usuarios" onPress= {()=> props.navigation.navigate("userList") } />
        <Button title="Consulta de cliente(GPS)" onPress= {()=> props.navigation.navigate("GpsLista") } />
        <Button title="Salir" onPress ={()=>{console.log('clicked'); return BackHandler.exitApp();}}/>
        </View>
    );
};

export default MenuScreen;