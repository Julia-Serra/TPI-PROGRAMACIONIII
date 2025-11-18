// js/instructores.js

const instructores = [
    {
        nombre: "Bill Gates",
        curso: "HTML & CSS - Desarrollo Web Inicial",
        foto: "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg?w=385",
        descripcion: "Experto en JavaScript, React y Node.js."
    },
    {
        nombre: "Steve Jobs",
        curso: "JavaScript Desde Cero",
        foto: "https://i.pinimg.com/564x/5f/9e/d1/5f9ed156d800931fd1a515b629e500bc.jpg",
        descripcion: "Analista de datos senior con 12 años de experiencia."
    },
    {
        nombre: "Alan Turing",
        curso: "Phyton para Principiantes",
        foto: "https://www.elcorreo.com/xlsemanal/wp-content/uploads/sites/5/2023/04/alan-turing-inventor-informatica-espia-codigo-enigma-segunda-guerra-mundial.jpg",
        descripcion: "Investigador en Inteligencia Artificial y redes neuronales."
    },
     {
        nombre: "Elon Musk",
        curso: "Git & GitHub - Control de Versiones ",
        foto: "https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg",
        descripcion: "Investigador en Inteligencia Artificial y redes neuronales."
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
