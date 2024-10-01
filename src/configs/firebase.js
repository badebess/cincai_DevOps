// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHJ-CK4Zh5i1_YrGorCAdNhuQpl9buY5E",
    authDomain: "admin-wash-mac.firebaseapp.com",
    projectId: "admin-wash-mac",
    storageBucket: "admin-wash-mac.appspot.com",
    messagingSenderId: "411334861805",
    appId: "1:411334861805:web:a4a60cddc975a22d23fde4",
    measurementId: "G-ZFVEMBNHJT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
