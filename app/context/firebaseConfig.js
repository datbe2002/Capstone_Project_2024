// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCa5Gyv8zbVQcWQDwGrk-C7XZwF84UYHoI",
    authDomain: "ftai-firebase-auth.firebaseapp.com",
    databaseURL: "https://ftai-firebase-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ftai-firebase-auth",
    storageBucket: "ftai-firebase-auth.appspot.com",
    messagingSenderId: "713920214373",
    appId: "1:713920214373:web:f9390a985bb9dfe5751d8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const roomRef = collection(db, 'rooms') 