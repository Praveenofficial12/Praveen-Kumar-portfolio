import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

// ── SQLite Setup ────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'contacts.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    email     TEXT    NOT NULL,
    subject   TEXT    NOT NULL,
    message   TEXT    NOT NULL,
    received  TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
  )
`);

// ── API Routes ──────────────────────────────────────────────────────────────

// POST /api/contact  → save a new message
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const stmt = db.prepare(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(name, email, subject, message);
    res.json({ success: true, id: info.lastInsertRowid });
});

// GET /api/contact   → list all messages (for the viewer)
app.get('/api/contact', (req, res) => {
    const rows = db.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    res.json(rows);
});

// DELETE /api/contact/:id  → delete a message
app.delete('/api/contact/:id', (req, res) => {
    db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// ── SQLite Viewer UI ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    const total = db.prepare('SELECT COUNT(*) as cnt FROM contacts').get().cnt;

    const rowsHtml = rows.length === 0
        ? `<tr><td colspan="6" style="text-align:center;color:#6b7280;padding:2rem">No messages yet.</td></tr>`
        : rows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${esc(r.name)}</td>
        <td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
        <td>${esc(r.subject)}</td>
        <td class="msg">${esc(r.message)}</td>
        <td>${r.received}</td>
        <td>
          <button onclick="del(${r.id})" class="del-btn">🗑 Delete</button>
        </td>
      </tr>`).join('');

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>📬 Contact Messages – Praveen Kumar K</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#e2e8f0;min-height:100vh}
    header{background:linear-gradient(135deg,#7c3aed,#a855f7);padding:1.5rem 2rem;display:flex;align-items:center;justify-content:space-between}
    header h1{font-size:1.4rem;font-weight:700;color:#fff;letter-spacing:-.5px}
    .badge{background:rgba(255,255,255,.2);color:#fff;padding:4px 14px;border-radius:99px;font-size:.8rem;font-weight:600}
    .container{max-width:1200px;margin:2rem auto;padding:0 1.5rem}
    .stats{display:flex;gap:1rem;margin-bottom:1.5rem}
    .stat{background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);border-radius:12px;padding:1rem 1.5rem;min-width:160px}
    .stat-num{font-size:2rem;font-weight:800;color:#c084fc}
    .stat-label{font-size:.8rem;color:#9ca3af;margin-top:2px}
    .table-wrap{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:auto}
    table{width:100%;border-collapse:collapse}
    th{background:rgba(124,58,237,.2);padding:.85rem 1rem;text-align:left;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:#c084fc;border-bottom:1px solid rgba(255,255,255,.07)}
    td{padding:.85rem 1rem;border-bottom:1px solid rgba(255,255,255,.05);font-size:.88rem;vertical-align:top;color:#d1d5db}
    td.msg{max-width:280px;white-space:pre-wrap;word-break:break-word}
    tr:hover td{background:rgba(124,58,237,.06)}
    tr:last-child td{border-bottom:none}
    a{color:#a78bfa;text-decoration:none}
    a:hover{text-decoration:underline}
    .del-btn{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#fca5a5;
      padding:4px 12px;border-radius:8px;cursor:pointer;font-size:.8rem;transition:.2s}
    .del-btn:hover{background:rgba(239,68,68,.3)}
    .refresh{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;
      padding:.5rem 1.2rem;border-radius:10px;cursor:pointer;font-size:.85rem;font-weight:600;text-decoration:none}
    footer{text-align:center;padding:2rem;color:#4b5563;font-size:.8rem}
  </style>
</head>
<body>
  <header>
    <h1>📬 Contact Message Viewer</h1>
    <span class="badge">Praveen Kumar K · Portfolio</span>
  </header>
  <div class="container">
    <div class="stats">
      <div class="stat"><div class="stat-num">${total}</div><div class="stat-label">Total Messages</div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
      <h2 style="font-size:1.05rem;color:#e2e8f0">All Submissions</h2>
      <a href="/" class="refresh">↻ Refresh</a>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>#</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Received</th><th>Action</th>
        </tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  </div>
  <footer>SQLite · better-sqlite3 · Express · Portfolio Backend</footer>
  <script>
    async function del(id) {
      if (!confirm('Delete this message?')) return;
      await fetch('/api/contact/' + id, { method: 'DELETE' });
      location.reload();
    }
  </script>
</body>
</html>`);
});

function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

app.listen(PORT, () => {
    console.log(`\n  ✅  Backend running  →  http://localhost:${PORT}`);
    console.log(`  📊  SQLite Viewer   →  http://localhost:${PORT}/`);
    console.log(`  💾  Database        →  contacts.db\n`);
});
