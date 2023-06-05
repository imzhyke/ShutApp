import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABeuB4_uhOWFtRT_YP-fzJ_gQeaFc-vOM",
  authDomain: "firestore-listview.firebaseapp.com",
  projectId: "firestore-listview",
  storageBucket: "firestore-listview.appspot.com",
  messagingSenderId: "369772101394",
  appId: "1:369772101394:web:98c0422d71497bc2a37dcb",
  measurementId: "G-24XSTNXX2D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const db = getFirestore(app);
export const signIn = signInWithEmailAndPassword;