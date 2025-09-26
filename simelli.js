// ===== Bildspel =====
const bilder = [
  './Bilder/Simelli-01.png',
  './Bilder/Simelli-02.png',
  './Bilder/Simelli-03.png',
  './Bilder/Simelli-04.png',
  './Bilder/Simelli-05.png'
];

let index = 0;
const imgEl = document.getElementById('slideshow-image');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function visaBild() {
  imgEl.src = bilder[index];
}

prevBtn.addEventListener('click', () => {
  index = (index - 1 + bilder.length) % bilder.length;
  visaBild();
});

nextBtn.addEventListener('click', () => {
  index = (index + 1) % bilder.length;
  visaBild();
});

// Startbild
visaBild();


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

  (async () => {
  const el = document.getElementById('mina-projekt');
  const fail = (m) => el ? (el.innerHTML = `<p style="color:red">${m}</p>`) : null;

  if (!el) return fail('Saknar <div id="mina-projekt"> i HTML.');

  el.innerHTML = 'Laddar projekt...';

  try {
    const res = await axios.get('./simelli.json', { responseType: 'json' });
    const data = Array.isArray(res.data) ? res.data : [];
    if (!data.length) return fail('Inga projekt hittades.');

    el.innerHTML = data.map(p => `
      <article>
        <h3>${p.titel}</h3>
        <p>${p.beskrivning}</p>
        <p><strong>Status:</strong> ${p.status}</p>
      </article>
    `).join('');
  } catch (e) {
    console.error(e);
    fail('Kunde inte läsa in projekten.');
  }
})();

(async () => {
  const NAME = 'Simelli Ani'; 
  const prioRank = { 'Låg': 1, 'Medium': 2, 'Hög': 3 };

  const listEl = document.getElementById('mina-projekt');
  const statusEl = document.getElementById('filter-status');
  const sortEl = document.getElementById('sort-prio');

  listEl.innerHTML = 'Laddar projekt...';

  let all = [];
  try {
    const res = await axios.get('./simelli.json', { responseType: 'json' });
    all = (Array.isArray(res.data) ? res.data : []).filter(p => p.ansvarig === NAME);
  } catch (e) {
    console.error(e);
    listEl.innerHTML = '<p style="color:red">Kunde inte läsa in projekten.</p>';
    return;
  }

  function render(items) {
    if (!items.length) { listEl.innerHTML = '<p>Inga projekt.</p>'; return; }
    listEl.innerHTML = items.map(p => `
      <article class="projektkort">
        <h3>${p.titel}</h3>
        <p>${p.beskrivning}</p>
        <ul>
          <li><b>Status:</b> ${p.status}</li>
          <li><b>Prioritet:</b> ${p.prioritet}</li>
          <li><b>Period:</b> ${p.startDatum} – ${p.slutDatum}</li>
        </ul>
      </article>
    `).join('');
  }

  function apply() {
    let out = [...all];

    // Filtrera status
    const s = statusEl.value; // "Alla" | "Pågår" | "Avslutad" | "Planerad"
    if (s !== 'Alla') out = out.filter(p => p.status === s);

    // Sortera (låg -> hög prioritet)
    if (sortEl.value === 'prio-asc') {
      out.sort((a, b) => (prioRank[a.prioritet] ?? 999) - (prioRank[b.prioritet] ?? 999));
    }

    render(out);
  }

  // init
  apply();

  // lyssna på ändringar
  statusEl.addEventListener('change', apply);
  sortEl.addEventListener('change', apply);
})();
