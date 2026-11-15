# AlgoMentor — Hints-First Algorithm Practice

**AlgoMentor v2.0.0** adalah aplikasi latihan soal algoritma gaya LeetCode (LeetCode-style practice) yang mengutamakan belajar memecahkan soal, bukan menyalin jawaban.

> **Bukan afiliasi LeetCode.** Soal-soal di sini ditulis ulang dengan bahasa sendiri, bukan salinan teks soal LeetCode. Nama "LeetCode" hanya dipakai sebagai deskripsi gaya latihannya.
>
> 
## Cara menjalankan

Butuh **Node.js 18+**. Tidak ada dependensi npm — tidak perlu `npm install`.

```bash
node backend/src/server.js
# atau
npm start
```

Lalu buka **http://localhost:3000** di browser. Kalau port 3000 sudah dipakai aplikasi lain, jalankan dengan port lain: `PORT=3100 node backend/src/server.js`, lalu buka `http://localhost:3100`.

> Jangan buka file HTML-nya langsung lewat `file://` — aplikasi akan menampilkan peringatan dan fitur (katalog, tes, progres) tidak akan jalan, karena butuh server lokal di atas.

## Reset progres

Hapus file `backend/data/data.json`, lalu restart server. Progres dimulai lagi dari 0.

## Migrasi data dari v1

API dan bentuk `data.json` di v2 **sama persis** dengan v1, jadi progres v1 bisa dibawa ke v2:

1. Di folder v1, salin file `backend/data/data.json`.
2. Tempelkan ke folder v2 di `backend/data/data.json`, menimpa file kosong bawaan v2.
3. Jalankan v2 seperti biasa — progres, catatan, kuis, dan soal tempelanmu ikut pindah.

> Arah migrasinya hanya v1 → v2. **Jangan** menyalin `data.json` v2 ke folder v1.

## Fitur

- Katalog soal latihan gaya LeetCode yang ditulis ulang: Easy, Medium, Hard; pola Hash Map, Two Pointers, Stack, Sliding Window, Binary Search, DP, DFS/BFS, dan lain-lain.
- Hint bertahap 3 tingkat yang terbuka berurutan: 1) arah pikir → 2) pola → 3) pseudocode.
- Solusi + penjelasan + kompleksitas + edge case dalam 5 bahasa: JavaScript, Python, Java, Go, C++.
- Editor kode dengan tombol **Jalankan Tes** untuk JavaScript — kode dieksekusi di server lokal terhadap test case soal, dan soal otomatis ditandai Selesai bila semua tes lulus.
- Kuis cek pemahaman dan catatan pribadi per soal.
- Mentor berbahasa Indonesia yang hints-first.
- Tempel soal sendiri: simpan soal yang di-paste, ubah status (Belum / Dicoba / Selesai), hapus soal, dan riwayat percakapan mentor per soal.
- Progres tersimpan secara lokal, lengkap dengan riwayat percobaan kode dan statistik per tingkat kesulitan.

## Batasan jujur

- **Mentor Lokal — bukan AI live.** Versi lokal ini tidak punya kunci API AI, jadi mentornya berbasis hint bawaan soal + panduan Socratic bertahap + checklist review kode berdasarkan hasil tes. Untuk soal tempelan, mentor memberikan template bedah terstruktur, bukan jawaban AI yang dibuat-buat.
- **Jalankan Tes hanya mengeksekusi JavaScript.** Solusi Python, Java, Go, dan C++ tampil sebagai referensi dan tidak dieksekusi oleh test runner di aplikasi ini.
- **Tidak ada live-sync ke LeetCode.** Tidak ada scraping, tidak ada pengambilan soal dari LeetCode.

## Untuk GitHub / Portofolio

- **Apa aplikasinya:** AlgoMentor — aplikasi latihan algoritma hints-first. Pengguna memilih soal, mencoba memecahkan sendiri dengan bantuan hint bertahap, menjalankan tes, lalu mengecek pemahaman lewat kuis dan catatan.
- **Fitur utama:** katalog soal dengan filter, hint 3 tingkat yang terbuka berurutan, editor + test runner JavaScript (Node `vm`, timeout, tanpa network/file), solusi referensi 5 bahasa, kuis + catatan per soal, mentor lokal hints-first, soal tempelan dengan status dan riwayat mentor, progres tersimpan lokal.
- **Cara menjalankan:** `node backend/src/server.js`, lalu buka `http://localhost:3000` (Node 18+, tanpa `npm install`).
- **Struktur yang ditonjolkan:** backend dan frontend sama-sama modular (lihat [Struktur folder](#struktur-folder)) — tiap modul punya satu tanggung jawab dan komentar header yang menjelaskan tujuannya.
- **Batasan jujur:** Mentor Lokal — bukan AI live; Jalankan Tes hanya JavaScript; soal ditulis ulang dengan bahasa sendiri dan bukan afiliasi LeetCode.

## Struktur folder

```text
algomentor-v2/
├── .gitignore                   — node_modules/ dan backend/data/data.json (progres tidak ikut ter-commit)
├── LICENSE                      — MIT atas nama Rainy (Reagen)
├── README.md                    — file ini: cara jalan, fitur, migrasi v1, GitHub/Portofolio
├── Dokumentasi.md               — peta tiap fitur ke file modulnya
├── package.json                 — name: algomentor, version: 2.0.0, zero dependencies, npm start = node backend/src/server.js
├── backend/
│   ├── data/
│   │   └── data.json            — state lokal (progres, catatan, percobaan, kuis, soal tempelan, riwayat mentor)
│   └── src/
│       ├── server.js            — HANYA entry point tipis: buat server + listen (lihat Dokumentasi.md)
│       ├── config.js            — PORT, ROOT, FRONTEND_DIR, DATA_FILE
│       ├── state.js             — defaultState, loadState, saveState (bentuk data.json sama seperti v1)
│       ├── http.js              — sendJson, readBody, MIME, serveStaticFile
│       ├── runner.js            — vm sandbox Jalankan Tes JS + normalisasi urutan (ORDER_FREE)
│       ├── mentor.js            — localMentorReply, customMentorTemplate, label Mentor Lokal
│       ├── routes.js            — semua handler /api/* + penyajian file statis
│       └── data/
│           └── problems/
│               ├── index.js     — re-export gabungan: [...easy, ...medium, ...hard]
│               ├── easy.js      — 7 soal Easy (isi sama persis seperti v1)
│               ├── medium.js    — 9 soal Medium (isi sama persis seperti v1)
│               └── hard.js      — 2 soal Hard (isi sama persis seperti v1)
└── frontend/
    ├── index.html               — kerangka UI + banner jujur + peringatan file:// (script inline kecil) + badge v2.0.0
    ├── css/
    │   └── style.css            — satu-satunya stylesheet (satu font stack sistem)
    └── js/                      — ES modules (type="module", disajikan server)
        ├── main.js              — entry: init + refresh awal + wiring tab/filter/form
        ├── api.js               — fetch wrapper ke /api/*
        ├── utils.js             — $, esc, LANG_LABELS
        ├── state.js             — state lokal + hooks.refresh (diisi main.js)
        ├── render-progress.js   — progres + statistik per tingkat
        ├── render-catalog.js    — katalog + filter
        ├── render-detail.js     — detail soal (hint, editor, solusi, kuis, catatan, mentor)
        ├── render-custom.js     — soal tempelan (daftar, detail, status, hapus, bedah)
        ├── editor.js            — runTests + formatRunResults
        ├── quiz.js              — gradeQuiz + saveQuizResult
        ├── notes.js             — saveNote
        └── mentor.js            — askMentor, askCustomMentor, formatMentorHistory
```

## Cara tambah soal baru

1. Tambahkan objek soal ke file yang sesuai tingkatnya di `backend/src/data/problems/` (`easy.js`, `medium.js`, atau `hard.js`) — ikuti bentuk soal yang sudah ada (id unik, title, difficulty, pattern, description, examples, constraints, functionName, jsSignature, tests, hints, solutions 5 bahasa, complexity, edgeCases, quiz).
2. Tidak perlu mengubah file lain: `index.js` menggabungkan ketiga file itu, dan katalog, progres, serta statistik dihitung dari koleksi soal — total soal di UI ikut bertambah otomatis.
3. Restart server, lalu cek katalog dan Jalankan Tes untuk soal barumu.

## Cara tambah route API baru

1. Tambahkan handler di `backend/src/routes.js`, di dalam `handleRequest`, sebelum bagian "Frontend statis" — pakai `sendJson`/`readBody` dari `http.js` dan `loadState`/`saveState` dari `state.js` bila route itu menyentuh progres.
2. Bila route butuh logika yang bisa dipakai ulang (mis. eksekusi kode atau jawaban mentor), taruh logikanya di modulnya (`runner.js` / `mentor.js`), bukan di `routes.js`.
3. Tambahkan pemanggilnya di frontend lewat `api()` dari `frontend/js/api.js`, lalu dokumentasikan endpoint baru di `Dokumentasi.md`.
