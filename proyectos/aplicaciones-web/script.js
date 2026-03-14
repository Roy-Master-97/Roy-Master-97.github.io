// Variables globales
let proyectoData = {};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando proyecto Tuenti...');
    
    // Cargar datos del JSON
    await cargarDatos();
    
    // Renderizar el contenido
    renderizarPrincipal();
    renderizarCaracteristicas();
    renderizarArquitectura();
    
    // Configurar navegación
    configurarNavegacion();
    
    // Configurar hamburger menu para móviles
    configurarHamburger();
    
    // Configurar back to top
    configurarBackToTop();
});

// Cargar datos del archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('data.json');
        proyectoData = await response.json();
        console.log('Datos cargados:', proyectoData);
    } catch (error) {
        console.error('Error cargando datos:', error);
        proyectoData = {
            proyecto: {
                titulo: 'Proyecto',
                descripcion: 'Descripción del proyecto'
            }
        };
    }
}

// Renderizar contenido principal
function renderizarPrincipal() {
    const { proyecto } = proyectoData;
    if (!proyecto) return;

    document.getElementById('proyectoTitulo').textContent = proyecto.titulo;
    document.getElementById('proyectoEstado').textContent = proyecto.estado;
    document.getElementById('proyectoDescripcion').textContent = proyecto.descripcion;
    document.getElementById('resumenTexto').textContent = proyecto.resumen;

    // Renderizar tecnologías
    const tecnosContainer = document.getElementById('tecnosContainer');
    tecnosContainer.innerHTML = '';
    (proyecto.tecnologias || []).forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        tecnosContainer.appendChild(badge);
    });

    // Configurar botones
    const verRepositorio = document.getElementById('verRepositorio');
    const verDemo = document.getElementById('verDemo');

    if (verRepositorio) verRepositorio.href = proyecto.repositorio || '#';
    if (verDemo) verDemo.href = proyecto.demo || '#';
}

// Renderizar características
function renderizarCaracteristicas() {
    const { proyecto } = proyectoData;
    if (!proyecto || !proyecto.caracteristicas) return;

    const container = document.getElementById('caracteristicasContainer');
    container.innerHTML = '';

    (proyecto.caracteristicas || []).forEach(caracteristica => {
        const card = document.createElement('div');
        card.className = 'caracteristica-card';

        const iconHtml = caracteristica.icono.startsWith('fa')
            ? `<i class="${caracteristica.icono}"></i>`
            : '<i class="fas fa-star"></i>';

        card.innerHTML = `
            <div class="caracteristica-icon">${iconHtml}</div>
            <h3>${caracteristica.titulo}</h3>
            <p>${caracteristica.descripcion}</p>
        `;

        container.appendChild(card);
    });
}

// Renderizar arquitectura
function renderizarArquitectura() {
    const { proyecto } = proyectoData;
    if (!proyecto || !proyecto.arquitectura) return;

    const container = document.getElementById('arquitecturaContainer');
    container.innerHTML = '';

    const { frontend, backend, base_datos } = proyecto.arquitectura;

    const componentes = [
        { titulo: 'Frontend', ...frontend },
        { titulo: 'Backend', ...backend },
        { titulo: 'Base de Datos', ...base_datos }
    ];

    componentes.forEach(componente => {
        const card = document.createElement('div');
        card.className = 'arquitectura-card';

        const techsHtml = (componente.tecnologias || [])
            .map(tech => `<span class="arquitectura-tech">${tech}</span>`)
            .join('');

        card.innerHTML = `
            <h3>${componente.titulo}</h3>
            <p>${componente.descripcion}</p>
            <div class="arquitectura-techs">${techsHtml}</div>
        `;

        container.appendChild(card);
    });
}

// Configurar navegación entre secciones
function configurarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const seccion = link.getAttribute('data-seccion');
            
            // Actualizar clase activa en navegación
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Mostrar sección
            mostrarSeccion(seccion);
            
            // Cerrar hamburger menu si está abierto
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Mostrar sección
function mostrarSeccion(nombreSeccion) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.classList.toggle('active', seccion.id === nombreSeccion);
    });
    
    // Desplazarse a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Configurar hamburger menu
function configurarHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu cuando se hace clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Configurar back to top
function configurarBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
