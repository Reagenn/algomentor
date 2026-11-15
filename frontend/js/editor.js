// Editor + Jalankan Tes — panggil POST /api/run dan format hasilnya.
// Hanya JavaScript yang dieksekusi server; bahasa lain hanya referensi.
import { api } from './api.js';
import { esc } from './utils.js';

export async function runTests(problemId, code) {
  return api('/api/run', 'POST', { problemId, code });
}

export function formatRunResults(out) {
  return out.results.map((r) => `<p class="${r.pass ? 'result-pass' : 'result-fail'}">Test ${r.index + 1}: ${r.pass ? 'LULUS ✓' : 'GAGAL ✗'} — input ${esc(JSON.stringify(r.input))} → diharapkan ${esc(JSON.stringify(r.expected))}, didapat ${esc(JSON.stringify(r.got))}${r.error ? ' — ' + esc(r.error) : ''}</p>`).join('')
    + (out.allPass
      ? '<p class="result-pass">Semua tes lulus — soal ditandai Selesai ✓</p>'
      : '<p class="muted">Belum semua lulus. Baca test yang gagal, cek edge case, lalu coba lagi — atau buka hint berikutnya.</p>');
}
