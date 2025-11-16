import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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

// DOM
let nameInput = document.getElementById("name-input");
let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");
let signUpBtnsp = document.getElementById("signup-btn-signup-pg");
let loginBtnsp = document.getElementById("login-btn-signup-pg");

signUpBtnsp.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const name = nameInput.value;

    try {
        await setPersistence(auth, browserLocalPersistence);

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        alert(`${user.email} Your account is created successfully!`);
        window.location.href = "/html/home.html";

    } catch (error) {
        alert(error.message);
    }
});

loginBtnsp.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/html/Login.html";
});
