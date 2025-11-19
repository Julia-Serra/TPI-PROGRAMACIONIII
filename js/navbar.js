// navbar.js

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const adminLinks = document.querySelectorAll(".nav-admin");
    const userLinks = document.querySelectorAll(".nav-user");
    const guestLinks = document.querySelectorAll(".nav-guest");

    if (!user) {
        // Invitado
        guestLinks.forEach(l => l.style.display = "inline-block");
        adminLinks.forEach(l => l.style.display = "none");
        userLinks.forEach(l => l.style.display = "none");
        return;
    }

    // Usuario logueado
    if (user.rol === "ADMIN") {
        adminLinks.forEach(l => l.style.display = "inline-block");
        userLinks.forEach(l => l.style.display = "none");
        guestLinks.forEach(l => l.style.display = "none");
    } else {
        userLinks.forEach(l => l.style.display = "inline-block");
        adminLinks.forEach(l => l.style.display = "none");
        guestLinks.forEach(l => l.style.display = "none");
    }
});

// =============================
// FUNCIÓN GLOBAL DE LOGOUT
// =============================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Hacerla accesible desde el HTML
window.logout = logout;
