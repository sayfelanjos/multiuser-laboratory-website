// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz4XKiLpwbRTt9JpkMEsfHoCP8WiVJu98",
  authDomain: "multiuser-laboratory-website.firebaseapp.com",
  projectId: "multiuser-laboratory-website",
  storageBucket: "multiuser-laboratory-website.appspot.com",
  messagingSenderId: "310372615529",
  appId: "1:310372615529:web:15e36e1fa197d23cb029f8",
  measurementId: "G-PT0D6LTQED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
