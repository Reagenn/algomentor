# Dokumentasi AlgoMentor v2.0.0 (salinan lokal)

Rekreasi lokal yang setia dari versi hosted — ditulis ulang dari nol, bukan salinan byte-for-byte file hosted. Nama produk: **AlgoMentor**. Sebutan "LeetCode-style practice" hanya mendeskripsikan gaya latihannya; aplikasi ini bukan afiliasi LeetCode dan soalnya ditulis ulang dengan bahasa sendiri.

Perubahan utama v2: refactor struktur. `server.js` v1 (221 baris, mencampur config, state, HTTP, runner, mentor, dan semua route) dan `app.js` v1 (189 baris, mencampur semua render dan logika) dipecah jadi modul-modul kecil. Fitur, endpoint API, bentuk response JSON, dan bentuk `data.json` **tetap sama seperti v1**.

## Struktur folder

```text
algomentor-v2/
├── .gitignore                   — node_modules/, backend/data/data.json
├── LICENSE                      — MIT atas nama Rainy (Reagen)
├── README.md                    — cara jalan, fitur, migrasi v1, GitHub/Portofolio, cara tambah soal/route
├── Dokumentasi.md               — file ini: peta fitur ke file
├── package.json                 — name: algomentor, version: 2.0.0, zero dependencies, npm start = node backend/src/server.js
├── backend/
│   ├── src/
│   │   ├── server.js            — HANYA entry point: createServer(handleRequest) + listen
│   │   ├── config.js            — PORT, ROOT, FRONTEND_DIR, DATA_FILE
│   │   ├── state.js             — defaultState, loadState, saveState
│   │   ├── http.js              — sendJson, readBody, MIME, serveStaticFile
│   │   ├── runner.js            — runUserCode (vm sandbox), deepEqual, ORDER_FREE, normalizeForCompare
│   │   ├── mentor.js            — localMentorReply, customMentorTemplate, MENTOR_LABEL
│   │   ├── routes.js            — semua handler /api/* + penyajian file statis
│   │   └── data/problems/
│   │       ├── index.js         — [...easy, ...medium, ...hard], urutan sama seperti v1
│   │       ├── easy.js          — 7 soal Easy
│   │       ├── medium.js        — 9 soal Medium
│   │       └── hard.js          — 2 soal Hard
│   └── data/
│       └── data.json            — state lokal (bentuk sama seperti v1)
└── frontend/
    ├── index.html               — kerangka UI + banner jujur + peringatan file:// + badge v2.0.0
    ├── css/style.css            — satu-satunya stylesheet (satu font stack sistem)
    └── js/                      — ES modules, disajikan server (type="module")
        ├── main.js              — entry: init + refresh + wiring tab/filter/form
        ├── api.js               — fetch wrapper api(path, method, body)
        ├── utils.js             — $, esc, LANG_LABELS
        ├── state.js             — appState + hooks.refresh
        ├── render-progress.js   — renderProgress, countsByDifficulty
        ├── render-catalog.js    — renderCatalog
        ├── render-detail.js     — renderDetail
        ├── render-custom.js     — renderCustomList, renderCustomDetail
        ├── editor.js            — runTests, formatRunResults
        ├── quiz.js              — gradeQuiz, saveQuizResult
        ├── notes.js             — saveNote
        └── mentor.js            — askMentor, askCustomMentor, formatMentorHistory
```

Keputusan struktur: `style.css` dipindah ke `frontend/css/style.css` (bukan dibiarkan di `frontend/style.css`), supaya frontend punya pemisahan yang jelas antara `css/` dan `js/`; `index.html` memakai `/css/style.css` dan server menyajikan path itu dari `frontend/` seperti file statis lainnya.

## Peta fitur → file

| Fitur | File | Cara kerja |
|---|---|---|
| Katalog soal, filter tingkat/pola/status/pencarian | `backend/src/data/problems/*.js`, `frontend/js/render-catalog.js` | Soal diambil dari `GET /api/problems`; filter dihitung dari koleksi yang diterima, bukan angka hardcode. |
| Progres + statistik Easy/Medium/Hard | `frontend/js/render-progress.js`, `backend/data/data.json` (`completed`) | Jumlah selesai dihitung dari `problems` + `state.completed`; persen dihitung dari panjang koleksi. |
| Detail soal: deskripsi, contoh, batasan | `backend/src/data/problems/*.js`, `frontend/js/render-detail.js` | Ditampilkan dari data soal per id. |
| Hint 3 tingkat berurutan | `backend/src/data/problems/*.js` (`hints`), `frontend/js/render-detail.js` (`openedHints` di `state.js`) | Hint ke-n terkunci sampai hint ke-(n-1) dibuka; state buka-hint hanya di sesi browser. |
| Editor + Jalankan Tes (JavaScript) | `backend/src/runner.js` (`runUserCode`), `backend/src/routes.js` (`POST /api/run`), `frontend/js/editor.js`, `frontend/js/render-detail.js` | Kode dieksekusi di `vm` sandbox (tanpa `require`/`process`/network/file, timeout 2 detik per test). Semua tes lulus → `completed[problemId]` tersimpan. |
| Normalisasi urutan hasil | `backend/src/runner.js` (`ORDER_FREE`, `normalizeForCompare`) | Untuk soal yang hasilnya daftar kelompok (3Sum, Grup Anagram, Kombinasi), urutan kelompok tidak memengaruhi lulus/gagal. |
| Solusi referensi 5 bahasa | `backend/src/data/problems/*.js` (`solutions`), `frontend/js/render-detail.js` (pemilih bahasa, `LANG_LABELS` di `utils.js`) | JavaScript, Python, Java, Go, C++. Hanya JavaScript yang dieksekusi; sisanya referensi. |
| Kompleksitas + edge case | `backend/src/data/problems/*.js` (`complexity`, `edgeCases`) | Ditampilkan di halaman detail soal. |
| Kuis cek pemahaman | `backend/src/data/problems/*.js` (`quiz`), `frontend/js/quiz.js`, `POST /api/quiz` di `routes.js` | Jawaban dicek di frontend terhadap `quiz.answer`; hasilnya tersimpan di `state.quiz`. |
| Catatan pribadi | `frontend/js/notes.js`, `POST /api/notes` di `routes.js` | Tersimpan per soal di `state.notes`. |
| Mentor Lokal (bukan AI live) | `backend/src/mentor.js` (`localMentorReply`, `POST /api/mentor`), `frontend/js/mentor.js`, `frontend/js/render-detail.js` | Jawaban disusun dari hint soal + template Socratic + checklist review berdasarkan hasil tes. Tidak ada kunci API dan tidak ada panggilan network. Riwayat tersimpan per soal di `state.mentorHistory`. |
| Soal tempelan sendiri | `frontend/js/render-custom.js`, `POST /api/custom`, `POST /api/custom/:id`, `DELETE /api/custom/:id` di `routes.js` | Simpan judul + isi paste, status Belum/Dicoba/Selesai, hapus soal. Saat disimpan, mentor langsung memberi template bedah terstruktur. |
| Template bedah soal tempelan | `backend/src/mentor.js` (`customMentorTemplate`) | 6 langkah: pahami soal, contoh, edge case, pola yang mungkin, langkah/pseudocode, uji. |
| Riwayat percobaan kode | `backend/data/data.json` (`attempts`), `POST /api/run` | 100 percobaan terakhir tersimpan; 5 terakhir per soal ditampilkan di detail soal. |
| Peringatan file:// | `frontend/index.html` (script inline kecil) | Jika dibuka lewat `file://`, banner muncul dan mengarahkan ke langkah launch yang didokumentasikan. Modul ES tidak jalan dari `file://`, jadi cek ini sengaja inline, bukan di `main.js`. |
| Reset progres | `backend/data/data.json` | Hapus file ini lalu restart server; server membuat state kosong baru. |
| Migrasi data v1 | `backend/src/state.js` (bentuk state sama seperti v1) | Salin `backend/data/data.json` dari folder v1 ke v2. Lihat README bagian "Migrasi data dari v1". |

## API (semua JSON, handler di `backend/src/routes.js`)

- `GET /api/problems` — seluruh katalog soal.
- `GET /api/state` — state lokal + jumlah total soal.
- `POST /api/run` `{ problemId, code }` — jalankan tes JavaScript, simpan percobaan, tandai selesai bila semua lulus.
- `POST /api/notes` `{ problemId, text }` — simpan catatan.
- `POST /api/quiz` `{ problemId, correct }` — simpan hasil kuis.
- `POST /api/mentor` `{ problemId, message }` — jawaban Mentor Lokal + simpan riwayat.
- `POST /api/custom` `{ title, description }` — simpan soal tempelan.
- `POST /api/custom/:id` `{ status }` atau `{ message }` — ubah status / tanya mentor lokal soal tempelan.
- `DELETE /api/custom/:id` — hapus soal tempelan beserta riwayat mentornya.

## Traceability (angka di UI)

- Semua hitungan (total soal, selesai, persen, per tingkat) dihitung di `frontend/js/render-progress.js` dari `problems` dan `state.completed` yang diterima dari server — tidak ada angka hitungan yang di-hardcode di copy/badge UI. Badge `v2.0.0` di header adalah versi aplikasi (dari `package.json`), bukan hitungan.
- Soal, hint, solusi, dan test case bersumber dari `backend/src/data/problems/*.js` (ditulis ulang dengan bahasa sendiri; isi soal sama persis dengan v1, diverifikasi deep-equal).
- Progres, catatan, dan soal tempelan bersumber dari `backend/data/data.json` (state lokal Rainy sendiri).
- Tidak ada data live dari LeetCode, tidak ada harga, dan tidak ada angka yang diklaim dari sumber luar.

## Batasan vs versi hosted

- Mentor hosted adalah AI live; mentor lokal adalah Mentor Lokal berbasis hint + template Socratic (bukan AI live) — dilabeli jelas di UI dan README.
- Test runner lokal hanya mengeksekusi JavaScript; bahasa lain hanya referensi (sama seperti hosted, dan ditulis jujur di UI).
- Tidak ada akun/login; progres tersimpan di satu file lokal `backend/data/data.json` di perangkat yang menjalankan server.
