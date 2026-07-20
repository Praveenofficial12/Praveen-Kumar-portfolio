import express from 'express';
import cors from 'cors';
import { init, getContacts, getTotalCount, addContact, deleteContact } from './db.js';

const app = express();
const PORT = 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Ensure Database is initialized before handling any requests
let dbInitPromise = null;
app.use(async (req, res, next) => {
    if (!dbInitPromise) {
        dbInitPromise = init();
    }
    await dbInitPromise;
    next();
});

// ── API Routes ──────────────────────────────────────────────────────────────

// POST /api/contact  → save a new message
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const id = addContact(name, email, subject, message);
        res.json({ success: true, id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message.', details: error.message });
    }
});

// GET /api/contact   → list all messages as JSON
app.get('/api/contact', (req, res) => {
    try {
        const rows = getContacts();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
});

// DELETE /api/contact/:id  → delete a message
app.delete('/api/contact/:id', (req, res) => {
    try {
        deleteContact(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message.' });
    }
});

// Redirect /api to /api/viewer
app.get('/api', (req, res) => {
    res.redirect('/api/viewer');
});

// ── Database Viewer UI ────────────────────────────────────────────────────────
app.get('/api/viewer', (req, res) => {
    try {
        const rows = getContacts();
        const total = getTotalCount();

        const rowsHtml = rows.length === 0
            ? `<tr><td colspan="7" style="text-align:center;color:#6b7280;padding:2rem">No messages yet.</td></tr>`
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
      <a href="/api/viewer" class="refresh">↻ Refresh</a>
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
  <footer>SQLite Sync · Express · Portfolio Backend</footer>
  <script>
    async function del(id) {
      if (!confirm('Delete this message?')) return;
      await fetch('/api/contact/' + id, { method: 'DELETE' });
      location.reload();
    }
  </script>
</body>
</html>`);
    } catch (error) {
        res.status(500).send(`An error occurred: ${error.message}`);
    }
});

function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Only start the listener if running locally (not in serverless environment)
if (!process.env.VERCEL && !process.env.NOW_BUILDER) {
    init().then(() => {
        app.listen(PORT, () => {
            console.log(`\n  ✅  Backend running locally  →  http://localhost:${PORT}`);
            console.log(`  📊  Database Viewer         →  http://localhost:${PORT}/api/viewer`);
        });
    });
}

export default app;
