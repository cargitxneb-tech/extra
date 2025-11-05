fetch('/conf/barrainfo.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('barra-container').innerHTML = html;
    initCnebBarra();
  })
// Primer bloque: Barra de navegación fija
const navbar = document.querySelector('#b03 .navbar');
const threshold = 70;  // Distancia en px para fijar la barra

window.addEventListener('scroll', function() {
    if (window.scrollY > threshold) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});

const menuItems = document.querySelectorAll('#b03 .nav-links > li');

menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        if (item.classList.contains('open')) {
            item.classList.remove('open');
        } else {
            menuItems.forEach(innerItem => innerItem.classList.remove('open'));
            item.classList.add('open');
        }
        event.stopPropagation();
    });
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('#b03 .navbar')) {
        menuItems.forEach(item => item.classList.remove('open'));
    }
});

// Segundo bloque: Panel y menú hamburguesa
const hamburger = document.querySelector('#b40 .hamburger');
const bottomPanel = document.querySelector('#b40 .bottom-panel');
const overlay = document.querySelector('#b40 .overlay');
const submenuToggles = document.querySelectorAll('#b40 .toggle-submenu');
const navbarB40 = document.querySelector('#b40 .navbar'); // Renombramos a navbarB40 para evitar conflicto

// Función para abrir/cerrar el panel y alternar la clase "active" en el icono de hamburguesa
hamburger.addEventListener('click', function () {
    bottomPanel.classList.toggle('show');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    // Alternar la clase 'no-scroll' en el body cuando el panel esté abierto
    if (bottomPanel.classList.contains('show')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});

// Función para manejar el clic en las subcategorías
submenuToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir la navegación
        const subMenu = this.nextElementSibling; // Submenú relacionado
        subMenu.classList.toggle('show'); // Alternar submenú

        // Alternar la clase active para rotar el ícono
        this.classList.toggle('active');
    });
});

// Cerrar panel si se hace clic en el overlay
overlay.addEventListener('click', function () {
    bottomPanel.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    
    // Quitar la clase 'no-scroll' cuando se cierre el panel
    document.body.classList.remove('no-scroll');
});

// Fijar la barra de navegación al hacer scroll (Este bloque es para el navbar de #b40)
window.addEventListener('scroll', function() {
    if (window.scrollY > 55) {
        navbarB40.classList.add('fixed');
    } else {
        navbarB40.classList.remove('fixed');
    }

    // Fijar el panel al hacer scroll (solo para el panel de #b40)
    if (window.scrollY > 55) {
        bottomPanel.style.position = 'fixed';
        bottomPanel.style.top = '65px'; // Se ajusta a 70px desde la parte superior de la pantalla
    } else {
        bottomPanel.style.position = 'absolute';
    }
});

