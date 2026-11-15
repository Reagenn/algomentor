// Render detail soal — deskripsi, contoh, batasan, hints berurutan,
// editor, solusi 5 bahasa, kuis, catatan, dan mentor. Logika tiap bagian
// didelegasikan ke editor.js, quiz.js, notes.js, dan mentor.js.
import { appState, hooks } from './state.js';
import { $, esc, LANG_LABELS } from './utils.js';
import { runTests, formatRunResults } from './editor.js';
import { gradeQuiz, saveQuizResult } from './quiz.js';
import { saveNote } from './notes.js';
import { askMentor, formatMentorHistory } from './mentor.js';

export function renderDetail(id) {
  const p = appState.problems.find((x) => x.id === id);
  if (!p) return;
  const quizState = appState.state.quiz[p.id];
  const history = appState.state.mentorHistory[p.id] || [];
  const attempts = appState.state.attempts.filter((a) => a.problemId === p.id).slice(0, 5);
  $('detail').innerHTML = `
  <div class="card">
    <h2 style="margin-top:0">${esc(p.title)} <span class="pill ${p.difficulty}">${p.difficulty}</span></h2>
    <p class="muted">Pola: ${esc(p.pattern)} · ${appState.state.completed[p.id] ? '<span class="done">Selesai ✓</span>' : 'Belum selesai'}</p>
    <p>${esc(p.description)}</p>
    <h3>Contoh</h3>
    ${p.examples.map((e) => `<p><code>Input: ${esc(e.input)}</code><br><code>Output: ${esc(e.output)}</code><br><span class="muted">${esc(e.explanation)}</span></p>`).join('')}
    <h3>Batasan</h3><ul>${p.constraints.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <h3>Hints — buka berurutan</h3>
    <p class="muted">Mentor Lokal — bukan AI live. Hint 2 terkunci sampai Hint 1 dibuka, begitu seterusnya.</p>
    ${p.hints.map((h, i) => {
      const unlocked = i === 0 || appState.openedHints.has(i - 1);
      const open = appState.openedHints.has(i);
      return `<div class="hint ${open ? '' : 'locked'}"><strong>Hint ${i + 1}</strong> ${open ? `<p>${esc(h)}</p>` : `<button data-hint="${i}" ${unlocked ? '' : 'disabled'}>${unlocked ? 'Buka Hint ' + (i + 1) : 'Terkunci — buka hint sebelumnya dulu'}</button>`}</div>`;
    }).join('')}
    <h3>Editor Kode — Jalankan Tes (JavaScript)</h3>
    <p class="muted">Tulis fungsi <code>${esc(p.functionName)}</code>. Tes dieksekusi di server lokal (tanpa network/file, timeout 2 detik per test). Semua tes lulus → soal otomatis ditandai Selesai.</p>
    <textarea id="editor" class="code" spellcheck="false">${esc(p.jsSignature)}\n  // tulis solusimu di sini\n}</textarea><br><br>
    <button id="run-btn">Jalankan Tes</button>
    <div id="run-result"></div>
    ${attempts.length ? `<h3>Riwayat Percobaan (soal ini)</h3><ul>${attempts.map((a) => `<li>${esc(a.at)} — ${a.passed}/${a.total} tes lulus ${a.allPass ? '✓' : ''}</li>`).join('')}</ul>` : ''}
    <h3>Solusi Referensi</h3>
    <p class="muted">Solusi bahasa lain tampil sebagai referensi — hanya JavaScript yang dieksekusi oleh Jalankan Tes.</p>
    <select id="sol-lang">${Object.entries(LANG_LABELS).map(([k, v]) => `<option value="${k}" ${k === appState.solutionLang ? 'selected' : ''}>${v}</option>`).join('')}</select>
    <pre id="sol-code">${esc(p.solutions[appState.solutionLang])}</pre>
    <p><strong>Kompleksitas:</strong> ${esc(p.complexity)}</p>
    <p><strong>Edge case:</strong></p><ul>${p.edgeCases.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    <h3>Kuis Cek Pemahaman</h3>
    <p>${esc(p.quiz.question)}</p>
    ${p.quiz.options.map((o, i) => `<label style="display:block;margin:4px 0"><input type="radio" name="quiz" value="${i}" style="width:auto"> ${esc(o)}</label>`).join('')}
    <button id="quiz-btn" class="secondary">Cek Jawaban Kuis</button>
    <span id="quiz-result" class="muted">${quizState ? (quizState.correct ? 'Kuis terakhir: benar ✓' : 'Kuis terakhir: belum benar') : ''}</span>
    <h3>Catatan Pribadi</h3>
    <textarea id="note" rows="3" placeholder="Tulis pemahamanmu dengan kata-kata sendiri…">${esc(appState.state.notes[p.id] || '')}</textarea><br><br>
    <button id="note-btn" class="secondary">Simpan Catatan</button> <span id="note-msg" class="muted"></span>
    <h3>Tanya Mentor Lokal</h3>
    <p class="muted">Mentor Lokal — bukan AI live. Jawabannya disusun dari hint soal ini + panduan Socratic + checklist review berdasarkan hasil tesmu.</p>
    <input id="mentor-msg" placeholder="cth. Aku buntu di langkah pertama…">
    <button id="mentor-btn" class="secondary">Tanya Mentor</button>
    <div id="mentor-out">${history.length ? formatMentorHistory(history) : ''}</div>
  </div>`;
  document.querySelectorAll('[data-hint]').forEach((b) => b.addEventListener('click', () => { appState.openedHints.add(Number(b.dataset.hint)); renderDetail(p.id); }));
  $('sol-lang').addEventListener('change', (e) => { appState.solutionLang = e.target.value; $('sol-code').textContent = p.solutions[appState.solutionLang]; });
  $('run-btn').addEventListener('click', async () => {
    $('run-result').innerHTML = '<p class="muted">Menjalankan tes…</p>';
    try {
      const out = await runTests(p.id, $('editor').value);
      $('run-result').innerHTML = formatRunResults(out);
      await hooks.refresh();
    } catch (e) { $('run-result').innerHTML = `<p class="result-fail">${esc(e.message)}</p>`; }
  });
  $('quiz-btn').addEventListener('click', async () => {
    const sel = document.querySelector('input[name="quiz"]:checked');
    if (!sel) { $('quiz-result').textContent = 'Pilih dulu satu jawaban.'; return; }
    const graded = gradeQuiz(p, sel.value);
    $('quiz-result').textContent = graded.text;
    await saveQuizResult(p.id, graded.correct);
    await hooks.refresh();
  });
  $('note-btn').addEventListener('click', async () => { await saveNote(p.id, $('note').value); $('note-msg').textContent = 'Catatan tersimpan.'; });
  $('mentor-btn').addEventListener('click', async () => {
    const msg = $('mentor-msg').value.trim();
    if (!msg) return;
    try {
      const out = await askMentor(p.id, msg);
      $('mentor-out').innerHTML += `<p><strong>Kamu:</strong> ${esc(msg)}</p><p><strong>Mentor Lokal:</strong> ${esc(out.reply)}</p><p class="muted">Checklist review: ${out.checklist.map(esc).join(' | ')}</p>`;
      $('mentor-msg').value = '';
    } catch (e) { $('mentor-out').innerHTML += `<p class="result-fail">${esc(e.message)}</p>`; }
  });
}
