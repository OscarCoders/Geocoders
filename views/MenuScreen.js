// Dependencies
import { useNavigation } from '@react-navigation/core'
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
import { auth } from '../Database/firebase'

const MenuScreen=(props)=>{
  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch(error => alert(error.message))
  }
    return(
        <View>
        <Button title="Consulta de usuarios" onPress= {()=> props.navigation.navigate("userList") } />
        <Button title="Consulta de cliente(GPS)" onPress= {()=> props.navigation.navigate("GpsLista") } />
        <Button title="Salir" onPress ={()=>{console.log('clicked'); return BackHandler.exitApp();}}/>
        <Button title="cerrar sesion" onPress ={handleSignOut}/>
        </View>
    );
};

export default MenuScreen;