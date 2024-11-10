// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkJYKkRArsAKYf8xrv7-7U9QiB-5GRz4w",
  authDomain: "jlee-392-react.firebaseapp.com",
  databaseURL: "https://jlee-392-react-default-rtdb.firebaseio.com",
  projectId: "jlee-392-react",
  storageBucket: "jlee-392-react.firebasestorage.app",
  messagingSenderId: "409501828771",
  appId: "1:409501828771:web:c4c23a12be31f97b3e6116",
  measurementId: "G-4PE2HQMRTN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);