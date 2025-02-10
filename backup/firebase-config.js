// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM8V-mfyo23d7YUROs55pe5qcfVhPjeAQ",
  authDomain: "snyder-9b75a.firebaseapp.com",
  databaseURL: "https://snyder-9b75a-default-rtdb.firebaseio.com",
  projectId: "snyder-9b75a",
  storageBucket: "snyder-9b75a.firebasestorage.app",
  messagingSenderId: "958152391467",
  appId: "1:958152391467:web:084c0b0413f1fb98ada36e",
  measurementId: "G-4R11798MEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };