// Semua handler /api/* — memakai config, state, http, runner, dan mentor.
// Bentuk endpoint dan response JSON SAMA seperti v1, supaya data.json
// progres dari v1 tetap bisa dipakai di v2.
const { FRONTEND_DIR } = require('./config');
const { loadState, saveState } = require('./state');
const { sendJson, readBody, serveStaticFile } = require('./http');
const { runUserCode } = require('./runner');
const { localMentorReply, customMentorTemplate, MENTOR_LABEL } = require('./mentor');
const problems = require('./data/problems');

async function handleRequest(req, res) {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;

    if (pathname === '/api/problems' && req.method === 'GET') {
      return sendJson(res, 200, { problems });
    }
    if (pathname === '/api/state' && req.method === 'GET') {
      const state = loadState();
      return sendJson(res, 200, { state, totalProblems: problems.length });
    }
    if (pathname === '/api/run' && req.method === 'POST') {
      const body = await readBody(req);
      const problem = problems.find((p) => p.id === body.problemId);
      if (!problem) return sendJson(res, 404, { error: 'Soal tidak ditemukan.' });
      if (typeof body.code !== 'string' || !body.code.trim()) return sendJson(res, 400, { error: 'Kode kosong. Tulis dulu solusimu di editor.' });
      if (!body.code.includes(problem.functionName)) return sendJson(res, 400, { error: `Kode harus mendefinisikan fungsi ${problem.functionName}.` });
      const results = runUserCode(problem, body.code);
      const allPass = results.every((r) => r.pass);
      const state = loadState();
      state.attempts.unshift({ problemId: problem.id, code: body.code, allPass, passed: results.filter((r) => r.pass).length, total: results.length, at: new Date().toISOString() });
      state.attempts = state.attempts.slice(0, 100);
      if (allPass) state.completed[problem.id] = { at: new Date().toISOString() };
      saveState(state);
      return sendJson(res, 200, { results, allPass, completed: allPass });
    }
    if (pathname === '/api/notes' && req.method === 'POST') {
      const body = await readBody(req);
      const state = loadState();
      state.notes[body.problemId || body.id] = String(body.text || '');
      saveState(state);
      return sendJson(res, 200, { ok: true });
    }
    if (pathname === '/api/quiz' && req.method === 'POST') {
      const body = await readBody(req);
      const state = loadState();
      state.quiz[body.problemId] = { correct: !!body.correct, at: new Date().toISOString() };
      saveState(state);
      return sendJson(res, 200, { ok: true });
    }
    if (pathname === '/api/mentor' && req.method === 'POST') {
      const body = await readBody(req);
      const problem = problems.find((p) => p.id === body.problemId) || null;
      const out = localMentorReply(problem, body.message);
      const state = loadState();
      const key = body.problemId || 'umum';
      if (!state.mentorHistory[key]) state.mentorHistory[key] = [];
      state.mentorHistory[key].push({ from: 'user', text: String(body.message || ''), at: new Date().toISOString() });
      state.mentorHistory[key].push({ from: 'mentor', text: out.reply, at: new Date().toISOString() });
      saveState(state);
      return sendJson(res, 200, out);
    }
    if (pathname === '/api/custom' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.title || !String(body.title).trim()) return sendJson(res, 400, { error: 'Judul soal tempelan wajib diisi.' });
      const state = loadState();
      const item = { id: 'custom-' + Date.now().toString(36), title: String(body.title).trim(), description: String(body.description || ''), status: 'Belum', createdAt: new Date().toISOString() };
      state.customProblems.unshift(item);
      state.mentorHistory[item.id] = [{ from: 'mentor', text: 'Soal tempelan tersimpan. Bedah dengan template ini:\n' + customMentorTemplate(item), at: new Date().toISOString() }];
      saveState(state);
      return sendJson(res, 200, { ok: true, item });
    }
    if (pathname.startsWith('/api/custom/') && req.method === 'POST') {
      const id = pathname.split('/')[3];
      const body = await readBody(req);
      const state = loadState();
      const item = state.customProblems.find((c) => c.id === id);
      if (!item) return sendJson(res, 404, { error: 'Soal tempelan tidak ditemukan.' });
      if (body.status) {
        if (!['Belum', 'Dicoba', 'Selesai'].includes(body.status)) return sendJson(res, 400, { error: 'Status harus Belum, Dicoba, atau Selesai.' });
        item.status = body.status;
      }
      if (body.message) {
        const reply = 'Pertanyaan bagus. Ikuti template bedah ini selangkah demi selangkah:\n' + customMentorTemplate(item) + '\n\nCoba jawab langkah 1 dulu: soal ini sebenarnya meminta apa, dengan kata-katamu sendiri?';
        if (!state.mentorHistory[id]) state.mentorHistory[id] = [];
        state.mentorHistory[id].push({ from: 'user', text: String(body.message), at: new Date().toISOString() });
        state.mentorHistory[id].push({ from: 'mentor', text: reply, at: new Date().toISOString() });
        saveState(state);
        return sendJson(res, 200, { ok: true, reply, label: MENTOR_LABEL });
      }
      saveState(state);
      return sendJson(res, 200, { ok: true, item });
    }
    if (pathname.startsWith('/api/custom/') && req.method === 'DELETE') {
      const id = pathname.split('/')[3];
      const state = loadState();
      state.customProblems = state.customProblems.filter((c) => c.id !== id);
      delete state.mentorHistory[id];
      saveState(state);
      return sendJson(res, 200, { ok: true });
    }

    // Frontend statis
    if (serveStaticFile(res, FRONTEND_DIR, pathname)) return;
    return sendJson(res, 404, { error: 'File tidak ditemukan.' });
  } catch (e) {
    sendJson(res, 500, { error: String(e && e.message ? e.message : e) });
  }
}

module.exports = { handleRequest, problems };
