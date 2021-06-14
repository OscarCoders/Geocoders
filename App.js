import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet } from 'react-native'
import {NavigationContainer,StackActions} from '@react-navigation/native'//npm install @react-navigation/native
import {createStackNavigator} from '@react-navigation/stack';//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
import {firebaseApp} from "./Database/firebase"

const Stack = createStackNavigator();
import MapViewScreen from './views/MapViewScreen'
import GeoLocationScreen from './views/GeoLocationScreen'
import UserList from './views/UserList';
import CreateUserScreen from './views/CreateUserScreen';
import UserDetailScreen from './views/UserDetailScreen';

function MyStack() {
  return(
    <Stack.Navigator>
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{title: 'Menu'}} />
        {/* <Stack.Screen name="GeoLocationScreen" component={GeoLocationScreen} options={{title: 'Geolocalización de usuario'}} /> */}
        {/* <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{title: 'Geolocalización y Mapeo'}} /> */}
        <Stack.Screen name="userList" component={UserList} options={{title:'Lista de usuarios'}} />
        <Stack.Screen name="createUserScreen" component={CreateUserScreen} options={{title:'Crear usuario'}}/>
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{title:'Detalle de usuario'}}/>
       
    </Stack.Navigator>
  )
}

function App(){
  return (
    <NavigationContainer>
         <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
   
})

export default App;
