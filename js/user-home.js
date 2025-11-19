// Leer usuario
const user = JSON.parse(localStorage.getItem("user"));

// Si no hay usuario → volver al login
if (!user) {
    window.location.href = "login.html";
}

// Mostrar nombre
document.getElementById("userName").textContent = `Bienvenido/a ${user.nombre} 👋`;


// =======================================
// Cargar cursos desde tu mockAPI
// =======================================

async function cargarCursos() {
    try {
        const res = await fetch("https://XXXXXX.mockapi.io/cursos");
        const cursos = await res.json();

        mostrarCursos(cursos);
    } catch (error) {
        console.error("Error al cargar cursos:", error);
    }
}

// =======================================
// Mostrar cursos según estado
// =======================================

function mostrarCursos(cursos) {
    const inscriptosDiv   = document.getElementById("inscriptos");
    const progresoDiv     = document.getElementById("progreso");
    const finalizadosDiv  = document.getElementById("finalizados");

    inscriptosDiv.innerHTML = "";
    progresoDiv.innerHTML = "";
    finalizadosDiv.innerHTML = "";

    // Filtrar según arrays del usuario
    const listaInscriptos  = cursos.filter(c => user.inscripciones?.includes(c.id));
    const listaProgreso    = cursos.filter(c => user.enProgreso?.includes(c.id));
    const listaFinalizados = cursos.filter(c => user.finalizados?.includes(c.id));

    renderLista(listaInscriptos, inscriptosDiv, "inscripto");
    renderLista(listaProgreso, progresoDiv, "progreso");
    renderLista(listaFinalizados, finalizadosDiv, "finalizado");
}

// =======================================
// Renderizar tarjetas
// =======================================

function renderLista(lista, contenedor, tipo) {
    if (!lista || lista.length === 0) {
        contenedor.innerHTML = `<p class="text-secondary">No hay cursos en esta sección.</p>`;
        return;
    }

    lista.forEach(curso => {
        contenedor.innerHTML += `
            <div class="border rounded p-3 mb-3">
                <h5>${curso.nombre}</h5>
                <p class="small text-secondary">${curso.descripcion}</p>

                <div class="d-flex gap-2 mt-2">
                    <a href="curso-detalle.html?id=${curso.id}" class="btn btn-sm btn-outline-primary">Ver detalle</a>
                    
                    ${tipo === "inscripto" ? 
                        `<button class="btn btn-sm btn-danger" onclick="desinscribir(${curso.id})">Desinscribirse</button>` 
                    : ""}

                    ${tipo === "progreso" ? 
                        `<button class="btn btn-sm btn-success" onclick="marcarFinalizado(${curso.id})">Marcar como finalizado</button>` 
                    : ""}

                    ${tipo === "finalizado" ? 
                        `<button class="btn btn-sm btn-secondary">Ver certificado</button>` 
                    : ""}
                </div>
            </div>
        `;
    });
}

// =======================================
// Funciones de acción del usuario
// =======================================

async function desinscribir(idCurso) {
    user.inscripciones = user.inscripciones.filter(id => id !== idCurso);
    guardarUser();
}

async function marcarFinalizado(idCurso) {
    user.enProgreso = user.enProgreso.filter(id => id !== idCurso);
    user.finalizados.push(idCurso);
    guardarUser();
}

// Guardar cambios en MockAPI y localStorage
async function guardarUser() {
    await fetch(`https://XXXXXX.mockapi.io/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    localStorage.setItem("user", JSON.stringify(user));
    cargarCursos();
}

// =======================================
// Tabs
// =======================================

document.querySelectorAll("#cursoTabs .nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#cursoTabs .nav-link").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const section = btn.dataset.section;

        document.querySelectorAll(".curso-section").forEach(s => s.classList.add("d-none"));
        document.getElementById(section).classList.remove("d-none");
    });
});


// Inicializar
cargarCursos();
