// Util kecil yang dipakai semua modul render — DOM + escape HTML.
export const $ = (id) => document.getElementById(id);

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const LANG_LABELS = { javascript: 'JavaScript', python: 'Python', java: 'Java', go: 'Go', cpp: 'C++' };
