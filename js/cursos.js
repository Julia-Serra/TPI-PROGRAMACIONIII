// cursos.js
// Maneja los botones "Inscribirme" del catálogo de cursos

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los botones con clase .btn-inscribirme
    const botones = document.querySelectorAll(".btn-inscribirme");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();

            // Obtener ID del curso desde data-id
            const courseId = boton.getAttribute("data-id");

            if (!courseId) {
                console.error("Este botón no tiene data-id asignado.");
                return;
            }
            // Redirigir a inscripcion.html con el parámetro ?course=
            window.location.href = `inscripcion.html?course=${courseId}`;
        });
    });
});
