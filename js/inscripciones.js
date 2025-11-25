// js/inscripcion.js

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("inscriptionForm");

    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const courseId = document.getElementById("courseId").value;
    const userId = document.getElementById("userId").value || "1"; 
    // Si no tenés login todavía, podés dejar userId fijo o tomarlo de localStorage

    // Armo el OBJETO PARA ENROLLMENT
    const enrollment = {
        userId,
        courseId,
        estado: "pendiente",
        fecha: new Date().toISOString(),

      // opcional: guardo los datos del formulario
        alumno: {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        dni: form.dni.value,
        nacimiento: form.nacimiento.value,
        sexo: form.sexo.value,
        estado_civil: form.estado_civil.value,
        nacionalidad: form.nacionalidad.value,
        titulo_secundario: form.titulo_secundario.value,
        domicilio: form.domicilio.value,
        telefono: form.telefono.value,
        email: form.email.value
        }
    };

    try {
        await api.apiCreateEnrollment(enrollment);  
        alert("Inscripción enviada con éxito!");
        window.location.href = "index.html";

    } catch (err) {
        console.error(err);
        alert("Error al enviar la inscripción.");
    }
    });
});