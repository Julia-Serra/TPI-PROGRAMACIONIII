// Manejo del login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
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

        // GUARDAR usuario en localStorage con un nombre unificado:
        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 Redirigir según el rol
        if (user.rol === "ADMIN") {
            window.location.href = "dashboard.html";   // SOLO ADMIN
        } else {
            window.location.href = "index.html";        // USUARIO COMÚN
        }

    } catch (err) {
        console.error(err);
        alert("Error al iniciar sesión");
    }
});