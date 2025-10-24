fetch('/conf/barrainfo.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('barra-container').innerHTML = html;
    initCnebBarra();
  })
  .catch(err => console.error('Error cargando barra:', err));


