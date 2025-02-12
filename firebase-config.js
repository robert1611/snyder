import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

// Your Firebase configuration stays exactly the same
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
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