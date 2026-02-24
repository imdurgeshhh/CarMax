// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carmax-425cf.firebaseapp.com",
  projectId: "carmax-425cf",
  storageBucket: "carmax-425cf.firebasestorage.app",
  messagingSenderId: "325762509406",
  appId: "1:325762509406:web:baf96e28e6c2631930e2cf",
  measurementId: "G-WNDPGRNTGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);