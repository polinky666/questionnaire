// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFM7OsVkwvQnSDHqvKdHvkl6mM1ngsVg8",
    authDomain: "questionnaire-47d07.firebaseapp.com",
    projectId: "questionnaire-47d07",
    storageBucket: "questionnaire-47d07.appspot.com",
    messagingSenderId: "348992798029",
    appId: "1:348992798029:web:4ef600fe9bcca36c86cb04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }