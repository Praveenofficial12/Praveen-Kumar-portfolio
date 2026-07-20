import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let sqliteDb = null;
let tursoClient = null;
let dbMode = 'json'; // 'sqlite' | 'turso' | 'json'

const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
// On Vercel, write to /tmp. Locally, write to project root.
const dbDir = isVercel ? '/tmp' : path.join(__dirname, '..');
const sqlitePath = path.join(dbDir, 'contacts.db');
const jsonPath = path.join(dbDir, 'contacts.json');

export async function init() {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    // 1. Prioritize Turso Cloud SQL if environment variables are set
    if (tursoUrl) {
        try {
            const { createClient } = await import('@libsql/client');
            tursoClient = createClient({
                url: tursoUrl,
                authToken: tursoToken,
            });
            await tursoClient.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id        INTEGER PRIMARY KEY AUTOINCREMENT,
          name      TEXT    NOT NULL,
          email     TEXT    NOT NULL,
          subject   TEXT    NOT NULL,
          message   TEXT    NOT NULL,
          received  TEXT    NOT NULL
        )
      `);
            dbMode = 'turso';
            console.log(`💾 Connected to Turso Cloud SQLite Database at ${tursoUrl}`);
            return;
        } catch (err) {
            console.error('❌ Failed to initialize Turso database:', err.message);
        }
    }

    // 2. Fall back to local SQLite if better-sqlite3 is successfully imported
    try {
        const Database = (await import('better-sqlite3')).default;
        sqliteDb = new Database(sqlitePath);
        sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT    NOT NULL,
        email     TEXT    NOT NULL,
        subject   TEXT    NOT NULL,
        message   TEXT    NOT NULL,
        received  TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
      )
    `);
        dbMode = 'sqlite';
        console.log(`💾 Connected to Local SQLite Database at ${sqlitePath}`);
    } catch (error) {
        // 3. Fall back to JSON database
        console.warn('⚠️ better-sqlite3 not loaded. Falling back to JSON database.', error.message);
        dbMode = 'json';
        if (!fs.existsSync(jsonPath)) {
            fs.writeFileSync(jsonPath, JSON.stringify([], null, 2));
        }
        console.log(`💾 Connected to JSON Database at ${jsonPath}`);
    }
}

export async function getContacts() {
    if (dbMode === 'turso' && tursoClient) {
        const res = await tursoClient.execute('SELECT * FROM contacts ORDER BY id DESC');
        return res.rows.map(row => ({
            id: Number(row.id),
            name: String(row.name),
            email: String(row.email),
            subject: String(row.subject),
            message: String(row.message),
            received: String(row.received)
        }));
    }

    if (dbMode === 'sqlite' && sqliteDb) {
        return sqliteDb.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    }

    // JSON mode
    try {
        const content = fs.readFileSync(jsonPath, 'utf8');
        const list = JSON.parse(content || '[]');
        return [...list].sort((a, b) => b.id - a.id);
    } catch (e) {
        return [];
    }
}

export async function getTotalCount() {
    if (dbMode === 'turso' && tursoClient) {
        const res = await tursoClient.execute('SELECT COUNT(*) as cnt FROM contacts');
        const firstRow = res.rows[0];
        return firstRow ? Number(firstRow.cnt) : 0;
    }

    if (dbMode === 'sqlite' && sqliteDb) {
        const res = sqliteDb.prepare('SELECT COUNT(*) as cnt FROM contacts').get();
        return res ? res.cnt : 0;
    }

    // JSON mode
    const list = await getContacts();
    return list.length;
}

export async function addContact(name, email, subject, message) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const receivedStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    if (dbMode === 'turso' && tursoClient) {
        const res = await tursoClient.execute({
            sql: 'INSERT INTO contacts (name, email, subject, message, received) VALUES (?, ?, ?, ?, ?)',
            args: [name, email, subject, message, receivedStr]
        });
        return Number(res.lastInsertRowid);
    }

    if (dbMode === 'sqlite' && sqliteDb) {
        const stmt = sqliteDb.prepare(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)'
        );
        const info = stmt.run(name, email, subject, message);
        return info.lastInsertRowid;
    }

    // JSON mode
    const contacts = await getContacts();
    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const newContact = {
        id: newId,
        name,
        email,
        subject,
        message,
        received: receivedStr
    };
    contacts.push(newContact);
    contacts.sort((a, b) => a.id - b.id);
    fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
    return newId;
}

export async function deleteContact(id) {
    const numericId = Number(id);
    if (dbMode === 'turso' && tursoClient) {
        await tursoClient.execute({
            sql: 'DELETE FROM contacts WHERE id = ?',
            args: [numericId]
        });
        return;
    }

    if (dbMode === 'sqlite' && sqliteDb) {
        sqliteDb.prepare('DELETE FROM contacts WHERE id = ?').run(numericId);
        return;
    }

    // JSON mode
    let contacts = await getContacts();
    contacts = contacts.filter(c => c.id !== numericId);
    contacts.sort((a, b) => a.id - b.id);
    fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
}

export function getDbMode() {
    return dbMode;
}
