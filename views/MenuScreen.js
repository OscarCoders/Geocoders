// Dependencies
import React  from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import  firebase from '../Database/firebase'

const Menu=(props)=>{

    return(
        <View>
        <Button title="Consulta de usuarios" onPress= {()=> props.navigation.navigate("UserList") } />
        <Button title="Consulta de cliente(GPS)" onPress= {()=> props.navigation.navigate("GpsLista") } />
        <Button title="Salir" onPress= {()=> props.navigation.navigate("MenuScreen") } />
        </View>
    );
};

export default Menu;