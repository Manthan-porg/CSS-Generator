import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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

// Sign Up Page script 

let nameInput = document.getElementById("name-input").value;
let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");
let signUpBtnsp = document.getElementById("signup-btn-signup-pg");
let loginBtnsp = document.getElementById("login-btn-signup-pg");

signUpBtnsp.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email)
    console.log(password)
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return updateProfile(user, { displayName: nameInput });
        })
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`${user.email} Your account is created successfully`)
            window.location.href = "/html/home.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
})



loginBtnsp.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/html/Login.html"
})
