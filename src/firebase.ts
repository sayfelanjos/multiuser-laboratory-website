// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics and get a reference to the service
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
const firestore = getFirestore(app);

// Initialize Firebase Functions and get a reference to the service
const functions = getFunctions(app, "southamerica-east1");

// This checks if the app is running on localhost and connects to the local
// Firebase emulators if it is. It is is useful for development and testing
// purposes, allowing you to run Firebase services locally without affecting
// production data.
// NOTE: The Firebase emulators must be running for this to work.
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  process.env.NODE_ENV === "development"
) {
  console.log("Development mode: Connecting to local Firebase emulators.");

  // Point the Auth service to the local emulator
  // Port 9099 is set in firebase.json
  connectAuthEmulator(auth, "http://127.0.0.1:9099");

  // Point the Firestore service to the local emulator
  // Port 5002 is set in firebase.json
  connectFirestoreEmulator(firestore, "127.0.0.1", 5002);

  // Point the Functions service to the local emulator
  // Port 5001 is set in firebase.json
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { analytics, auth, firestore, functions };
