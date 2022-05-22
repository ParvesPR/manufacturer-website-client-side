// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBh9qZsJ4Rdaphatt5YcE0WmvNYSps9U_U",
    authDomain: "manufacturer-36735.firebaseapp.com",
    projectId: "manufacturer-36735",
    storageBucket: "manufacturer-36735.appspot.com",
    messagingSenderId: "455787158050",
    appId: "1:455787158050:web:d913c2c3d650a290c2487b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;