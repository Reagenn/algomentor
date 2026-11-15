// Render progres — jumlah selesai dan statistik per tingkat dihitung
// dari problems + state.completed, bukan angka hardcode.
import { appState } from './state.js';
import { $ } from './utils.js';

function countsByDifficulty() {
  const c = { Easy: { total: 0, done: 0 }, Medium: { total: 0, done: 0 }, Hard: { total: 0, done: 0 } };
  for (const p of appState.problems) { c[p.difficulty].total++; if (appState.state.completed[p.id]) c[p.difficulty].done++; }
  return c;
}

export function renderProgress() {
  const done = appState.problems.filter((p) => appState.state.completed[p.id]).length;
  const total = appState.problems.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  $('progress-text').textContent = `Selesai ${done} dari ${total} soal (${pct}%)`;
  $('progress-fill').style.width = pct + '%';
  const c = countsByDifficulty();
  $('progress-detail').textContent = `Easy ${c.Easy.done}/${c.Easy.total} · Medium ${c.Medium.done}/${c.Medium.total} · Hard ${c.Hard.done}/${c.Hard.total} · Soal tempelan: ${appState.state.customProblems.length} · Percobaan tersimpan: ${appState.state.attempts.length}`;
}
