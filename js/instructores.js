// js/instructores.js

const instructores = [
    {
        nombre: "Bill Gates",
        curso: "HTML & CSS - Desarrollo Web Inicial",
        foto: "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg?w=385",
        descripcion: "Objetivo: Aprender a combinar HTML Y CSS para construir sitios web funcionales y con diseños responsivos "
    },
    {
        nombre: "Steve Jobs",
        curso: "JavaScript Desde Cero",
        foto: "https://i.pinimg.com/564x/5f/9e/d1/5f9ed156d800931fd1a515b629e500bc.jpg",
        descripcion: "Objetivo: Crear funcionalidad dinámica e interactiva en la web."
    },
    {
        nombre: "Alan Turing",
        curso: "Phyton para Principiantes",
        foto: "https://www.elcorreo.com/xlsemanal/wp-content/uploads/sites/5/2023/04/alan-turing-inventor-informatica-espia-codigo-enigma-segunda-guerra-mundial.jpg",
        descripcion: "Objetivo: Proporcionar una base sólida en la sintaxis y los fundamentos de la programación"
    },
     {
        nombre: "Elon Musk",
        curso: "Git & GitHub - Control de Versiones ",
        foto: "https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg",
        descripcion: "Objetivo: Adquirir las habilidades necesarias para integrarse en un equipo de desarrollo profesional, gestionando el código de forma segura, ordenada y colaborativa."
    },

];

function cargarInstructores() {
    const container = document.getElementById("instructorsContainer");

    container.innerHTML = instructores.map(inst => `
        <div class="col-md-4">
            <div class="card shadow-sm p-3 text-center">

                <img 
                    src="${inst.foto}" 
                    class="rounded-circle mx-auto mb-3" 
                    width="120"
                    height="120"
                    style="object-fit: cover;"
                >

                <h5 class="fw-bold">${inst.nombre}</h5>
                <p class="text-primary fw-semibold">${inst.curso}</p>
                <p class="text-secondary small">${inst.descripcion}</p>

            </div>
        </div>
    `).join('');
}

cargarInstructores();
