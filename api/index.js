import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, getDashboard, listContacts } from './services/database.js';
import contactRouter from './routes/contact.js';
import analyticsRouter from './routes/analytics.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Database Connection Middleware ──────────────────────────────────────────
let dbInit = null;
app.use(async (req, res, next) => {
  if (!dbInit) dbInit = connectDB();
  try { await dbInit; } catch { /* Continue serving requests */ }
  next();
});

// ── Mount Modular API Routers ────────────────────────────────────────────────
app.use('/api/contact', contactRouter);
app.use('/api/analytics', analyticsRouter);

// ── Admin Viewer Redirect ───────────────────────────────────────────────────
app.get('/api', (req, res) => res.redirect('/api/viewer'));

// ── Interactive Admin Dashboard UI ──────────────────────────────────────────
app.get('/api/viewer', async (req, res) => {
  let data, messages;
  let dbConnected = true;

  try {
    [data, messages] = await Promise.all([getDashboard(), listContacts(req.query)]);
  } catch {
    dbConnected = false;
    data = {
      cards: { totalMsg: 0, todayMsg: 0, unreadMsg: 0, starredMsg: 0, totalVisitors: 0, todayVisitors: 0, resumeTotal: 0, certTotal: 0, projTotal: 0 },
      recentMsgs: [], recentVisits: [], recentDLs: []
    };
    messages = [];
  }

  const c = data.cards;
  const msgFilter = req.query.status || '';
  const search = req.query.search || '';

  const msgRows = messages.length === 0
    ? `<tr><td colspan="9" style="text-align:center;color:#6b7280;padding:2.5rem">No messages yet. Contact form is ready and waiting.</td></tr>`
    : messages.map(m => `
    <tr data-id="${m.id}" style="${!m.isRead ? 'background:rgba(124,58,237,0.06)' : ''}">
      <td style="padding:.75rem 1rem;text-align:center;cursor:pointer" onclick="toggleStar('${m.id}',${!m.starred})" title="Toggle star">${m.starred ? '⭐' : '☆'}</td>
      <td style="padding:.75rem 1rem">${esc(m.name)}<br><small style="color:#9ca3af;font-size:.75rem">${esc(m.company || '')} ${m.phone ? '· ' + esc(m.phone) : ''}</small></td>
      <td style="padding:.75rem 1rem"><a href="mailto:${esc(m.email)}" style="color:#38bdf8;font-size:.85rem">${esc(m.email)}</a></td>
      <td style="padding:.75rem 1rem"><span class="badge">${esc(m.subject)}</span><br><small style="color:#c084fc;font-size:.72rem">${esc(m.service || '')} ${m.budget ? '· ' + esc(m.budget) : ''}</small></td>
      <td style="padding:.75rem 1rem;max-width:280px;white-space:pre-wrap;word-break:break-word;font-size:.83rem;color:#d1d5db">${esc(m.message)}<br><small style="color:#6b7280;font-size:.72rem">IP: ${esc(m.ipAddress || '')} · ${esc(m.country || '')} · ${esc(m.device || '')}</small></td>
      <td style="padding:.75rem 1rem"><span class="status-badge status-${m.status}">${m.status}</span></td>
      <td style="padding:.75rem 1rem;white-space:nowrap;font-size:.78rem;color:#9ca3af">${m.createdAt}</td>
      <td style="padding:.75rem 1rem">
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          <button onclick="markRead('${m.id}',${!m.isRead})" class="act-btn" title="${m.isRead ? 'Mark Unread' : 'Mark Read'}">${m.isRead ? '📭' : '📬'}</button>
          <a href="mailto:${esc(m.email)}?subject=Re:%20${encodeURIComponent(m.subject)}" class="act-btn" style="text-decoration:none">✉️</a>
          <button onclick="delMsg('${m.id}')" class="del-btn">🗑</button>
        </div>
      </td>
    </tr>`).join('');

  const visitRows = data.recentVisits.map(v => `
    <tr>
      <td style="padding:.7rem .9rem;font-size:.82rem;color:#cbd5e1">${v.page}</td>
      <td style="padding:.7rem .9rem;font-size:.82rem;color:#9ca3af">${v.browser}</td>
      <td style="padding:.7rem .9rem"><span class="badge" style="background:rgba(59,130,246,0.2);color:#60a5fa">${v.device}</span></td>
      <td style="padding:.7rem .9rem;font-size:.78rem;color:#6b7280">${v.referrer}</td>
      <td style="padding:.7rem .9rem;font-size:.78rem;color:#6b7280;white-space:nowrap">${v.time}</td>
    </tr>`).join('') || `<tr><td colspan="5" style="text-align:center;color:#6b7280;padding:2rem">No analytics data yet.</td></tr>`;

  const dlRows = data.recentDLs.map(d => `
    <tr>
      <td style="padding:.7rem .9rem"><span class="badge" style="background:rgba(236,72,153,0.2);color:#f472b6">${d.action}</span></td>
      <td style="padding:.7rem .9rem;font-size:.82rem;color:#9ca3af">${d.browser}</td>
      <td style="padding:.7rem .9rem"><span class="badge" style="background:rgba(124,58,237,0.2);color:#c084fc">${d.device}</span></td>
      <td style="padding:.7rem .9rem;font-size:.78rem;color:#6b7280;white-space:nowrap">${d.time}</td>
    </tr>`).join('') || `<tr><td colspan="4" style="text-align:center;color:#6b7280;padding:2rem">No resume downloads yet.</td></tr>`;

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>⚡ Portfolio Admin Dashboard</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:#090d16;color:#e2e8f0;min-height:100vh}
    header{background:linear-gradient(135deg,#7c3aed,#a855f7,#ec4899);padding:1.25rem 2rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 24px rgba(124,58,237,0.35)}
    header h1{font-size:1.25rem;font-weight:800;color:#fff;letter-spacing:-.5px}
    .hbadge{background:rgba(255,255,255,.2);color:#fff;padding:5px 14px;border-radius:99px;font-size:.78rem;font-weight:700}
    .container{max-width:1350px;margin:0 auto;padding:1.75rem 1.5rem}
    .db-status{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);border-radius:12px;padding:1rem 1.25rem;color:#6ee7b7;font-size:.88rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:1rem;margin-bottom:1.75rem}
    .stat{background:rgba(255,255,255,.03);border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:1.1rem 1.4rem;transition:.2s}
    .stat:hover{border-color:rgba(168,85,247,.5);background:rgba(168,85,247,.06)}
    .stat-num{font-size:2.1rem;font-weight:800;background:linear-gradient(135deg,#a78bfa,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .stat-label{font-size:.78rem;color:#94a3b8;margin-top:3px;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
    .tabs{display:flex;gap:.6rem;margin-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:.75rem;flex-wrap:wrap}
    .tab{background:none;border:none;color:#9ca3af;font-size:.88rem;font-weight:600;padding:.55rem 1.15rem;border-radius:8px;cursor:pointer;transition:.2s}
    .tab.active{background:rgba(124,58,237,.2);color:#c084fc;border:1px solid rgba(124,58,237,.4)}
    .tab-panel{display:none}.tab-panel.active{display:block}
    .toolbar{display:flex;gap:.75rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap}
    .search-box{flex:1;min-width:200px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:.6rem 1rem;color:#e2e8f0;font-size:.88rem;outline:none}
    .search-box:focus{border-color:rgba(168,85,247,.5)}
    .filter-select{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:.6rem 1rem;color:#e2e8f0;font-size:.85rem;outline:none;cursor:pointer}
    .filter-select option{background:#111827;color:#e2e8f0}
    .btn-refresh{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;padding:.6rem 1.25rem;border-radius:10px;cursor:pointer;font-size:.85rem;font-weight:700;text-decoration:none;display:inline-block;transition:.2s}
    .btn-refresh:hover{opacity:.88}
    .table-wrap{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:auto}
    table{width:100%;border-collapse:collapse}
    th{background:rgba(124,58,237,.15);padding:.8rem 1rem;text-align:left;font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;color:#c084fc;border-bottom:1px solid rgba(255,255,255,.07);white-space:nowrap}
    tr:hover td{background:rgba(124,58,237,.05)}
    tr:last-child td{border-bottom:none}
    a{color:#a78bfa;text-decoration:none}
    .badge{background:rgba(168,85,247,.15);color:#c084fc;padding:3px 10px;border-radius:6px;font-size:.75rem;font-weight:600}
    .status-badge{padding:3px 10px;border-radius:6px;font-size:.73rem;font-weight:700;text-transform:uppercase}
    .status-unread{background:rgba(239,68,68,.15);color:#fca5a5}
    .status-read{background:rgba(59,130,246,.15);color:#60a5fa}
    .status-replied{background:rgba(52,211,153,.15);color:#34d399}
    .status-archived{background:rgba(107,114,128,.15);color:#9ca3af}
    .act-btn{background:rgba(124,58,237,.18);border:1px solid rgba(124,58,237,.35);color:#c084fc;padding:4px 9px;border-radius:6px;cursor:pointer;font-size:.8rem;transition:.2s}
    .act-btn:hover{background:rgba(124,58,237,.35)}
    .del-btn{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#fca5a5;padding:4px 9px;border-radius:6px;cursor:pointer;font-size:.8rem;transition:.2s}
    .del-btn:hover{background:rgba(239,68,68,.3)}
    footer{text-align:center;padding:2rem;color:#4b5563;font-size:.78rem;border-top:1px solid rgba(255,255,255,.05);margin-top:2rem}
    .compass-box{background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(168,85,247,.06));border:1px solid rgba(168,85,247,.3);border-radius:14px;padding:1.25rem 1.5rem;margin-bottom:1.75rem}
    .compass-box h3{font-size:.95rem;font-weight:700;color:#c084fc;margin-bottom:.5rem}
    .compass-box code{display:block;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:.75rem 1rem;font-family:monospace;font-size:.83rem;color:#a5f3fc;margin-top:.5rem;word-break:break-all}
  </style>
</head>
<body>
<header>
  <h1>⚡ Portfolio Admin Dashboard</h1>
  <span class="hbadge">Praveen Kumar K · AI Engineer</span>
</header>

<div class="container">
  <div class="db-status">
    ✅ <strong>MongoDB Atlas Connected Successfully!</strong> Network access is active and all collections are live.
  </div>

  <!-- MongoDB Compass Connection Info -->
  <div class="compass-box">
    <h3>🧭 MongoDB Compass Connection String</h3>
    <p style="font-size:.82rem;color:#94a3b8;margin-bottom:.25rem">Paste this connection string into MongoDB Compass:</p>
    <code>mongodb+srv://praveenkrisk1204_db_user:abTI94Wn0uTJ55kY@cluster0.7xcs791.mongodb.net/</code>
    <p style="font-size:.78rem;color:#6b7280;margin-top:.5rem">Database: <code style="display:inline;background:rgba(255,255,255,.05);padding:2px 6px;border-radius:4px;border:none;color:#a78bfa">portfolio</code> | Collections: ContactMessages, PortfolioAnalytics, ResumeDownloads, CertificateViews, ProjectClicks</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats">
    <div class="stat"><div class="stat-num">${c.totalMsg}</div><div class="stat-label">📬 Total Messages</div></div>
    <div class="stat"><div class="stat-num">${c.unreadMsg}</div><div class="stat-label">🔔 Unread</div></div>
    <div class="stat"><div class="stat-num">${c.todayMsg}</div><div class="stat-label">📅 Today's Messages</div></div>
    <div class="stat"><div class="stat-num">${c.todayVisitors}</div><div class="stat-label">👤 Visitors Today</div></div>
    <div class="stat"><div class="stat-num">${c.totalVisitors}</div><div class="stat-label">🌐 Total Visitors</div></div>
    <div class="stat"><div class="stat-num">${c.resumeTotal}</div><div class="stat-label">📄 Resume Downloads</div></div>
    <div class="stat"><div class="stat-num">${c.certTotal}</div><div class="stat-label">🏅 Cert Views</div></div>
    <div class="stat"><div class="stat-num">${c.projTotal}</div><div class="stat-label">🖱 Project Clicks</div></div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button class="tab active" onclick="switch_tab('contacts', this)">📬 Messages (${c.totalMsg})</button>
    <button class="tab" onclick="switch_tab('analytics', this)">📊 Site Analytics (${c.totalVisitors})</button>
    <button class="tab" onclick="switch_tab('downloads', this)">📄 Resume Downloads (${c.resumeTotal})</button>
  </div>

  <!-- Tab: Contacts -->
  <div id="tab-contacts" class="tab-panel active">
    <div class="toolbar">
      <input id="search-input" class="search-box" placeholder="Search name, email, subject..." value="${esc(search)}"
        onkeydown="if(event.key==='Enter'){window.location.href='/api/viewer?search='+encodeURIComponent(this.value)+'&status=${msgFilter}'}"/>
      <select class="filter-select" onchange="window.location.href='/api/viewer?status='+this.value">
        <option value="" ${msgFilter === '' ? 'selected' : ''}>All Status</option>
        <option value="unread" ${msgFilter === 'unread' ? 'selected' : ''}>Unread</option>
        <option value="read" ${msgFilter === 'read' ? 'selected' : ''}>Read</option>
        <option value="replied" ${msgFilter === 'replied' ? 'selected' : ''}>Replied</option>
        <option value="archived" ${msgFilter === 'archived' ? 'selected' : ''}>Archived</option>
      </select>
      <a href="/api/viewer" class="btn-refresh">↻ Refresh</a>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>★</th><th>Visitor</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th><th>Received</th><th>Actions</th>
        </tr></thead>
        <tbody>${msgRows}</tbody>
      </table>
    </div>
  </div>

  <!-- Tab: Analytics -->
  <div id="tab-analytics" class="tab-panel">
    <div class="toolbar">
      <a href="/api/viewer" class="btn-refresh">↻ Refresh</a>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Page Visited</th><th>Browser</th><th>Device</th><th>Referrer</th><th>Timestamp</th>
        </tr></thead>
        <tbody>${visitRows}</tbody>
      </table>
    </div>
  </div>

  <!-- Tab: Downloads -->
  <div id="tab-downloads" class="tab-panel">
    <div class="toolbar">
      <a href="/api/viewer" class="btn-refresh">↻ Refresh</a>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Action</th><th>Browser</th><th>Device</th><th>Timestamp</th>
        </tr></thead>
        <tbody>${dlRows}</tbody>
      </table>
    </div>
  </div>
</div>

<footer>
  MongoDB Atlas Cluster · <strong>portfolio</strong> Database · Express REST API
</footer>

<script>
let lastMsgCount = ${messages.length};

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
}

if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

setInterval(async () => {
  try {
    const res = await fetch('/api/contact');
    if (!res.ok) return;
    const data = await res.json();
    const msgs = Array.isArray(data.messages) ? data.messages : (Array.isArray(data) ? data : []);
    if (msgs.length > lastMsgCount) {
      const newMsg = msgs[0];
      playChime();
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🔔 New Portfolio Contact Request', {
          body: 'From: ' + (newMsg.name || 'Visitor') + '\nMessage: ' + (newMsg.message || '')
        });
      }
      setTimeout(() => location.reload(), 1200);
    }
  } catch(e) {}
}, 5000);

function switch_tab(name, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}
async function toggleStar(id, starred) {
  await fetch('/api/contact/' + id, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ starred }) });
  location.reload();
}
async function markRead(id, isRead) {
  await fetch('/api/contact/' + id, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ isRead }) });
  location.reload();
}
async function delMsg(id) {
  if (!confirm('Delete this message permanently?')) return;
  await fetch('/api/contact/' + id, { method: 'DELETE' });
  location.reload();
}
</script>
</body>
</html>`);
});

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── Start Server ────────────────────────────────────────────────────────────
if (!process.env.VERCEL && !process.env.NOW_BUILDER) {
  app.listen(PORT, () => {
    console.log(`\n  ✅  Server running: http://localhost:${PORT}`);
    console.log(`  📊  Admin Dashboard: http://localhost:${PORT}/api/viewer\n`);
  });
  connectDB().catch(err => {
    console.warn('⚠️ MongoDB Initial connection note:', err.message);
  });
}

export default app;
