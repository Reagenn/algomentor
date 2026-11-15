// Konfigurasi server — satu tempat untuk port dan path penting.
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const ROOT = path.join(__dirname, '..', '..');
const FRONTEND_DIR = path.join(ROOT, 'frontend');
const DATA_FILE = path.join(__dirname, '..', 'data', 'data.json');

module.exports = { PORT, ROOT, FRONTEND_DIR, DATA_FILE };
