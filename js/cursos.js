/* js/cursos.js
    Datos de cursos + funciones:
    - initIndex() -> activa toggles en index.html (mostrar/ocultar intro)
    - initCoursePage() -> renderiza lista o detalle según hash
*/

const CursosApp = (function(){
    // Obtener usuario logueado
    const user = JSON.parse(localStorage.getItem("user"));

    // Base de datos local de cursos
    const cursos = [
        {
            id: 'html-css',
            title: 'HTML & CSS – Desarrollo Web Inicial',
            level: 'Principiante',
            duration: '8 semanas',
            rating: 5,
            short: 'Curso introductorio: estructura HTML5, CSS3, Flexbox, Grid y diseño responsive. Proyecto final: página web responsiva.',
            description: `Curso introductorio donde el alumno aprenderá la estructura de un sitio web utilizando HTML5...`,
            syllabus: [
                {title: 'Módulo 1 - Fundamentos de HTML', topics: ['Etiquetas básicas', 'Estructura...', 'Formularios']},
                {title: 'Módulo 2 - Selectores y Box Model', topics: ['Selectores', 'Box Model']},
                {title: 'Módulo 3 - Layouts: Flexbox', topics: ['Flexbox básico']},
                {title: 'Módulo 4 - Grid y responsive', topics: ['Grid', 'Responsive']},
                {title: 'Módulo 5 - Proyecto final', topics: ['Maquetación', 'Deploy']}
            ],
            tutorials: [
                {title: 'MDN — HTML', url: 'https://developer.mozilla.org/es/docs/Web/HTML'},
                {title: 'MDN — CSS', url: 'https://developer.mozilla.org/es/docs/Web/CSS'}
            ],
            projects: [
                {title: 'Página personal responsiva', description: 'Crear una web responsiva completa.'}
            ],
            prerequisites: 'Ninguno.',
            instructor: 'Equipo FirstCode',
            certificate: 'Certificado al finalizar.'
        },

        {
            id: 'javascript-cero',
            title: 'JavaScript Desde Cero',
            level: 'Principiante',
            duration: '10 semanas',
            rating: 5,
            short: 'Variables, funciones, DOM, eventos y APIs.',
            description: `Aprendé programación desde cero con JavaScript...`,
            syllabus: [
                {title: 'Módulo 1 - Fundamentos JS', topics: ['Variables', 'Tipos']},
                {title: 'Módulo 2 - Estructuras', topics: ['If', 'Bucles', 'Funciones']},
                {title: 'Módulo 3 - DOM', topics: ['Eventos', 'Manipulación']},
                {title: 'Módulo 4 - APIs', topics: ['Fetch', 'Async/Await']},
                {title: 'Módulo 5 - Proyecto', topics: ['SPA simple']}
            ],
            tutorials: [
                {title: 'MDN — JavaScript', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript'}
            ],
            projects: [
                {title: 'To-do App', description: 'CRUD de tareas almacenado en localStorage.'}
            ],
            prerequisites: 'HTML/CSS recomendado.',
            instructor: 'Equipo FirstCode',
            certificate: 'Certificado al finalizar.'
        },

        {
            id: 'python-principiantes',
            title: 'Python para Principiantes',
            level: 'Principiante',
            duration: '10 semanas',
            rating: 5,
            short: 'Sintaxis básica, estructuras y proyectos.',
            description: `Curso para quienes nunca programaron...`,
            syllabus: [
                {title: 'Módulo 1', topics: ['Instalación', 'Primer script']},
            ],
            tutorials: [
                {title: 'Documentación oficial Python', url: 'https://docs.python.org/es/3/'}
            ],
            projects: [
                {title: 'Calculadora CLI', description: 'App simple en consola.'}
            ],
            prerequisites: 'Ninguno.',
            instructor: 'Equipo FirstCode',
            certificate: 'Certificado al finalizar.'
        },

        {
            id: 'git-github',
            title: 'Git & GitHub – Control de Versiones',
            level: 'Principiante',
            duration: '4 semanas',
            rating: 5,
            short: 'Repos, commits, ramas y PRs.',
            description: `Curso centrado en Git y GitHub.`,
            syllabus: [
                {title: 'Módulo 1', topics: ['Init', 'Commit']},
            ],
            tutorials: [
                {title: 'Pro Git', url: 'https://git-scm.com/book/es/v2'}
            ],
            projects: [
                {title: 'Workflow colaborativo', description: 'Ramas + Pull Requests'}
            ],
            prerequisites: 'Ninguno.',
            instructor: 'Equipo FirstCode',
            certificate: 'Certificado al finalizar.'
        }
    ];

    /* ------------------------------
        FUNCIONES PARA INDEX
    -------------------------------*/
    function initIndex() {
        document.querySelectorAll('.course-card').forEach(card => {
            const btn = card.querySelector('.toggle-intro');
            if (btn) {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    card.classList.toggle('show');
                });
            }
            card.addEventListener('click', e => {
                if (['a','button'].includes(e.target.tagName.toLowerCase())) return;
                card.classList.toggle('show');
            });
        });
    }

    /* ------------------------------
      SISTEMA DE INSCRIPCIÓN
    -------------------------------*/

    function getUserData() {
        if (!user) return null;
        return JSON.parse(localStorage.getItem("userdata_" + user.id)) || {
            inscriptos: [],
            progreso: {},
            finalizados: []
        };
    }

    function saveUserData(data) {
        if (!user) return;
        localStorage.setItem("userdata_" + user.id, JSON.stringify(data));
    }

    // Inscripción
    function inscribirse(courseId) {
        if (!user) {
            alert("Debes iniciar sesión para inscribirte.");
            return;
        }

        const data = getUserData();

        if (data.inscriptos.includes(courseId)) {
            alert("Ya estás inscrito en este curso.");
            return;
        }

        data.inscriptos.push(courseId);
        data.progreso[courseId] = 0;
        saveUserData(data);

        alert("Inscripción realizada con éxito.");
    }

    // Devuelve cursos inscritos (con datos completos)
    function obtenerCursosInscritos() {
        const data = getUserData();
        return cursos.filter(c => data.inscriptos.includes(c.id));
    }

    function obtenerCursosFinalizados() {
        const data = getUserData();
        return cursos.filter(c => data.finalizados.includes(c.id));
    }

    function finalizarCurso(courseId) {
        const data = getUserData();

        if (!data.inscriptos.includes(courseId)) return;

        if (!data.finalizados.includes(courseId)) {
            data.finalizados.push(courseId);
        }

        data.progreso[courseId] = 100;
        saveUserData(data);
    }

    function obtenerProgreso(courseId) {
        const data = getUserData();
        return data.progreso[courseId] || 0;
    }

    /* ------------
      FIX IMPORTANTE:
      Esta función DEBE estar arriba de renderCourseDetail()
    --------------*/
    function botonInscribirmeHTML(courseId) {
        return user
            ? `<button class="btn btn-success ms-2" onclick="CursosApp.inscribirse('${courseId}')">Inscribirme</button>`
            : `<a class="btn btn-success ms-2" href="login.html">Iniciar sesión para inscribirte</a>`;
    }

    /* ------------------------------
      RENDER LISTA
    -------------------------------*/
    function renderCoursesList(container) {
        container.innerHTML = '';
        cursos.forEach(c => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            col.innerHTML = `
                <div class="card p-3 h-100">
                    <h5>${c.title}</h5>
                    <p class="text-secondary small">Nivel: ${c.level}</p>
                    <p class="small">Duración: ${c.duration}</p>
                    <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
                    <p>${c.short}</p>
                    <div class="mt-2 d-flex gap-2">
                        <a href="cursos.html#${c.id}" class="btn btn-sm btn-primary">Ir al curso</a>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    }

    /* ------------------------------
      RENDER DETALLE
    -------------------------------*/
    function renderCourseDetail(courseId) {
        const c = cursos.find(x => x.id === courseId);
        const root = document.getElementById('course-detail');
        if (!c) {
            root.innerHTML = `<div class="text-center text-danger"><h4>Curso no encontrado</h4></div>`;
            return;
        }

        const syllabusHTML = c.syllabus.map(m =>
            `<div class="module"><strong>${m.title}</strong><ul>${m.topics.map(t => `<li>${t}</li>`).join('')}</ul></div>`
        ).join('');

        root.innerHTML = `
            <div class="card p-4">
                <div class="d-flex justify-content-between">
                    <div>
                        <h2>${c.title}</h2>
                        <p class="text-secondary">${c.level} • ${c.duration}</p>
                    </div>
                    <div class="text-end">
                        <a href="cursos.html" class="btn btn-outline-secondary">Volver</a>
                        ${botonInscribirmeHTML(c.id)}
                    </div>
                </div>
                <hr>
                <h5>Descripción</h5>
                <p>${c.description}</p>

                <h5>Temario</h5>
                ${syllabusHTML}
            </div>
        `;
    }

    /* ------------------------------ */
    function initCoursePage() {
        const hash = location.hash ? location.hash.replace('#','') : '';
        const noCourse = document.getElementById('no-course');

        const listContainer = document.getElementById('courses-list');
        renderCoursesList(listContainer);

        if (hash) {
            renderCourseDetail(hash);
        }

        window.addEventListener('hashchange', () => {
            const newHash = location.hash.replace('#','');
            if (newHash) {
                renderCourseDetail(newHash);
            } else {
                document.getElementById('course-detail').innerHTML = '';
                document.getElementById('course-detail').appendChild(noCourse);
            }
        });
    }

    // Exportar API pública
    return {
        initIndex,
        initCoursePage,

        // Inscripción y progreso
        inscribirse,
        obtenerCursosInscritos,
        obtenerCursosFinalizados,
        obtenerProgreso,
        finalizarCurso,

        // Acceso a cursos
        _cursos: cursos
    };
})();
