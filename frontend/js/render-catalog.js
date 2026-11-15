// Render katalog soal + filter (pencarian, tingkat, pola, status).
// Filter dihitung dari koleksi soal yang diterima server, bukan hardcode.
import { appState } from './state.js';
import { $, esc } from './utils.js';
import { renderDetail } from './render-detail.js';

export function renderCatalog() {
  const q = ($('search').value || '').toLowerCase();
  const d = $('filter-difficulty').value;
  const pat = $('filter-pattern').value;
  const st = $('filter-status').value;
  const patterns = [...new Set(appState.problems.map((p) => p.pattern))].sort();
  const sel = $('filter-pattern');
  if (sel.options.length <= 1) patterns.forEach((x) => { const o = document.createElement('option'); o.textContent = x; sel.appendChild(o); });
  const list = appState.problems.filter((p) =>
    (!q || p.title.toLowerCase().includes(q) || p.pattern.toLowerCase().includes(q)) &&
    (!d || p.difficulty === d) && (!pat || p.pattern === pat) &&
    (!st || (st === 'done' ? appState.state.completed[p.id] : !appState.state.completed[p.id])));
  $('catalog-list').innerHTML = list.length ? list.map((p) => `
    <div class="problem-row" data-id="${p.id}">
      <div><strong>${esc(p.title)}</strong> <span class="pill ${p.difficulty}">${p.difficulty}</span> <span class="muted">${esc(p.pattern)}</span></div>
      <div>${appState.state.completed[p.id] ? '<span class="done">Selesai ✓</span>' : '<span class="muted">Belum</span>'}</div>
    </div>`).join('') : '<p class="muted">Tidak ada soal yang cocok dengan filter.</p>';
  document.querySelectorAll('.problem-row').forEach((el) => el.addEventListener('click', () => {
    appState.currentProblem = appState.problems.find((p) => p.id === el.dataset.id);
    appState.openedHints = new Set();
    renderDetail(appState.currentProblem.id);
    document.getElementById('detail').scrollIntoView({ behavior: 'smooth' });
  }));
}
