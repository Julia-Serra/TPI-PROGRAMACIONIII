// js/dashboard.js
// carga contadores, gráfico y cuenta inscriptos por cursoId

document.addEventListener("DOMContentLoaded", main);

async function main() {
  try {
    // traer datos
    const [users, courses, enrollments] = await Promise.all([
      api.apiGetUsers(),
      api.apiGetCourses(),
      api.apiGetEnrollments()
    ]);

    // 1) Totales (cards)
    const totalUsers = Array.isArray(users) ? users.length : 0;
    const totalCourses = Array.isArray(courses) ? courses.length : 0;
    const totalEnrolls = Array.isArray(enrollments) ? enrollments.length : 0;

    const elCursos = document.getElementById("cantidadCursos");
    const elUsers = document.getElementById("cantidadUsuarios");
    const elEnrolls = document.getElementById("cantidadInscripciones");

    if(elCursos) elCursos.textContent = totalCourses;
    if(elUsers) elUsers.textContent = totalUsers;
    if(elEnrolls) elEnrolls.textContent = totalEnrolls;

    // 2) Render chart (simple: barras con totals)
    renderChart({ courses: totalCourses, users: totalUsers, enrolls: totalEnrolls });

    // 3) Contar inscriptos por curso para los elementos .inscriptos[data-course]
    contarInscriptosPorCards(enrollments, courses);

    // 4) Si querés, actualizar títulos de cursos desde API si coinciden IDs
    updateCourseTitlesFromAPI(courses);

  } catch (err) {
    console.error("Error inicializando dashboard:", err);
  }
}

/* ----------------------------
   Conteo inscriptos por courseId
   ---------------------------- */
function contarInscriptosPorCards(enrollments = [], courses = []) {
  // crear mapa counts por courseId (string)
  const counts = {};
  enrollments.forEach(e => {
    // según tu ejemplo, el campo es courseId (string: 'git-github')
    const cid = e.courseId || e.curso || e.course || e.course_id || null;
    if (!cid) return;
    counts[cid] = (counts[cid] || 0) + 1;
  });

  // encontrar elementos y actualizar
  const els = document.querySelectorAll(".inscriptos[data-course]");
  els.forEach(el => {
    const key = el.dataset.course;
    // posibilidad: si key no existe en counts, intentar buscar por course.id en courses
    let val = counts[key] || 0;

    // si counts empty but courses have id mapping, reconozco aliases:
    if (!val && courses && courses.length) {
      // buscar course whose id equals key (already), but just in case different field
      const found = courses.find(c => (c.id === key || c.slug === key || (c.name && c.name.toString().toLowerCase().includes(key.toLowerCase()))));
      if (found) {
        // count by found.id if different
        const idKey = found.id;
        val = counts[idKey] || 0;
      }
    }

    const span = el.querySelector("span");
    if (span) span.textContent = val;
    else el.textContent = `Inscriptos: ${val}`;
  });
}

/* ----------------------------
   Actualizar títulos desde API (opcional)
   Si en tu courses API viene el título y el id coincide con data-course-id
   se reemplaza el texto del .course-title[data-course-id="..."]
   ---------------------------- */
function updateCourseTitlesFromAPI(courses = []) {
  if (!Array.isArray(courses) || !courses.length) return;
  const titleEls = document.querySelectorAll(".course-title[data-course-id]");
  titleEls.forEach(el => {
    const cid = el.dataset.courseId;
    if (!cid) return;
    const found = courses.find(c => (c.id === cid || c.slug === cid || (c.name && c.name.toString().toLowerCase().includes(cid.toLowerCase()))));
    if (found) {
      // intenta usar title/name/nombre
      const title = found.title || found.name || found.nombre || found.courseName || found.titulo || el.textContent;
      el.textContent = title;
    }
  });
}

/* ----------------------------
   Chart.js render
   ---------------------------- */
function renderChart(data = { courses:0, users:0, enrolls:0 }) {
  const canvas = document.getElementById("chartActividad");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // destruir chart previo si existe
  if (window._dashboardChart) {
    try { window._dashboardChart.destroy(); } catch(e) {}
  }

  window._dashboardChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Cursos", "Usuarios", "Inscripciones"],
      datasets: [{
        label: "Cantidad",
        data: [data.courses, data.users, data.enrolls],
        backgroundColor: ["#60A5FA","#34D399","#F59E0B"],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });
}
