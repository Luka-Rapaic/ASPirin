function toggleExpand(param) {
    const div = param.parentElement.children[4];
    div.classList.toggle("expanded");
    param.innerText = param.innerText === "Expand" ? "Shrink" : "Expand";
}

function focusC(param) {
    const parent = param.parentElement;
    parent.children[1].classList.remove("active");
    parent.children[0].classList.add("active");
    const div = parent.children[4];
    div.children[1].classList.remove("visible");
    div.children[0].classList.add("visible");
}

function focusCPP(param) {
    const parent = param.parentElement;
    parent.children[0].classList.remove("active");
    parent.children[1].classList.add("active");
    const div = parent.children[4];
    div.children[0].classList.remove("visible");
    div.children[1].classList.add("visible");
}

function toggleNavbar() {
    const navbar = document.getElementById("navbar");
    const header = document.getElementById("header");
    const window = document.getElementById("window");
    navbar.classList.toggle("hidden");
    header.classList.toggle("expanded");
    window.classList.toggle("expanded");
}