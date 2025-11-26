// =======================
// PROTECCIÓN DE RUTA
// =======================
import { requireUser } from "./protect.js";

const user = requireUser();
if (!user) throw new Error("No autorizado");

// =======================
// MOSTRAR INFO DEL USUARIO
// =======================
document.getElementById("userName").textContent = user.nombre;
document.getElementById("userEmail").textContent = user.email;

// =======================
// CARGAR INSCRIPCIONES
// =======================
async function cargarInscripciones() {
    const cont = document.getElementById("inscripcionesList");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
        const inscripciones = (await api.apiGetEnrollments())
            .filter(i => i.userId === user.id);

        cont.innerHTML = "";

        if (inscripciones.length === 0) {
            cont.innerHTML = "<p>No tenés inscripciones aún.</p>";
            return;
        }

        inscripciones.forEach(i => {
            const item = document.createElement("div");
            item.classList.add("list-group-item");

            const estadoClase =
                i.estado === "FINALIZADO" ? "text-success fw-bold" :
                i.estado === "EN_PROGRESO" ? "text-primary fw-bold" :
                "text-warning fw-bold";

            item.innerHTML = `
                <strong>${i.nombreCurso}</strong><br>
                Estado: <span class="${estadoClase}">${i.estado}</span><br>
                <button class="btn btn-danger btn-sm mt-2" onclick="desinscribirse('${i.id}')">
                    Cancelar inscripción
                </button>
            `;

            cont.appendChild(item);
        });

    } catch (error) {
        console.error(error);
        cont.innerHTML = "<p class='text-danger'>Error cargando inscripciones.</p>";
    }
}

// =======================
// CANCELAR INSCRIPCIÓN
// =======================
async function desinscribirse(id) {
    if (!confirm("¿Seguro que deseas cancelar esta inscripción?")) return;

    try {
        await api.apiDeleteEnrollment(id);
        await cargarInscripciones();
        await cargarCursosProgreso();
        await cargarCursosFinalizados();
    } catch (error) {
        alert("Error al cancelar inscripción.");
    }
}

// =======================
// CURSOS EN PROGRESO
// =======================
async function cargarCursosProgreso() {
    const cont = document.getElementById("cursosProgreso");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
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
                <button class="btn btn-success btn-sm mt-2" onclick="marcarFinalizado('${c.id}')">
                    Marcar como finalizado
                </button>
            `;

            cont.appendChild(item);
        });

    } catch (error) {
        cont.innerHTML = "<p class='text-danger'>Error cargando cursos.</p>";
    }
}

// =======================
// MARCAR COMO FINALIZADO
// =======================
async function marcarFinalizado(id) {
    try {
        await api.apiUpdateEnrollment(id, { estado: "FINALIZADO", progreso: 100 });

        // Actualizamos todas las secciones
        await cargarCursosProgreso();
        await cargarCursosFinalizados();
        await cargarInscripciones();

    } catch (error) {
        alert("Error marcando curso como finalizado.");
    }
}

// =======================
// CURSOS FINALIZADOS
// =======================
async function cargarCursosFinalizados() {
    const cont = document.getElementById("cursosFinalizados");
    cont.innerHTML = "<p>Cargando...</p>";

    try {
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
                <span class="text-success fw-bold">COMPLETADO ✔</span>
            `;

            cont.appendChild(item);
        });

    } catch (error) {
        cont.innerHTML = "<p class='text-danger'>Error cargando cursos finalizados.</p>";
    }
}

// =======================
// INICIALIZACIÓN GENERAL
// =======================
(async () => {
    await cargarInscripciones();
    await cargarCursosProgreso();
    await cargarCursosFinalizados();
})();
