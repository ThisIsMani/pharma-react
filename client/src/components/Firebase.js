import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDsDM0aLgVxjVayDlqJ0ovNR-XBX8ToRQg",
    authDomain: "pharma-9e4a8.firebaseapp.com",
    databaseURL: "https://pharma-9e4a8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pharma-9e4a8",
    storageBucket: "pharma-9e4a8.appspot.com",
    messagingSenderId: "107108290646",
    appId: "1:107108290646:web:ddf0c400f176e6528b6bf7",
};


const Firebase = getFirestore(initializeApp(firebaseConfig));

export default Firebase;
