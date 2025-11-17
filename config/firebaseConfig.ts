import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaEvzNzHsMPEUcutUCsKtdnnrrKErLjA4",
  authDomain: "fir-project-2348c.firebaseapp.com",
  projectId: "fir-project-2348c",
  storageBucket: "fir-project-2348c.firebasestorage.app",
  messagingSenderId: "356526007150",
  appId: "1:356526007150:web:3414a9b7af34379324d77f",
  measurementId: "G-YTS2Q6SC97"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };