// =======================
// PROTECCIÓN DE RUTA
// =======================
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.rol !== "USER") {
    window.location.href = "login.html";
}

// =======================
// MOSTRAR INFO DEL USUARIO
// =======================
document.getElementById("userName").textContent = user.nombre;
document.getElementById("userEmail").textContent = user.email;

// =======================
// CARGAR DATOS DEL USUARIO DESDE MOCKAPI
// =======================

// Traer inscripciones del usuario
async function cargarInscripciones() {
    const cont = document.getElementById("inscripcionesList");
    cont.innerHTML = "Cargando...";

    const inscripciones = await api.apiGet(`inscripciones?userId=${user.id}`);

    cont.innerHTML = "";

    if (inscripciones.length === 0) {
        cont.innerHTML = "<p>No tenés inscripciones aún.</p>";
        return;
    }

    inscripciones.forEach(i => {
        const item = document.createElement("div");
        item.classList.add("list-group-item");

        item.innerHTML = `
            <strong>${i.nombreCurso}</strong><br>
            Estado: ${i.estado}<br>
            <button class="btn btn-danger btn-sm mt-2" onclick="desinscribirse('${i.id}')">Cancelar inscripción</button>
        `;

        cont.appendChild(item);
    });
}

// Cancelar inscripción
async function desinscribirse(id) {
    if (!confirm("¿Seguro que deseas cancelar esta inscripción?")) return;

    await api.apiDelete(`inscripciones/${id}`);
    cargarInscripciones();
    cargarCursosProgreso();
}

// =======================
// CURSOS EN PROGRESO
// =======================
async function cargarCursosProgreso() {
    const cont = document.getElementById("cursosProgreso");
    cont.innerHTML = "Cargando...";
    
    const cursos = await api.apiGet(`inscripciones?userId=${user.id}&estado=EN_PROGRESO`);

    cont.innerHTML = "";

    if (cursos.length === 0) {
        cont.innerHTML = "<p>No tenés cursos en progreso.</p>";
        return;
    }

    cursos.forEach(c => {
        const item = document.createElement("div");
        item.classList.add("list-group-item");

        item.innerHTML = `
            <strong>${c.nombreCurso}</strong><br>
            Avance: ${c.progreso || 0}%<br>
            <button class="btn btn-success btn-sm mt-2" onclick="marcarFinalizado('${c.id}')">Marcar como finalizado</button>
        `;

        cont.appendChild(item);
    });
}

// Marcar curso como finalizado
async function marcarFinalizado(id) {
    await api.apiPut(`inscripciones/${id}`, {
        estado: "FINALIZADO",
        progreso: 100
    });

    cargarCursosProgreso();
    cargarCursosFinalizados();
}

// =======================
// CURSOS FINALIZADOS
// =======================
async function cargarCursosFinalizados() {
    const cont = document.getElementById("cursosFinalizados");
    cont.innerHTML = "Cargando...";
    
    const cursos = await api.apiGet(`inscripciones?userId=${user.id}&estado=FINALIZADO`);

    cont.innerHTML = "";

    if (cursos.length === 0) {
        cont.innerHTML = "<p>No tenés cursos finalizados.</p>";
        return;
    }

    cursos.forEach(c => {
        const item = document.createElement("div");
        item.classList.add("list-group-item");

        item.innerHTML = `
            <strong>${c.nombreCurso}</strong><br>
            COMPLETADO ✔
        `;

        cont.appendChild(item);
    });
}

// =======================
// INICIALIZAR TODO
// =======================
cargarInscripciones();
cargarCursosProgreso();
cargarCursosFinalizados();
