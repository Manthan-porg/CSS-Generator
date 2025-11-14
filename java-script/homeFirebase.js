import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMLeRwSaoaZ90Rq5eGTofldpOhxVzMWJk",
    authDomain: "css-generator-3a49e.firebaseapp.com",
    projectId: "css-generator-3a49e",
    storageBucket: "css-generator-3a49e.firebasestorage.app",
    messagingSenderId: "481681683841",
    appId: "1:481681683841:web:d15634427414a09e792480",
    measurementId: "G-2FRZ84BTTY",
    databaseURL: "https://css-generator-3a49e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

function userProfileUpdate() {
    let userName = document.getElementById('profileName')
    let userEmail = document.getElementById('profileEmail')
    let userUid = document.getElementById('profileUID')


    onAuthStateChanged(auth, (user) => {
        if (user) {

            userName.textContent = `Hey, ${user.displayName}`;
            userEmail.textContent = user.email;
            userUid.textContent = `UID : ${user.uid}`;

        } else {
            console.log("No user signed in.");
        }
    });
}


function logOutFunctionality() {
    let logoutBtn = document.getElementById('logoutBtn')
    logoutBtn.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully.");
                window.location.href = "/html/Login.html";
            })
            .catch((error) => {
                console.error("Logout error:", error);
                alert("Error logging out: " + error.message);
            });
    });
}

function saveDesign(title, code) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert("You must be logged in to save a design.");
            return;
        }

        const userRef = ref(db, 'users/' + user.uid);
        const newDesignRef = push(userRef);
        set(newDesignRef, {
            title: title,
            code: code,
            date: new Date().toISOString().split('T')[0]
        })
            .then(() => {
                alert("Design saved successfully!");
            })
            .catch((error) => {
                alert("Error saving design:", error);
            });
    });

}


function saveBtnFunctionality() {
    let saveBtn = document.querySelectorAll('#saveBtn');
    saveBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    alert("You must be logged in to save a design.");
                    return;
                }

                const outputPanel = btn.closest('.output-panel');
                const outputDiv = outputPanel.querySelector('.output');
                const textToSave = outputDiv.textContent.trim();

                let designName = prompt("Enter Design Name:").trim();
                if (!designName) {
                    alert("Design name cannot be empty!");
                    return;
                }

                saveDesign(designName, textToSave);
            });
        });
    });
}

function myDesignsBtnFucntionality() {
    let myDesignsBtn = document.getElementById("myDesignsBtn");
    myDesignsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "/html/designs.html";
    });
}



document.addEventListener("DOMContentLoaded", () => {
    userProfileUpdate();
    logOutFunctionality();
    saveBtnFunctionality();
    myDesignsBtnFucntionality();
});

