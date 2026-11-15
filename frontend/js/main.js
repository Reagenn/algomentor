// AlgoMentor v2 — entry point frontend (ES module, disajikan server).
// Tugasnya hanya: init, refresh awal, dan wiring tab/filter/form.
// Render dan logika ada di modulnya masing-masing.
import { appState, setRefresh } from './state.js';
import { $, esc } from './utils.js';
import { api } from './api.js';
import { renderProgress } from './render-progress.js';
import { renderCatalog } from './render-catalog.js';
import { renderDetail } from './render-detail.js';
import { renderCustomList } from './render-custom.js';

async function refresh() {
  const [p, s] = await Promise.all([api('/api/problems'), api('/api/state')]);
  appState.problems = p.problems;
  appState.state = s.state;
  renderProgress();
  renderCatalog();
  renderCustomList();
  if (appState.currentProblem) renderDetail(appState.currentProblem.id);
}
setRefresh(refresh);

$('search').addEventListener('input', renderCatalog);
$('filter-difficulty').addEventListener('change', renderCatalog);
$('filter-pattern').addEventListener('change', renderCatalog);
$('filter-status').addEventListener('change', renderCatalog);
$('tab-catalog').addEventListener('click', () => { $('view-catalog').style.display = ''; $('view-custom').style.display = 'none'; $('tab-catalog').classList.add('active'); $('tab-custom').classList.remove('active'); });
$('tab-custom').addEventListener('click', () => { $('view-catalog').style.display = 'none'; $('view-custom').style.display = ''; $('tab-custom').classList.add('active'); $('tab-catalog').classList.remove('active'); });
$('custom-save').addEventListener('click', async () => {
  const title = $('custom-title').value.trim();
  if (!title) { $('custom-msg').textContent = 'Judul soal wajib diisi.'; return; }
  try {
    await api('/api/custom', 'POST', { title, description: $('custom-desc').value });
    $('custom-msg').textContent = 'Soal tempelan tersimpan.';
    $('custom-title').value = ''; $('custom-desc').value = '';
    await refresh();
  } catch (e) { $('custom-msg').textContent = e.message; }
});

refresh().catch((e) => { $('catalog-list').innerHTML = `<p class="result-fail">${esc(e.message)}</p><p class="muted">Pastikan server jalan: node backend/src/server.js, lalu buka http://localhost:3000</p>`; });
