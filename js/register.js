document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const nuevoUser = {
        nombre,
        email,
        password,
        rol: "USER"   // <-- IMPORTANTE
    };

    try {
        await api.apiCreateUser(nuevoUser);
        alert("Cuenta creada correctamente");

        window.location.href = "login.html";
    } catch (err) {
        alert("Error al crear usuario: " + err.message);
    }
});
