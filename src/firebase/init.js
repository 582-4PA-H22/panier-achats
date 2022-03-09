import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Initialiser Firebase
export const instanceFirebase = initializeApp(firebaseConfig);

// Initialiser Firestore
export const bdFirestore = getFirestore();