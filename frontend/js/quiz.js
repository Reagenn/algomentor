// Kuis cek pemahaman — jawaban dinilai dari quiz.answer soal,
// hasilnya disimpan ke server lewat POST /api/quiz.
import { api } from './api.js';

export function gradeQuiz(problem, selectedIndex) {
  const correct = Number(selectedIndex) === problem.quiz.answer;
  return {
    correct,
    text: correct ? 'Benar ✓ — ' + problem.quiz.explanation : 'Belum benar. ' + problem.quiz.explanation,
  };
}

export async function saveQuizResult(problemId, correct) {
  return api('/api/quiz', 'POST', { problemId, correct });
}
