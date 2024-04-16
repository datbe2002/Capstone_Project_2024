// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { collection, getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyCa5Gyv8zbVQcWQDwGrk-C7XZwF84UYHoI",
//     authDomain: "ftai-firebase-auth.firebaseapp.com",
//     databaseURL: "https://ftai-firebase-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "ftai-firebase-auth",
//     storageBucket: "ftai-firebase-auth.appspot.com",
//     messagingSenderId: "713920214373",
//     appId: "1:713920214373:web:f9390a985bb9dfe5751d8c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// })



// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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