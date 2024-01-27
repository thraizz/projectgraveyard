// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "oldprojectshowcaser",
  storageBucket: "oldprojectshowcaser.appspot.com",
  messagingSenderId: "236463367771",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-7NMKG60ZCE",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const firestore = getFirestore(app);

export const auth = getAuth(app);
