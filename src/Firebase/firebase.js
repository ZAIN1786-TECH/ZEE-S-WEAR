// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs7x-XyPkMefW1bgpW_adSSca4xtpLYTY",
  authDomain: "zee-s-wear.firebaseapp.com",
  projectId: "zee-s-wear",
  storageBucket: "zee-s-wear.firebasestorage.app",
  messagingSenderId: "966274743607",
  appId: "1:966274743607:web:04be752d6bde0518956eb2",
  measurementId: "G-1NLHQVZ3B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;