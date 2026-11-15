// State lokal — bentuk data.json SAMA seperti v1 supaya file progres
// dari v1 bisa dipakai di v2 hanya dengan menyalin data.json.
const fs = require('fs');
const path = require('path');
const { DATA_FILE } = require('./config');

function defaultState() {
  return { completed: {}, notes: {}, attempts: [], quiz: {}, customProblems: [], mentorHistory: {} };
}

function loadState() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const s = JSON.parse(raw);
    return { ...defaultState(), ...s };
  } catch (_) {
    const s = defaultState();
    saveState(s);
    return s;
  }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf8');
}

module.exports = { defaultState, loadState, saveState };
