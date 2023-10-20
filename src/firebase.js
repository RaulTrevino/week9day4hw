import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCB3KSL1KyM41dyIXSPRV3F0ZY0kQ2_C0w",
    authDomain: "week-9-day-4-hw.firebaseapp.com",
    projectId: "week-9-day-4-hw",
    storageBucket: "week-9-day-4-hw.appspot.com",
    messagingSenderId: "537886792395",
    appId: "1:537886792395:web:9bc08a9a3afbabe073994e"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  //get auth from firebase
export const db =getFirestore(app)
export default app