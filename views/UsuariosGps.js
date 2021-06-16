import React, {useEffect,useState} from 'react'
import {View, Text, ScrollView,Button} from 'react-native'
import  firebase from '../Database/firebase'
//import {ListItem, Avatar} from 'react-native-gesture-handler'
import {ListItem, Avatar} from 'react-native-elements'


const UsuariosGps =  (props) =>{
  
  const [users,setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const users = [];

      await firebase.conexion
      .collection('user') 
      .get()
      .then((querySnapshot) => {
      
      //.onSnapshop((querySnapshot) => {
        //const users =[];
            querySnapshot.forEach((doc) => {
            const {
              latitud,
              longitud,
              name,
            } = doc.data();
            users.push({
              id: doc.id,
              latitud,
              longitud,
              name,
            });
          });
        });
        setUsers(users);
      } catch (e) {
        alert(e);
      }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
        <ScrollView>
            
            <Button title="Menu Principal" onPress= {()=> props.navigation.navigate("MenuScreen") } />
            {
              users.map((user) => {
                 return (
                  <ListItem  key={user.id} 
                  bottomDivider 
                  //onPress= {()=> alert("Su Id es: "+user.id)}
                  onPress= {()=> props.navigation.navigate('GpsMap', {
                    userId: user.id,
                    userLatitud: user.latitud,
                    userLongitud: user.longitud
                  } ) }
                 >  
                    <ListItem.Chevron />
                    <Avatar source={{
                      uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                      }} 
                      rounded
                      />
                    <ListItem.Content>
                        <Text>{user.name}</Text>
                         <Text>{user.mail}</Text>
                    </ListItem.Content>
                 </ListItem>
                 
                  );

              })} 
        </ScrollView>

    ); 
}

export default UsuariosGps