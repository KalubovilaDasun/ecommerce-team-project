// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_n7TcnJPJdiil9wX4imL9ZzoeRMddiUQ",
  authDomain: "gizmohub-ac094.firebaseapp.com",
  projectId: "gizmohub-ac094",
  storageBucket: "gizmohub-ac094.firebasestorage.app",
  messagingSenderId: "959546411869",
  appId: "1:959546411869:web:282dbb7e9784438ca4f6b4",
  measurementId: "G-EBHFS3EVN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);