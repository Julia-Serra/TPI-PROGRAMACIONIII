// =======================
// PROTECCIÓN DE RUTA
// =======================
import { requireUser } from "./protect.js";

// Obtenemos el usuario y validamos que sea un usuario normal
const user = requireUser();
if (!user) {
    // requireUser ya redirige al login si no es usuario
    throw new Error("No autorizado");
}

// =======================
// MOSTRAR INFO DEL USUARIO
// =======================
document.getElementById("userName").textContent = user.nombre;
document.getElementById("userEmail").textContent = user.email;

// =======================
// CARGAR DATOS DEL USUARIO DESDE MOCKAPI
// =======================

// Traer todas las inscripciones y filtrar por usuario
async function cargarInscripciones() {
    const cont = document.getElementById("inscripcionesList");
    cont.innerHTML = "Cargando...";

    const inscripciones = (await api.apiGetEnrollments()).filter(i => i.userId === user.id);

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

    await api.apiDeleteEnrollment(id); // 🔹 agregar en api.js
    await cargarInscripciones();
    await cargarCursosProgreso();
}

// =======================
// CURSOS EN PROGRESO
// =======================
async function cargarCursosProgreso() {
    const cont = document.getElementById("cursosProgreso");
    cont.innerHTML = "Cargando...";

    const cursos = (await api.apiGetEnrollments())
        .filter(i => i.userId === user.id && i.estado === "EN_PROGRESO");

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
    await api.apiUpdateEnrollment(id, { estado: "FINALIZADO", progreso: 100 });

    await cargarCursosProgreso();
    await cargarCursosFinalizados();
}

// =======================
// CURSOS FINALIZADOS
// =======================
async function cargarCursosFinalizados() {
    const cont = document.getElementById("cursosFinalizados");
    cont.innerHTML = "Cargando...";

    const cursos = (await api.apiGetEnrollments())
        .filter(i => i.userId === user.id && i.estado === "FINALIZADO");

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
(async () => {
    await cargarInscripciones();
    await cargarCursosProgreso();
    await cargarCursosFinalizados();
})();
