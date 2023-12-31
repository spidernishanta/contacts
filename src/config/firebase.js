// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKu0m-aAVKnMpu_H9YY9EeVb9RO1TFuks",
  authDomain: "contacts-b014a.firebaseapp.com",
  projectId: "contacts-b014a",
  storageBucket: "contacts-b014a.appspot.com",
  messagingSenderId: "263658249889",
  appId: "1:263658249889:web:7b6c8f270d32b5ebe61ae0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);