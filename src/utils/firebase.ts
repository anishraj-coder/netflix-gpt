// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC55i52IxdU6HNxOaiIngFw1mYWVrRAfPQ",
    authDomain: "netflix-gpt-b09ea.firebaseapp.com",
    projectId: "netflix-gpt-b09ea",
    storageBucket: "netflix-gpt-b09ea.firebasestorage.app",
    messagingSenderId: "258305376482",
    appId: "1:258305376482:web:4c15d8b5d0ce3f77969ebb",
    measurementId: "G-ESGL81WP97"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);