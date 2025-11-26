// Evitar gráfico infinito
let graficoInscripcionesInstance = null;

// Cursos destacados (IDs deben coincidir con tu API)
const cursosDestacados = [
    { id: "html-css", nombre: "HTML & CSS" },
    { id: "javascript-cero", nombre: "JavaScript desde Cero" },
    { id: "python", nombre: "Python" },
    { id: "git-github", nombre: "Git & GitHub" }
];

document.addEventListener("DOMContentLoaded", iniciarDashboard);

async function iniciarDashboard() {
    try {
        const [usuarios, cursos, inscripciones] = await Promise.all([
            api.apiGetUsers(),
            api.apiGetCourses(),
            api.apiGetEnrollments()
        ]);

        // Contadores
        document.getElementById("cantidadCursos").textContent = cursos.length;
        document.getElementById("cantidadUsuarios").textContent = usuarios.length;
        document.getElementById("cantidadInscripciones").textContent = inscripciones.length;

        // Cursos destacados
        mostrarCursosDestacados(inscripciones);

    } catch (error) {
        console.error("Error cargando dashboard:", error);
    }
}

function mostrarCursosDestacados(inscripciones) {
    const contenedor = document.getElementById("cursosDestacados");
    contenedor.innerHTML = "";

    const conteo = {};

    cursosDestacados.forEach(curso => {
        const cantidad = inscripciones.filter(i => i.courseId === curso.id).length;
        conteo[curso.nombre] = cantidad;

        contenedor.innerHTML += `
            <div class="col-md-3">
                <div class="card p-3 shadow-sm rounded-3">
                    <h6>${curso.nombre}</h6>
                    <p class="text-muted">ID: <strong>${curso.id}</strong></p>
                    <p class="mb-0">Inscriptos: <strong>${cantidad}</strong></p>
                </div>
            </div>
        `;
    });

    actualizarGrafico(conteo);
}

// Gráfico
function actualizarGrafico(conteo) {
    const ctx = document.getElementById("graficoInscripciones").getContext("2d");

    if (graficoInscripcionesInstance) graficoInscripcionesInstance.destroy();

    graficoInscripcionesInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(conteo),
            datasets: [{
                label: "Inscripciones",
                data: Object.values(conteo),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
