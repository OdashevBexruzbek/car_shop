import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2tEVBb3Uxvuxlv4sZNrZIDBSEc9wjBnI",
  authDomain: "todo-app-d6e62.firebaseapp.com",
  projectId: "todo-app-d6e62",
  storageBucket: "todo-app-d6e62.appspot.com",
  messagingSenderId: "706258767956",
  appId: "1:706258767956:web:587e672c10172ba3285dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

