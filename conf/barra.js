// Cargar barra de navegación
fetch('/conf/barrainfo.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('barra-container').innerHTML = html;
    initCnebBarra();  // Asegúrate de que esta función exista
  });

// Primer bloque: Barra de navegación fija
const navbar = document.querySelector('#b03 .navbar');
const threshold = 70;  // Distancia en px para fijar la barra

// Throttling para optimizar el evento de scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (Math.abs(currentScrollY - lastScrollY) < 10) return;  // Ignorar cambios pequeños
  lastScrollY = currentScrollY;

  if (currentScrollY > threshold) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});

const menuItems = document.querySelectorAll('#b03 .nav-links > li');
menuItems.forEach(item => {
  item.addEventListener('click', function(event) {
    menuItems.forEach(innerItem => innerItem.classList.remove('open'));
    item.classList.toggle('open');
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
const navbarB40 = document.querySelector('#b40 .navbar'); 

hamburger.addEventListener('click', function () {
  bottomPanel.classList.toggle('show');
  overlay.classList.toggle('show');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll', bottomPanel.classList.contains('show'));
});

submenuToggles.forEach(function (toggle) {
  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    const subMenu = this.nextElementSibling;
    subMenu.classList.toggle('show');
    this.classList.toggle('active');
  });
});

overlay.addEventListener('click', function () {
  bottomPanel.classList.remove('show');
  overlay.classList.remove('show');
  hamburger.classList.remove('active');
  document.body.classList.remove('no-scroll');
});

// Fijar la barra de navegación y el panel al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 55) {
    navbarB40.classList.add('fixed');
    bottomPanel.style.position = 'fixed';
    bottomPanel.style.top = '65px';
  } else {
    navbarB40.classList.remove('fixed');
    bottomPanel.style.position = 'absolute';
  }
});
