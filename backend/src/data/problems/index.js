// Katalog soal — re-export gabungan per tingkat kesulitan.
// Urutan gabungan SAMA seperti v1: semua Easy, lalu Medium, lalu Hard.
const easy = require('./easy');
const medium = require('./medium');
const hard = require('./hard');

module.exports = [...easy, ...medium, ...hard];
