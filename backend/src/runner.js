// Test runner JavaScript — eksekusi kode pengguna di vm sandbox:
// tanpa require, tanpa process, tanpa akses network/file, timeout
// 2 detik per test case. Logika SAMA seperti v1.
const vm = require('vm');

function deepEqual(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

// Soal yang hasilnya berupa daftar kelompok: urutan kelompok / urutan dalam
// kelompok tidak penting, jadi normalisasi sebelum membandingkan.
const ORDER_FREE = new Set(['jumlah-tiga-angka', 'grup-anagram', 'kombinasi-jumlah-target']);

function normalizeForCompare(problemId, value) {
  if (!ORDER_FREE.has(problemId) || !Array.isArray(value)) return value;
  const groups = value.map((g) => (Array.isArray(g) ? [...g].sort() : g));
  return groups.map((g) => JSON.stringify(g)).sort();
}

function runUserCode(problem, code) {
  const results = [];
  for (let i = 0; i < problem.tests.length; i++) {
    const t = problem.tests[i];
    try {
      const sandbox = { console: { log: () => {} } };
      vm.createContext(sandbox);
      const script = new vm.Script(`${code}\n;__result = ${problem.functionName}(...__args);`, { timeout: 2000 });
      sandbox.__args = t.args;
      script.runInContext(sandbox, { timeout: 2000 });
      const got = sandbox.__result;
      const pass = deepEqual(normalizeForCompare(problem.id, got), normalizeForCompare(problem.id, t.expected));
      results.push({ index: i, pass, input: t.args, expected: t.expected, got: pass ? t.expected : got });
    } catch (e) {
      results.push({ index: i, pass: false, input: t.args, expected: t.expected, got: null, error: String(e && e.message ? e.message : e) });
    }
  }
  return results;
}

module.exports = { deepEqual, ORDER_FREE, normalizeForCompare, runUserCode };
