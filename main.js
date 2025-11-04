let previewBox = document.getElementById("preview-box")
let animationName = document.getElementById("animation-name")
let loginBtn = document.getElementById("loginBtn")
let signupBtn = document.getElementById("signupBtn")

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

    if (index >= messages.length) {
        index = 0;
    }
}

setInterval(textChange, 3000);

textChange();

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "Login.html"
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "Signup.html"
});
previewBox.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "Login.html"
});