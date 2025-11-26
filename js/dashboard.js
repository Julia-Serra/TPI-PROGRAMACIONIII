// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {
    try {
        // Traemos todos los datos a la vez
        const [users, courses, enrollments] = await Promise.all([
            api.apiGetUsers(),
            api.apiGetCourses(),
            api.apiGetEnrollments()
        ]);

        // ===========================
        // CONTADORES DE LAS CARDS
        // ===========================
        document.getElementById("cantidadCursos").textContent = courses.length;
        document.getElementById("cantidadUsuarios").textContent = users.length;
        document.getElementById("cantidadInscripciones").textContent = enrollments.length;

        // ===========================
        // DATOS PARA EL GRÁFICO
        // ===========================
        const dataGrafico = {
            cursos: courses.length,
            usuarios: users.length,
            inscripciones: enrollments.length
        };

        renderChart(dataGrafico);

    } catch (err) {
        console.error("Error cargando dashboard:", err);
    }
}


// ===============================
// G R Á F I C O  -  Chart.js
// ===============================

function renderChart(data) {
    const ctx = document.getElementById("chartActividad").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Cursos", "Usuarios", "Inscripciones"],
            datasets: [{
                label: "Cantidad",
                data: [data.cursos, data.usuarios, data.inscripciones],
                backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}
