// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjoME0Ng9NLrvesvv17HMXZUAWnSThGR8",
  authDomain: "the-accountant-68111.firebaseapp.com",
  projectId: "the-accountant-68111",
  storageBucket: "the-accountant-68111.appspot.com",
  messagingSenderId: "826506195415",
  appId: "1:826506195415:web:80f7ad4c349a3a53d65b92",
  measurementId: "G-G3J6Z81R87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}