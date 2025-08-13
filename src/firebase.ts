// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// NEW: Import the connect functions
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// NEW: Import the connect functions
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
export const firestore = getFirestore(app);

// This checks if the app is running on localhost and connects to the local
// Firebase emulators if it is. It is is useful for development and testing
// purposes, allowing you to run Firebase services locally without affecting
// production data.
// NOTE: The Firebase emulators must be running for this to work.
if (window.location.hostname === "localhost") {
  console.log("Development mode: Connecting to local Firebase emulators.");

  // Point the Auth service to the local emulator
  // Port 9099 is set in firebase.json
  connectAuthEmulator(auth, "http://localhost:9099");

  // Point the Firestore service to the local emulator
  // Port 5002 is set in firebase.json
  connectFirestoreEmulator(firestore, "localhost", 5002);
}
