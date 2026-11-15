// Mentor Lokal — BUKAN AI live. Jawaban disusun dari hint soal + template
// Socratic. Tidak ada kunci API, tidak ada panggilan network. Logika
// SAMA seperti v1.
const MENTOR_LABEL = 'Mentor Lokal — bukan AI live';

function localMentorReply(problem, message) {
  const m = String(message || '').toLowerCase();
  const hintText = problem ? problem.hints.map((h, i) => `Hint ${i + 1}: ${h}`).join('\n') : '';
  let guidance;
  if (/(stuck|buntu|bingung|tidak tahu|nggak tahu|gak tahu)/.test(m)) {
    guidance = 'Mulai dari contoh terkecil. Tulis di kertas: input apa, output apa, dan satu langkah pertama yang pasti benar. Lalu tanyakan: informasi apa yang harus saya lacak sambil jalan? Itu biasanya pola soalnya.';
  } else if (/(error|gagal|fail|salah|bug)/.test(m)) {
    guidance = 'Cek tiga hal berurutan: (1) test case mana yang gagal dan inputnya apa, (2) apa yang kodenya hasilkan vs yang diharapkan, (3) apakah ada edge case di soal ini yang belum ditangani (lihat daftar Edge Case di halaman soal).';
  } else if (/(kompleksitas|complexity|o\(n|big o)/.test(m)) {
    guidance = 'Hitung berapa kali tiap elemen disentuh dan berapa banyak data tambahan yang disimpan. ' + (problem ? `Untuk soal ini, kompleksitas referensinya: ${problem.complexity}` : '');
  } else {
    guidance = 'Coba jelaskan kembali soalnya dengan kata-katamu sendiri, lalu sebutkan satu contoh kecil dan langkah pertamanya. Kalau langkah pertama itu masih kabur, buka Hint 1 dulu — jangan loncat ke solusi.';
  }
  const checklist = problem
    ? ['Sudah coba contoh terkecil di kertas?', 'Sudah buka hint secara berurutan (1 lalu 2 lalu 3)?', 'Sudah jalankan tes dan baca test case yang gagal?', `Sudah cek edge case: ${problem.edgeCases[0] || '-'}`]
    : ['Sudah tulis ulang soalnya dengan kata-kata sendiri?', 'Sudah buat contoh kecil?', 'Sudah daftar edge case yang mungkin?'];
  return { reply: guidance, hints: hintText, checklist, label: MENTOR_LABEL };
}

function customMentorTemplate(problem) {
  return [
    '1. Pahami soal: tulis ulang soalnya dengan kata-katamu sendiri dalam 1-2 kalimat.',
    '2. Contoh: buat satu contoh kecil (input dan output yang diharapkan) dan kerjakan dengan tangan.',
    '3. Edge case: daftar input kosong, satu elemen, nilai sama semua, dan nilai ekstrem.',
    '4. Pola yang mungkin: Hash Map, Two Pointers, Sliding Window, Stack, Binary Search, DP, atau DFS/BFS — mana yang paling cocok dan kenapa?',
    '5. Langkah: tulis pseudocode 3-5 langkah sebelum menulis kode.',
    '6. Uji: jalankan dengan contoh kecil, lalu cek edge case satu per satu.',
  ].join('\n');
}

module.exports = { MENTOR_LABEL, localMentorReply, customMentorTemplate };
