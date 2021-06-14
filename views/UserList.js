import React, {useEffect,useState} from 'react'
import {View, Text, ScrollView,Button} from 'react-native'
import  firebase from '../Database/firebase'
//import {ListItem, Avatar} from 'react-native-gesture-handler'
import {ListItem, Avatar} from 'react-native-elements'


const UsersList =  (props) =>{
  
  const [users,setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const users = [];

      await firebase.conexion
      .collection('usersAdmin') 
      .get()
      .then((querySnapshot) => {
      
      //.onSnapshop((querySnapshot) => {
        //const users =[];
            querySnapshot.forEach((doc) => {
            const {
              name,
              mail,
              phone,
            } = doc.data();
            users.push({
              id: doc.id,
              name,
              mail,
              phone,
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
            <Button title="Create Users" onPress= {()=> props.navigation.navigate("createUserScreen") } />
            <Button title="Menu Principal" onPress= {()=> props.navigation.navigate("MenuScreen") } />
            {
              users.map((user) => {
                 return (
                  <ListItem  key={user.id} 
                  bottomDivider 
                  //onPress= {()=> alert("Su Id es: "+user.id)}
                  onPress= {()=> props.navigation.navigate('UserDetailScreen', {
                    userId: user.id,
                    userName: user.name,
                    userMail: user.mail,
                    userPhone: user.phone,
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

export default UsersList