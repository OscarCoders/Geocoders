import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Button,TextInput,ScrollView,Alert} from "react-native";
import firebase from "../Database/firebase";

const UserDetailScreen = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    mail: "",
    phone: "",
  });
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  //console.log(props.route.params.userId);
  const getUserById= async (Id) => {
    try {
      const users = [];
      await firebase.conexion
      .collection('usersAdmin') 
      .doc(Id)
      .get()
      .then((documentSnapshot) => {
        if(documentSnapshot.exists ) {
            setUser ({...user,
            id: documentSnapshot.data().id,
            name: documentSnapshot.data().name,
            mail: documentSnapshot.data().mail,
            phone:documentSnapshot.data().phone,
            });
        }
     })
    } catch (e) {
        alert(e);
      }
  };
  
  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);
  const updateUser = async (usr) => {
    try {
      const users = [];
      await firebase.conexion
      .collection('usersAdmin') 
      .doc(usr)
      .update({
        name: user.name,
        mail: user.mail,
        phone: user.phone,  
      })
      .then(() => {
            console.log('user updated!');
        });
        //setUsers(users);
      } catch (e) {
        alert(e);
      }
      props.navigation.navigate('userList');
  };
  const deleteUser = async (usr) => {
    try {
      const users = [];
      await firebase.conexion
      .collection('usersAdmin') 
      .doc(usr)
      .delete()
      .then(() => {
        props.navigation.navigate('userList');
        });
        //setUsers(users);
      } catch (e) {
        alert(e);
      }
  };
  const confirmarEliminacion=()=> {
    Alert.alert('Eliminando Usuario', '¿Está seguro que desea eliminar?', 
    [ {text: 'Si', onPress:() => deleteUser(props.route.params.userId)},
      {text: 'No', onPress:() => alert("Cancelado")}  
    ])
    
}

  return (
    <ScrollView stylesheet={styles.container}>
      <View styles={styles.inputGroup}>
        <TextInput
          placeholder="nombre"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
        
      </View>
      <View styles={styles.inputGroup}>
        <TextInput
          placeholder="Correo"
          value={user.mail}
          onChangeText={(value) => handleChangeText("mail", value)}
        />
       
      </View>
      <View styles={styles.inputGroup}>
       
        <TextInput
          placeholder="Telefono"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>

      <Button 
        title="Actualizar"
        color="#348D68"
        //onPress={() =>AddNewUser()}
        onPress= {()=> updateUser(props.route.params.userId) }
      />
      <Button 
        title="Eliminar"
        color="#C07646"
        //onPress={() =>AddNewUser()}
        onPress= {()=> confirmarEliminacion() }
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
export default UserDetailScreen;