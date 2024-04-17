import { initializeApp } from "firebase/app";

import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAi0XyLbQmHzvxCVaddl1ltBIGzB5FyR9M",
    authDomain: "fsvton-18ce5.firebaseapp.com",
    databaseURL: "https://fsvton-18ce5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fsvton-18ce5",
    storageBucket: "fsvton-18ce5.appspot.com",
    messagingSenderId: "225303706605",
    appId: "1:225303706605:web:d7e661bca1007c8561c5e4",
    measurementId: "G-5YEKNTC5BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const roomRef = collection(db, 'rooms')