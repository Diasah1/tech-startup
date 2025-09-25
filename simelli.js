// Progress-bar animation
window.onload = () => 
  document.querySelectorAll('.fill').forEach(bar => {
    if (bar.classList.contains('html')) {
      bar.style.width = '90%';
    } else if (bar.classList.contains('css')) {
      bar.style.width = '85%';
    } else if (bar.classList.contains('problemlösning')) {
      bar.style.width = '90%';
    } else if (bar.classList.contains('teamwork')) {
      bar.style.width = '100%';
    }
  });

  (async function laddaMinaProjekt() {
  const container = document.getElementById('mina-projekt');
  const felruta = document.getElementById('mina-projekt-fel');

  // Visa "laddar..."
  container.innerHTML = '<p>Laddar projekt...</p>';

  try {
    const res = await axios.get('./data/projects.json', { responseType: 'json' });
    const alla = Array.isArray(res.data) ? res.data : [];

    // Filtrera: de projekt du ansvarar för
    const mina = alla.filter(p => p.roll === 'System Designer' && p.ansvarig === 'Melli');

    if (mina.length === 0) {
      container.innerHTML = '<p>Inga projekt hittades.</p>';
      return;
    }

    // Bygg HTML
    const html = mina.map(p => `
      <article class="projektkort">
        <header>
          <h3>${p.titel}</h3>
          <small>${p.id}</small>
        </header>
        <p>${p.beskrivning}</p>
        <ul>
          <li><strong>Status:</strong> ${p.status}</li>
          <li><strong>Prioritet:</strong> ${p.prioritet}</li>
          <li><strong>Period:</strong> ${p.startDatum} – ${p.slutDatum}</li>
          <li><strong>Taggar:</strong> ${p.taggar.join(', ')}</li>
        </ul>
      </article>
    `).join('');

    container.innerHTML = html;

  } catch (err) {
    console.error(err);
    container.innerHTML = '';
    felruta.style.display = 'block';
    felruta.innerHTML = '<p>Kunde inte läsa in projekt just nu. Försök igen senare.</p>';
  }
})();
