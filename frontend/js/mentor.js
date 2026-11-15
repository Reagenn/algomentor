// Tanya Mentor Lokal — panggil API mentor (bukan AI live) dan format
// riwayat percakapan mentor. Dipakai detail soal dan soal tempelan.
import { api } from './api.js';
import { esc } from './utils.js';

export async function askMentor(problemId, message) {
  return api('/api/mentor', 'POST', { problemId, message });
}

export async function askCustomMentor(id, message) {
  return api('/api/custom/' + id, 'POST', { message });
}

export function formatMentorHistory(history) {
  return history.map((m) => `<p><strong>${m.from === 'user' ? 'Kamu' : 'Mentor Lokal'}:</strong> ${esc(m.text)}</p>`).join('');
}
