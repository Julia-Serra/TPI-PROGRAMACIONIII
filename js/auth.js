// ===============
// LOGIN
// ===============
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        // Consultamos a MockAPI usando api.js
        const user = await api.apiLogin(email, password);

        if (!user) {
            alert("Email o contraseña incorrectos");
            return;
        }

        // 🔹 Función detectRol dentro de auth.js
        function detectRol(user) {
            if (!user) return null;
            if (user.rol) return user.rol.toUpperCase();
            if (user.role) return user.role.toUpperCase();
            if (user.tipo) return user.tipo.toUpperCase();
            return null;
        }

        // 🔹 Console log para ver el rol real
        console.log("ROL DETECTADO:", detectRol(user));
        console.log("Objeto completo:", user);

        // Guardamos el usuario logueado en localStorage
        localStorage.setItem("user", JSON.stringify(user));

        const rol = detectRol(user);

        // Redirección según rol
        if (rol === "ADMIN") {
            window.location.href = "admin.html"; // admins primero ven gestión
        } else if (rol === "USER" || rol === "USUARIO") {
            window.location.href = "user-home.html"; // usuarios normales
        } else {
            alert("Rol desconocido. Contacte al administrador.");
            window.location.href = "login.html";
        }

    } catch (err) {
        console.error(err);
        alert("Error al iniciar sesión");
    }
});
