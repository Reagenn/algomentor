// State lokal aplikasi — satu tempat untuk data yang dibagikan antar modul.
// Semua angka di UI dihitung dari data ini, bukan hardcode.
export const appState = {
  problems: [],
  state: { completed: {}, notes: {}, attempts: [], quiz: {}, customProblems: [], mentorHistory: {} },
  currentProblem: null,
  openedHints: new Set(),
  solutionLang: 'javascript',
};

// Hook refresh() diisi oleh main.js saat init, supaya modul render bisa
// memuat ulang data tanpa import melingkar ke main.js.
export const hooks = { refresh: async () => {} };
export function setRefresh(fn) { hooks.refresh = fn; }
