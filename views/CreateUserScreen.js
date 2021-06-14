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
// Components

// Styles
//import './style.css'

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    mail: "",
    phone: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };
  
  const saveNewUser= async () => {
    if(state.name==='' || state.mail==='' || state.phone===''){
        alert ('Introduce un valor')
    }else{
        await firebase.conexion.collection('usersAdmin') .add({
            name: state.name,
            mail: state.mail,
            phone: state.phone,
        
        })
        alert('Guardado exitosamente')
        props.navigation.navigate('userList');
    }

  }
  const AddNewUser = async () => {
    if (state.name === "") {
      alert("introduce un valor");
    } else {
      alert(state.name);
      console.log(state);
    }
  };
  return (
    <ScrollView stylesheet={styles.container}>
      <View styles={styles.inputGroup}>
        <TextInput
          placeholder="nombre"
          onChangeText={(value) => handleChangeText("name", value)}
        />
        
      </View>
      <View styles={styles.inputGroup}>
        <TextInput
          placeholder="Correo"
          onChangeText={(value) => handleChangeText("mail", value)}
        />
       
      </View>
      <View styles={styles.inputGroup}>
       
        <TextInput
          placeholder="Telefono"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>

      <Button 
        title="Guardar"
        //onPress={() =>AddNewUser()}
        onPress={() =>saveNewUser()}
      />
    </ScrollView>
  );
};

const styles =StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee', 
    }
})

export default CreateUserScreen;