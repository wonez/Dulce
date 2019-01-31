import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBNc67zdjmTyutOLtMkIuDJl_6ZN5_UEgk",
    authDomain: "dulce-226122.firebaseapp.com",
    databaseURL: "https://dulce-226122.firebaseio.com",
    projectId: "dulce-226122",
    storageBucket: "dulce-226122.appspot.com",
    messagingSenderId: "607501341620"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage,
    firebase as default
}