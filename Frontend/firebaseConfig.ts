// firebase.config.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import getAuth to initialize Firebase Auth
import { getFirestore } from 'firebase/firestore'; // Import getFirestore to initialize Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyMoyJ0S6AD0OECehcuv9S7wnG1w0vX7I',
  authDomain: 'novacode-fd81a.firebaseapp.com',
  databaseURL: 'https://novacode-fd81a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'novacode-fd81a',
  storageBucket: 'novacode-fd81a.appspot.com',
  messagingSenderId: '942950112691',
  appId: '1:942950112691:web:cb7eea1baab62b602a7fc6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firestore and export it
export const firestore = getFirestore(app);
