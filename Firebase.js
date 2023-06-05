import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCChy75e_qAOUnhNMrHmJ7xHj2gcbo2We8",
  authDomain: "activity5-a34fb.firebaseapp.com",
  projectId: "activity5-a34fb",
  storageBucket: "activity5-a34fb.appspot.com",
  messagingSenderId: "136543536078",
  appId: "1:136543536078:web:27b708d120e5f871a2219f",
  measurementId: "G-4DP58RJ07E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const db = getFirestore(app);
export const signIn = signInWithEmailAndPassword;