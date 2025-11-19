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

        // Guardamos el usuario logueado en localStorage (UNIFICADO)
        localStorage.setItem("user", JSON.stringify(user));

        // Redirección según rol
        if (user.rol === "ADMIN") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "user-home.html";
        }

    } catch (err) {
        console.error(err);
        alert("Error al iniciar sesión");
    }
});

// ===============
// LOGOUT
// ===============
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}
