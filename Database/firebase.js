import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAZnrzAiTJb-2qw7gJj-ec1-EIyPaRqaSs",
  authDomain: "geocoders-5c90c.firebaseapp.com",
  //databaseURL: "YOUR_DATABASE_URL",
  projectId: "geocoders-5c90c",
  storageBucket: "geocoders-5c90c.appspot.com",
  //messagingSenderId: "927027289317"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

const conexion = firebase.firestore()
export default {
    firebase,
    conexion,
}