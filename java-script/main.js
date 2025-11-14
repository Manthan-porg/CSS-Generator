import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    let previewBox = document.getElementById("preview-box");
    let animationName = document.getElementById("animation-name");
    let loginBtn = document.getElementById("loginBtn");
    let signupBtn = document.getElementById("signupBtn");

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

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    window.location.href = "/html/home.html";
                } else {
                    console.log("no user logged in");
                }
            });
        })
        .catch(error => console.error(error));

    loginBtn.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "/html/Login.html";
    });

    signupBtn.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "/html/Signup.html";
    });

    previewBox.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "/html/Login.html";
    });

});
