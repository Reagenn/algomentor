// Catatan pribadi per soal — disimpan ke server lewat POST /api/notes.
import { api } from './api.js';

export async function saveNote(problemId, text) {
  return api('/api/notes', 'POST', { problemId, text });
}
