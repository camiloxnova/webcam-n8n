import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACdDSnq3NXJA4JAYaRj4BRBCYLHklD948",
  authDomain: "claro-media-84b5d.firebaseapp.com",
  projectId: "claro-media-84b5d",
  storageBucket: "claro-media-84b5d.firebasestorage.app",
  messagingSenderId: "862865498110",
  appId: "1:862865498110:web:df302788869b534b28eaaf",
  measurementId: "G-BLRTS932Q7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
