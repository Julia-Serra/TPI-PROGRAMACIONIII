// protect.js

export function requireLogin() {
    const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "login.html";
    }
    return user;
}

export function requireAdmin() {
    const user = requireLogin();
    if (user.rol !== "ADMIN") {
        alert("Acceso denegado");
        window.location.href = "index.html";
    }
    return user;
}

export function requireUser() {
    const user = requireLogin();
    if (user.rol !== "USUARIO") {
        alert("Acceso solo para usuarios");
        window.location.href = "dashboard.html";
    }
    return user;
}
