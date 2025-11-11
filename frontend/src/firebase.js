// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:  process.env.Firebase_API,
  authDomain: "campaign-tracker-c67e1.firebaseapp.com",
  projectId: "campaign-tracker-c67e1",
  storageBucket: "campaign-tracker-c67e1.appspot.com",
  messagingSenderId: "943458597921",
  appId: "1:943458597921:web:d77eca54bfdcb1099db760"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
