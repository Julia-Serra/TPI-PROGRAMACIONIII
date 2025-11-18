// ================================
// CARGAR USUARIOS AL ARRANCAR
// ================================
async function cargarUsuarios() {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = `<tr><td colspan="4">Cargando...</td></tr>`;

    try {
        const users = await api.apiGetUsers();
        tbody.innerHTML = "";

        users.forEach(user => {
            agregarFilaUsuario(user);
        });

    } catch (err) {
        tbody.innerHTML = `
            <tr><td colspan="4" class="text-danger">Error al cargar usuarios</td></tr>
        `;
        console.error(err);
    }
}

// ================================
// AGREGAR FILA A LA TABLA
// ================================
function agregarFilaUsuario(user) {
    const tbody = document.getElementById("userTableBody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>${user.rol}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${user.id}')">
                Eliminar
            </button>
        </td>
    `;

    tbody.appendChild(tr);
}

// ================================
// CREAR USUARIO
// ================================
document.getElementById("adminCreateUser").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("adminNombre").value;
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    const rol = document.getElementById("adminRol").value;

    const nuevoUser = { nombre, email, password, rol };

    try {
        const creado = await api.apiCreateUser(nuevoUser);
        agregarFilaUsuario(creado);

        alert("Usuario creado correctamente");

        e.target.reset();
    } catch (err) {
        alert("Error al crear usuario: " + err.message);
    }
});

// ================================
// ELIMINAR USUARIO
// ================================
async function eliminarUsuario(id) {
    if (!confirm("¿Eliminar este usuario?")) return;

    try {
        await request(`${BASE_URL}/users/${id}`, { method: "DELETE" });

        // Recargar lista
        cargarUsuarios();
    } catch (err) {
        alert("Error al eliminar usuario");
        console.error(err);
    }
}

// ================================
// INICIO
// ================================
cargarUsuarios();
