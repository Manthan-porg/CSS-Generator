import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMLeRwSaoaZ90Rq5eGTofldpOhxVzMWJk",
    authDomain: "css-generator-3a49e.firebaseapp.com",
    projectId: "css-generator-3a49e",
    storageBucket: "css-generator-3a49e.firebasestorage.app",
    messagingSenderId: "481681683841",
    appId: "1:481681683841:web:d15634427414a09e792480",
    measurementId: "G-2FRZ84BTTY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user);
        console.log("Display name:", user.displayName);

    } else {
        console.log("No user signed in.");
    }
});