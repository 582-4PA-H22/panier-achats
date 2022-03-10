import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Initialiser Firebase
export const instanceFirebase = initializeApp(firebaseConfig);

// Initialiser Firebase Authentication
export const authFirebase = getAuth();

// Initialiser l'authentification fédérée Google
export const authGoogle = new GoogleAuthProvider();

// Initialiser Firestore
export const bdFirestore = getFirestore();