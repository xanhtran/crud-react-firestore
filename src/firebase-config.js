// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrKmWEho27MabmdJg69_9VBjRupYGsXA0",
  authDomain: "crud-react-firestore-95ab2.firebaseapp.com",
  projectId: "crud-react-firestore-95ab2",
  storageBucket: "crud-react-firestore-95ab2.appspot.com",
  messagingSenderId: "577749020621",
  appId: "1:577749020621:web:25756f2d684ceb8cebde84",
  measurementId: "G-34CKB50VHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);