// resources/js/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9-aXmDIUBkj7KOhceA-jebjOL2T28d5M",
    authDomain: "mklive-ba68e.firebaseapp.com",
    projectId: "mklive-ba68e",
    storageBucket: "mklive-ba68e.appspot.com",
    messagingSenderId: "211550180675",
    appId: "1:211550180675:web:79a9a6e424c088e12acbf6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
