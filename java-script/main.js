import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBMLeRwSaoaZ90Rq5eGTofldpOhxVzMWJk",
    authDomain: "css-generator-3a49e.firebaseapp.com",
    projectId: "css-generator-3a49e",
    storageBucket: "css-generator-3a49e.firebasestorage.app",
    messagingSenderId: "481681683841",
    appId: "1:481681683841:web:d15634427414a09e792480",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "/html/home.html";
    }
});

document.getElementById("googleSignInBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithPopup(auth, provider);
        window.location.href = "/html/home.html";
    } catch (error) {
        alert(error.message);
    }
});


document.addEventListener("DOMContentLoaded", () => {

    let animationName = document.getElementById("animation-name");

    const messages = [
        "Generate Beautiful CSS",
        "Customize Box Shadows",
        "Create Stunning Borders",
        "Design Effortlessly"
    ];

    let index = 0;
    function textChange() {
        animationName.style.opacity = 0;
        setTimeout(() => {
            animationName.textContent = messages[index];
            animationName.style.opacity = 1;
        }, 500);
        index++;
        if (index >= messages.length) index = 0;
    }

    setInterval(textChange, 3000);
    textChange();
});
