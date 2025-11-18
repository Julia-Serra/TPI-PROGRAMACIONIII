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

        // Guardamos el usuario logueado en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));

        // Redirigimos según el rol
        if (user.rol === "ADMIN") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }

    } catch (err) {
        console.error(err);
        alert("Error al iniciar sesión");
    }
});
