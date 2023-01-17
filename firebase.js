import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.NEXTRON_APP_CHAT_API_KEY,
  // authDomain: process.env.NEXTRON_APP_CHAT_AUTH_DOMAIN,
  // projectId: process.env.NEXTRON_APP_CHAT_PROJECT_ID,
  // storageBucket: process.env.NEXTRON_APP_CHAT_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXTRON_APP_CHAT_MESSSAGING_SENDER_ID,
  // appId: process.env.NEXTRON_APP_CHAT_APP_ID
  apiKey: "AIzaSyCiKax-n5OhGOj8X76X8q9VOinwd0WFb94",
  authDomain: "fir-reactchatapp.firebaseapp.com",
  projectId: "fir-reactchatapp",
  storageBucket: "fir-reactchatapp.appspot.com",
  messagingSenderId: "344586815178",
  appId: "1:344586815178:web:af055057bbdf96a8fa5633"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
export const db = getFirestore();