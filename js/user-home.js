// ================
// PROTECCIÓN
// ================
import { requireUser } from "./protect.js";
const user = requireUser();

// PERFIL
document.getElementById("userName").textContent = user.nombre;
document.getElementById("userEmail").textContent = user.email;

// ================
// Cargar Inscripciones
// ================
async function cargarInscripciones() {
    const cont = document.getElementById("inscripcionesList");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const datos = await api.apiGetEnrollments();
        const inscripciones = datos.filter(i => i.userId === user.id);

        cont.innerHTML = "";

        if (inscripciones.length === 0) {
            cont.innerHTML = "<p>No tenés inscripciones.</p>";
            return;
        }

        inscripciones.forEach(i => {
            const item = document.createElement("div");
            item.className = "list-group-item";

            item.innerHTML = `
                <strong>${i.nombreCurso}</strong><br>
                Estado: <strong>${i.estado}</strong>
                <button class="btn btn-danger btn-sm mt-2 w-100 cancelar-btn" data-id="${i.id}">
                    Cancelar inscripción
                </button>
            `;

            cont.appendChild(item);
        });

        document.querySelectorAll(".cancelar-btn").forEach(btn =>
            btn.addEventListener("click", () => desinscribirse(btn.dataset.id))
        );

    } catch {
        cont.innerHTML = "<p class='text-danger'>Error cargando inscripciones.</p>";
    }
}

// ================
// Cancelar inscripción
// ================
async function desinscribirse(id) {
    if (!confirm("¿Seguro que deseas cancelar esta inscripción?")) return;

    await api.apiDeleteEnrollment(id);
    actualizarTodo();
}

// ================
// Cursos en Progreso
// ================
async function cargarCursosProgreso() {
    const cont = document.getElementById("cursosProgreso");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const datos = await api.apiGetEnrollments();
        const cursos = datos.filter(i => i.userId === user.id && i.estado === "EN_PROGRESO");

        cont.innerHTML = "";

        if (cursos.length === 0) {
            cont.innerHTML = "<p>No tenés cursos en progreso.</p>";
            return;
        }

        cursos.forEach(c => {
            const item = document.createElement("div");
            item.className = "list-group-item";

            item.innerHTML = `
                <strong>${c.nombreCurso}</strong><br>
                Avance: ${c.progreso || 0}%
                <button class="btn btn-success btn-sm mt-2 w-100 finalizar-btn" data-id="${c.id}">
                    Marcar como finalizado
                </button>
            `;

            cont.appendChild(item);
        });

        document.querySelectorAll(".finalizar-btn").forEach(btn =>
            btn.addEventListener("click", () => marcarFinalizado(btn.dataset.id))
        );

    } catch {
        cont.innerHTML = "<p class='text-danger'>Error cargando cursos.</p>";
    }
}

// ================
// Marcar Finalizado
// ================
async function marcarFinalizado(id) {
    await api.apiUpdateEnrollment(id, {
        estado: "FINALIZADO",
        progreso: 100
    });

    actualizarTodo();
}

// ================
// Cursos Finalizados
// ================
async function cargarCursosFinalizados() {
    const cont = document.getElementById("cursosFinalizados");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const datos = await api.apiGetEnrollments();
        const cursos = datos.filter(i => i.userId === user.id && i.estado === "FINALIZADO");

        cont.innerHTML = "";

        if (cursos.length === 0) {
            cont.innerHTML = "<p>No tenés cursos finalizados.</p>";
            return;
        }

        cursos.forEach(c => {
            const item = document.createElement("div");
            item.className = "list-group-item";

            item.innerHTML = `
                <strong>${c.nombreCurso}</strong><br>
                <span class="text-success fw-bold">✔ COMPLETADO</span>
            `;

            cont.appendChild(item);
        });

    } catch {
        cont.innerHTML = "<p class='text-danger'>Error cargando cursos finalizados.</p>";
    }
}

// ================
// Actualizar todo
// ================
async function actualizarTodo() {
    await cargarInscripciones();
    await cargarCursosProgreso();
    await cargarCursosFinalizados();
}

// Inicializar
actualizarTodo();
