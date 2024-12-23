// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//auth import -> step-1
import { getAuth} from "firebase/auth";
// firestore step-1
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlVJeExNXWr7wCzEdt6zntuMl5CtNJpEM",
  authDomain: "wa-clone-4ade5.firebaseapp.com",
  projectId: "wa-clone-4ade5",
  storageBucket: "wa-clone-4ade5.firebasestorage.app",
  messagingSenderId: "743108599871",
  appId: "1:743108599871:web:b5f6778baa89e0fa1d988a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth-step-2
const auth = getAuth(app)
// firestore step-2
const db = getFirestore();

export {auth, db}