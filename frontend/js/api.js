// Satu-satunya tempat fetch ke server — semua modul memanggil api() ini.
export async function api(path, method, body) {
  const r = await fetch(path, { method: method || 'GET', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || ('Gagal memuat (' + r.status + ')'));
  return data;
}
