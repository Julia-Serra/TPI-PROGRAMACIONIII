/* js/cursos.js
   Datos de cursos + funciones:
   - initIndex() -> activa toggles en index.html (mostrar/ocultar intro)
   - initCoursePage() -> renderiza lista o detalle según hash
*/

const CursosApp = (function(){
  // Base de datos local de cursos
  const cursos = [
    {
      id: 'html-css',
      title: 'HTML & CSS – Desarrollo Web Inicial',
      level: 'Principiante',
      duration: '8 semanas',
      rating: 5,
      short: 'Curso introductorio: estructura HTML5, CSS3, Flexbox, Grid y diseño responsive. Proyecto final: página web responsiva.',
      description: `Curso introductorio donde el alumno aprenderá la estructura de un sitio web utilizando HTML5 y dará estilo profesional con CSS3. Incluye Flexbox, Grid y diseño responsive.`,
      syllabus: [
        {title: 'Módulo 1 - Fundamentos de HTML', topics: ['Etiquetas básicas', 'Estructura de un documento', 'Formularios básicos']},
        {title: 'Módulo 2 - Selectores y Box Model', topics: ['Selectores CSS', 'Modelo de caja', 'Tipografías y colores']},
        {title: 'Módulo 3 - Layouts: Flexbox', topics: ['Principios de Flexbox', 'Alineación y distribución']},
        {title: 'Módulo 4 - Grid y responsive', topics: ['Grid básico', 'Media queries', 'Diseño móvil primero']},
        {title: 'Módulo 5 - Proyecto final', topics: ['Maquetación completa', 'Optimización y deploy']},
      ],
      tutorials: [
        {title: 'MDN — HTML', url: 'https://developer.mozilla.org/es/docs/Web/HTML'},
        {title: 'MDN — CSS', url: 'https://developer.mozilla.org/es/docs/Web/CSS'},
        {title: 'Guía rápida Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}
      ],
      projects: [
        {title: 'Página personal responsiva', description: 'Crear una página de presentación con secciones, formulario y menú responsive.'}
      ],
      prerequisites: 'Ninguno. Solo ganas de aprender.',
      instructor: 'Instructor/a: Equipo FirstCode',
      certificate: 'Certificado de finalización si se completa el proyecto final y ejercicios.',
    },

    {
      id: 'javascript-cero',
      title: 'JavaScript Desde Cero',
      level: 'Principiante',
      duration: '10 semanas',
      rating: 5,
      short: 'Programación desde cero: variables, funciones, arrays, objetos, eventos y consumo de APIs. Proyecto: app interactiva.',
      description: `Aprendé programación desde cero con JavaScript: variables, funciones, arrays, objetos, eventos y consumo de APIs.`,
      syllabus: [
        {title: 'Módulo 1 - Fundamentos JS', topics: ['Variables', 'Tipos', 'Operadores']},
        {title: 'Módulo 2 - Estructuras de control', topics: ['If/else', 'Bucles', 'Funciones']},
        {title: 'Módulo 3 - DOM y eventos', topics: ['Selectores', 'Manejo de eventos', 'Manipulación del DOM']},
        {title: 'Módulo 4 - Fetch y APIs', topics: ['Fetch API', 'Promesas', 'Async/Await']},
        {title: 'Módulo 5 - Proyecto', topics: ['SPA pequeña', 'Integración con APIs públicas']}
      ],
      tutorials: [
        {title: 'MDN — JavaScript', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript'},
        {title: 'JavaScript.info', url: 'https://javascript.info/'}
      ],
      projects: [
        {title: 'To-do App', description: 'Aplicación para crear, editar y eliminar tareas con almacenamiento local.'},
        {title: 'Buscador usando API pública', description: 'Consumir una API pública para mostrar resultados dinámicos.'}
      ],
      prerequisites: 'Conceptos básicos de HTML/CSS recomendados.',
      instructor: 'Instructor/a: Equipo FirstCode',
      certificate: 'Certificado de finalización tras proyecto y tests.'
    },

    {
      id: 'python-principiantes',
      title: 'Python para Principiantes',
      level: 'Principiante',
      duration: '10 semanas',
      rating: 5,
      short: 'Sintaxis básica, estructuras de control, funciones y proyectos iniciales. Ideal para quien nunca programó.',
      description: `Curso para quienes nunca programaron. Se enseña sintaxis básica, estructuras de control, funciones y proyectos iniciales.`,
      syllabus: [
        {title: 'Módulo 1 - Introducción', topics: ['Instalación', 'Entorno', 'Primer script']},
        {title: 'Módulo 2 - Tipos y estructuras', topics: ['Strings', 'Listas', 'Diccionarios']},
        {title: 'Módulo 3 - Control de flujo', topics: ['If', 'For', 'While']},
        {title: 'Módulo 4 - Funciones y módulos', topics: ['Definir funciones', 'Importar módulos']},
        {title: 'Módulo 5 - Proyecto', topics: ['Pequeñas aplicaciones CLI']}
      ],
      tutorials: [
        {title: 'Documentación oficial Python', url: 'https://docs.python.org/es/3/'},
        {title: 'Tutorial interactivo (repl.it o similar)', url: 'https://replit.com/'}
      ],
      projects: [
        {title: 'Calculadora CLI', description: 'Crear una calculadora de consola con menú de operaciones.'}
      ],
      prerequisites: 'Ninguno.',
      instructor: 'Instructor/a: Equipo FirstCode',
      certificate: 'Certificado tras completar ejercicios y proyecto.'
    },

    {
      id: 'git-github',
      title: 'Git & GitHub – Control de Versiones',
      level: 'Principiante',
      duration: '4 semanas',
      rating: 5,
      short: 'Curso centrado en Git y GitHub. Repositorios, commits, ramas y trabajo colaborativo.',
      description: `Curso centrado en Git y GitHub. Creación de repositorios, commits, ramas y trabajo colaborativo.`,
      syllabus: [
        {title: 'Módulo 1 - Fundamentos Git', topics: ['Init', 'Add', 'Commit']},
        {title: 'Módulo 2 - Ramas y merge', topics: ['Branch', 'Checkout', 'Merge']},
        {title: 'Módulo 3 - GitHub y Pull Requests', topics: ['Repos remotos', 'PRs', 'Revisión de código']},
        {title: 'Módulo 4 - Flujo colaborativo', topics: ['Forks', 'GitHub Actions (breve)']}
      ],
      tutorials: [
        {title: 'Pro Git (libro)', url: 'https://git-scm.com/book/es/v2'},
        {title: 'GitHub Docs', url: 'https://docs.github.com/es'}
      ],
      projects: [
        {title: 'Workflow colaborativo', description: 'Crear repo, ramas, PRs y merge en un flujo de equipo.'}
      ],
      prerequisites: 'Ninguno.',
      instructor: 'Instructor/a: Equipo FirstCode',
      certificate: 'Certificado de prácticas realizadas y PR aceptados.'
    }
  ];

  /* --- Funciones públicas --- */

  // Inicializa toggles en index.html: botones "Intro"
  function initIndex() {
    document.querySelectorAll('.course-card').forEach(card => {
      const btn = card.querySelector('.toggle-intro');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          card.classList.toggle('show');
        });
      }
      // También clic en la tarjeta abre/cierra (excluye botones)
      card.addEventListener('click', (e) => {
        // evitar toggle cuando se clickea un link o botón interior
        if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') return;
        card.classList.toggle('show');
      });
    });
  }

  // Renderiza la lista de cursos en cursos.html (cuando no hay hash)
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
      col.querySelector('a').addEventListener('click', () => {
        // navegación natural por hash
      });
      container.appendChild(col);
    });
  }

  // Renderiza detalle de un curso en el contenedor #course-detail
  function renderCourseDetail(courseId) {
    const c = cursos.find(x => x.id === courseId);
    const root = document.getElementById('course-detail');
    if (!c) {
      root.innerHTML = `<div class="text-center text-danger"><h4>Curso no encontrado</h4><p>Volvé a <a href="cursos.html">la lista de cursos</a>.</p></div>`;
      return;
    }

    const syllabusHTML = c.syllabus.map(m => {
      return `<div class="module"><strong>${m.title}</strong><ul>${m.topics.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
    }).join('');

    const tutorialsHTML = c.tutorials.map(t => `<li><a href="${t.url}" target="_blank" rel="noopener">${t.title}</a></li>`).join('');
    const projectsHTML = c.projects.map(p => `<li><strong>${p.title}:</strong> ${p.description}</li>`).join('');

    root.innerHTML = `
      <div class="card p-4">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h2>${c.title}</h2>
            <p class="text-secondary mb-1">Nivel: ${c.level} • Duración: ${c.duration}</p>
            <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
          </div>
          <div class="text-end">
            <a href="index.html" class="btn btn-outline-secondary">Volver</a>
            <a class="btn btn-success ms-2" href="#inscribirme" onclick="alert('Funcionalidad de inscripción simulada')">Inscribirme</a>
          </div>
        </div>

        <hr />

        <h5>Descripción</h5>
        <p>${c.description}</p>

        <h5>Temario</h5>
        ${syllabusHTML}

        <h5>Tutoriales y recursos</h5>
        <ul class="resource-list">${tutorialsHTML}</ul>

        <h5>Proyectos</h5>
        <ul>${projectsHTML}</ul>

        <h5>Requisitos</h5>
        <p>${c.prerequisites}</p>

        <h5>Instructor</h5>
        <p>${c.instructor}</p>

        <h5>Certificado</h5>
        <p>${c.certificate}</p>
      </div>
    `;
    // scroll to top del detalle
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Lee hash o muestra lista
  function initCoursePage() {
    const hash = location.hash ? location.hash.replace('#','') : '';
    const noCourse = document.getElementById('no-course');
    if (!noCourse) return;

    // render lista
    const listContainer = document.getElementById('courses-list');
    renderCoursesList(listContainer);

    if (hash) {
      // si hay hash, render detalle
      renderCourseDetail(hash);
    } else {
      // mantengo la vista de lista
    }

    // escucha cambios en hash para renderizar dinámicamente
    window.addEventListener('hashchange', () => {
      const newHash = location.hash.replace('#','');
      if (newHash) {
        renderCourseDetail(newHash);
      } else {
        // volver a la lista
        document.getElementById('course-detail').innerHTML = '';
        document.getElementById('course-detail').appendChild(noCourse);
      }
    });
  }

  // Export
  return {
    initIndex,
    initCoursePage,
    // por si quieres acceder a los datos desde consola
    _cursos: cursos
  };
})();
