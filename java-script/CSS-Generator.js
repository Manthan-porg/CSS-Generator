let sidebar = document.getElementById("sidebar")
let menuBtn = document.getElementById("menuBtn")
let mainMenuBtn = document.getElementById("main-menuBtn")

let toggleTrigger = (e) => {
    e.preventDefault();
    sidebar.classList.toggle("active");

}

menuBtn.addEventListener("click", toggleTrigger);
mainMenuBtn.addEventListener("click", toggleTrigger)
