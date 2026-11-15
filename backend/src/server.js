// AlgoMentor v2 — entry point tipis: buat server + listen saja.
// Semua logika ada di modulnya masing-masing (lihat routes.js, state.js,
// runner.js, mentor.js, http.js, config.js). Zero npm dependencies.
// Jalankan: node backend/src/server.js   lalu buka http://localhost:3000
// Reset progres: hapus backend/data/data.json lalu restart server.
const http = require('http');
const { PORT } = require('./config');
const { handleRequest } = require('./routes');

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`AlgoMentor berjalan di http://localhost:${PORT}`);
  console.log('Reset progres: hapus backend/data/data.json lalu restart server.');
});
