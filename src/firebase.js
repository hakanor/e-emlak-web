
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "e-emlak-94aba.firebaseapp.com",
  projectId: "e-emlak-94aba",
  storageBucket: "e-emlak-94aba.appspot.com",
  messagingSenderId: "116668734930",
  appId: "1:116668734930:web:c85dd9e17957f75b84fc0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);