// Helper HTTP — kirim JSON, baca body, dan sajikan file statis frontend.
// Tidak ada logika bisnis di sini.
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 512 * 1024) req.destroy(); });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('Body bukan JSON yang valid.')); }
    });
    req.on('error', reject);
  });
}

// Sajikan satu file statis dari FRONTEND_DIR. Kembalikan true bila sudah
// ditangani (file ada dan terkirim), false bila bukan file statis yang valid.
function serveStaticFile(res, frontendDir, pathname) {
  const filePath = pathname === '/'
    ? path.join(frontendDir, 'index.html')
    : path.join(frontendDir, pathname);
  if (!filePath.startsWith(frontendDir)) { sendJson(res, 403, { error: 'Akses ditolak.' }); return true; }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return false;
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

module.exports = { MIME, sendJson, readBody, serveStaticFile };
