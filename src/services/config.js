// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC46DTYAFRaZSYHI-9bDZjBFkLEiI4WeBw",
  authDomain: "electiva-ux.firebaseapp.com",
  projectId: "electiva-ux",
  storageBucket: "electiva-ux.appspot.com",
  messagingSenderId: "796872328935",
  appId: "1:796872328935:web:7eb9c3221e86dc9a4b0442"
};

const firebaseApp = initializeApp(firebaseConfig)

export const database = getDatabase(firebaseApp)
export const storage = getStorage()
export const firestore = getFirestore(firebaseApp)

export const refDB = ref
