// protect.js

export function requireLogin() {
    // Usamos la key correcta que se guarda en login
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "login.html";
        return null; // por seguridad
    }
    return user;
}

export function requireAdmin() {
    const user = requireLogin();
    if (!user) return; // previene errores si no hay usuario

    // Comparamos en mayúsculas para evitar problemas de minúsculas
    if (user.rol?.toUpperCase() !== "ADMIN") {
        alert("Acceso denegado");
        window.location.href = "index.html";
        return null;
    }
    return user;
}

export function requireUser() {
    const user = requireLogin();
    if (!user) return;

    if (user.rol?.toUpperCase() !== "USUARIO") {
        alert("Acceso solo para usuarios");
        window.location.href = "dashboard.html";
        return null;
    }
    return user;
}
