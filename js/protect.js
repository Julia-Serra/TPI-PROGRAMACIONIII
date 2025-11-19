// protect.js

// Verifica si hay sesión iniciada
export function requireLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "login.html";
        return null;
    }
    return user;
}

// Protege la página de admins
export function requireAdmin() {
    const user = requireLogin();
    if (!user) return;

    if (user.rol?.toUpperCase() !== "ADMIN") {
        alert("Acceso denegado");
        window.location.href = "login.html"; // usuarios normales o intrusos vuelven al login
        return null;
    }
    return user;
}

// Protege la página de usuarios normales
export function requireUser() {
    const user = requireLogin();
    if (!user) return;

    if (user.rol?.toUpperCase() !== "USUARIO") {
        alert("Acceso denegado");
        window.location.href = "login.html"; // admins o intrusos vuelven al login
        return null;
    }
    return user;
}
