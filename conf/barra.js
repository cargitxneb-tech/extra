fetch('/conf/barrainfo.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('barra-container').innerHTML = html;
    initCnebBarra();
  })
  .catch(err => console.error('Error cargando barra:', err));

function initCnebBarra() {
  const cont = document.getElementById('cnebbarra');
  if (!cont) return;

  const menuBtn = cont.querySelector('#menuBtn');
  const menuList = cont.querySelector('#menuList');
  const header = cont.querySelector('.header');

  // MENÚ MÓVIL
  menuBtn.addEventListener('click', () => {
    const visible = menuList.style.display === 'block';
    menuList.style.display = visible ? 'none' : 'block';
    menuBtn.classList.toggle('active', !visible);
    document.body.style.overflow = visible ? '' : 'hidden';
  });

  // Submenús móviles
  cont.querySelectorAll('.mobile-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling;
      const isOpen = submenu.style.display === 'block';
      cont.querySelectorAll('.mobile-submenu').forEach(sm => sm.style.display = 'none');
      cont.querySelectorAll('.mobile-toggle').forEach(tg => tg.classList.remove('open'));
      if (!isOpen) {
        submenu.style.display = 'block';
        toggle.classList.add('open');
      }
    });
  });

  // Submenús escritorio
  const deskButtons = cont.querySelectorAll('.desk-toggle');
  deskButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const submenu = btn.nextElementSibling;
      const icon = btn.querySelector('.chevron');
      const isOpen = submenu.style.display === 'block';
      cont.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      cont.querySelectorAll('.desk-toggle .chevron').forEach(ch => ch.classList.remove('open'));
      if (!isOpen) {
        submenu.style.display = 'block';
        icon.classList.add('open');
        submenu.style.position = 'fixed';
        submenu.style.top = (btn.getBoundingClientRect().bottom + 8) + 'px';
        submenu.style.left = (btn.getBoundingClientRect().left) + 'px';
      }
    });
  });

  // Cerrar submenús al hacer clic fuera
  document.addEventListener('click', () => {
    cont.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
    cont.querySelectorAll('.chevron').forEach(ch => ch.classList.remove('open'));
  });

  // HEADER FIJO
  window.addEventListener('scroll', () => {
    let y = window.scrollY;
    let trigger = 50;
    if (window.innerWidth >= 1024) trigger = 70;
    else if (window.innerWidth >= 720) trigger = 60;
    if (y > trigger) header.classList.add('fixed');
    else header.classList.remove('fixed');
  });

  // Reset menú móvil al redimensionar
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 720) {
      menuList.style.display = 'none';
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

