import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getDatabase(app);


onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        onValue(userRef, (snapshot) => {
            const designs = snapshot.val();
            const container = document.querySelector(".design-container");
            container.innerHTML = "";

            if (designs) {
                for (let key in designs) {
                    const design = designs[key];

                    const box = document.createElement("div");
                    box.classList.add("design-box");

                    box.innerHTML = `
            <div class="box-header">
                <span class="design-title">${design.title}</span>
                <div class="box-actions">
                    <i class="fas fa-copy copy-btn"></i>
                    <i class="fas fa-trash delete-btn"></i>
                </div>
            </div>
            <p class="design-date">${design.date}</p>
            <pre class="design-code">${design.code}</pre>
`;



box.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this design?")) {
        const designRef = ref(db, 'users/' + user.uid + '/' + key);
        remove(designRef)
            .then(() => alert("Design deleted!"))
            .catch((err) => alert("Error deleting: " + err.message));
    }
});


                    container.appendChild(box);

                    box.querySelector(".copy-btn").addEventListener("click", () => {
                        navigator.clipboard.writeText(design.code)
                            .then(() => alert("Code copied!"))
                            .catch(() => alert("Failed to copy"));
                    });
                }
            } else {
                const emptyMessage = document.createElement("p");
                emptyMessage.classList.add("empty-message")
                emptyMessage.textContent = "You have no saved designs yet!";
                container.appendChild(emptyMessage);
            }
        });
    } else {
        alert("No user signed in");
        window.location.href = "/html/home.html";
    }
});

