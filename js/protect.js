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

// Función para detectar dinámicamente el rol
function detectRol(user) {
    if (!user) return null;
    if (user.rol) return user.rol.toUpperCase();
    if (user.role) return user.role.toUpperCase();
    if (user.tipo) return user.tipo.toUpperCase();
    return null;
}

// Protege la página de admins
export function requireAdmin() {
    const user = requireLogin();
    if (!user) return null;

    const rol = detectRol(user);

    if (rol !== "ADMIN") {
        alert("Acceso denegado");
        window.location.href = "login.html";
        return null;
    }
    return user;
}

// Protege la página de usuarios normales
export function requireUser() {
    const user = requireLogin();
    if (!user) return null;

    const rol = detectRol(user);

    if (rol !== "USER" && rol !== "USUARIO") {
        alert("Acceso denegado");
        window.location.href = "login.html";
        return null;
    }
    return user;
}
