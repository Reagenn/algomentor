// Render soal tempelan — daftar, detail, ubah status, hapus, dan
// bedah terstruktur dengan Mentor Lokal (bukan AI live).
import { appState, hooks } from './state.js';
import { $, esc } from './utils.js';
import { api } from './api.js';
import { askCustomMentor, formatMentorHistory } from './mentor.js';

export function renderCustomList() {
  $('custom-list').innerHTML = appState.state.customProblems.length ? appState.state.customProblems.map((c) => `
    <div class="card"><strong>${esc(c.title)}</strong> — Status: ${esc(c.status)}
    <p class="muted">${esc((c.description || '').slice(0, 200))}${(c.description || '').length > 200 ? '…' : ''}</p>
    <button data-custom="${c.id}">Buka &amp; Bedah</button></div>`).join('')
    : '<p class="muted">Belum ada soal tempelan. Soal tempelan pertama akan muncul di sini.</p>';
  document.querySelectorAll('[data-custom]').forEach((b) => b.addEventListener('click', () => renderCustomDetail(b.dataset.custom)));
}

export function renderCustomDetail(id) {
  const c = appState.state.customProblems.find((x) => x.id === id);
  if (!c) return;
  const history = appState.state.mentorHistory[id] || [];
  $('custom-detail').innerHTML = `
  <div class="card"><h2 style="margin-top:0">${esc(c.title)}</h2>
  <p>${esc(c.description || '(tidak ada deskripsi)')}</p>
  <label>Status<br><select id="custom-status"><option ${c.status === 'Belum' ? 'selected' : ''}>Belum</option><option ${c.status === 'Dicoba' ? 'selected' : ''}>Dicoba</option><option ${c.status === 'Selesai' ? 'selected' : ''}>Selesai</option></select></label><br><br>
  <button id="custom-status-btn" class="secondary">Ubah Status</button>
  <button id="custom-del" class="danger">Hapus Soal Ini</button>
  <h3>Bedah Terstruktur — Mentor Lokal (bukan AI live)</h3>
  <p class="muted">Template bedah, bukan jawaban AI yang dibuat-buat. Kerjakan selangkah demi selangkah.</p>
  <div>${formatMentorHistory(history)}</div>
  <input id="custom-mentor-msg" placeholder="Tulis pertanyaan / jawaban langkah 1…">
  <button id="custom-mentor-btn" class="secondary">Kirim ke Mentor Lokal</button>
  <div id="custom-mentor-out"></div></div>`;
  $('custom-status-btn').addEventListener('click', async () => { await api('/api/custom/' + id, 'POST', { status: $('custom-status').value }); await hooks.refresh(); renderCustomDetail(id); });
  $('custom-del').addEventListener('click', async () => { if (!confirm('Hapus soal tempelan ini?')) return; await fetch('/api/custom/' + id, { method: 'DELETE' }); $('custom-detail').innerHTML = ''; await hooks.refresh(); });
  $('custom-mentor-btn').addEventListener('click', async () => {
    const msg = $('custom-mentor-msg').value.trim(); if (!msg) return;
    const out = await askCustomMentor(id, msg);
    $('custom-mentor-out').innerHTML = `<p><strong>Mentor Lokal:</strong> ${esc(out.reply)}</p>`;
    await hooks.refresh(); renderCustomDetail(id);
  });
}
