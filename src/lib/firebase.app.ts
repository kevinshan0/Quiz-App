import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBd_A-IlYBDnEfWU_zGbWy8w0GgNAEYQq4",
  authDomain: "quiz-app-99861.firebaseapp.com",
  projectId: "quiz-app-99861",
  storageBucket: "quiz-app-99861.appspot.com",
  messagingSenderId: "792969090137",
  appId: "1:792969090137:web:554b31c1b738e175b38d48",
  measurementId: "G-0JT02M2S6M"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
    db,
    auth
}