// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXhhSgsH8hHSN_2hQpWl_nK64xQEeKAjo",
    authDomain: "school-dashboard-7.firebaseapp.com",
    projectId: "school-dashboard-7",
    storageBucket: "school-dashboard-7.appspot.com",
    messagingSenderId: "885925214774",
    appId: "1:885925214774:web:c38537720318155c39f697"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;