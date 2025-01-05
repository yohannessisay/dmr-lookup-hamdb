
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

interface ImportMeta {
  env: {
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
  };
}

  
const firebaseConfig = { 
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
export { db };