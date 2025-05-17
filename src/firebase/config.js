// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuLNq-g1mdIkkHNApukc73UGvk6HflC2g",
  authDomain: "voyagehack-c1acb.firebaseapp.com",
  projectId: "voyagehack-c1acb",
  storageBucket: "voyagehack-c1acb.firebasestorage.app",
  messagingSenderId: "318867079803",
  appId: "1:318867079803:web:101ea4d5b099bc035a58de"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider() 
