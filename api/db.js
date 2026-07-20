import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db = null;
let isSqlite = false;

const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
// On Vercel, write sqlite/json to /tmp. Locally, write to project root.
const dbDir = isVercel ? '/tmp' : path.join(__dirname, '..');
const sqlitePath = path.join(dbDir, 'contacts.db');
const jsonPath = path.join(dbDir, 'contacts.json');

export async function init() {
    if (db || isSqlite) return;
    try {
        const Database = (await import('better-sqlite3')).default;
        db = new Database(sqlitePath);
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
        isSqlite = true;
        console.log(`💾 Connected to SQLite Database at ${sqlitePath}`);
    } catch (error) {
        console.warn('⚠️ better-sqlite3 failed to load. Falling back to JSON database.', error.message);
        isSqlite = false;
        if (!fs.existsSync(jsonPath)) {
            fs.writeFileSync(jsonPath, JSON.stringify([], null, 2));
        }
        console.log(`💾 Connected to JSON Database at ${jsonPath}`);
    }
}

export function getContacts() {
    if (isSqlite && db) {
        return db.prepare('SELECT * FROM contacts ORDER BY id DESC').all();
    } else {
        try {
            const content = fs.readFileSync(jsonPath, 'utf8');
            const list = JSON.parse(content || '[]');
            return [...list].sort((a, b) => b.id - a.id);
        } catch (e) {
            return [];
        }
    }
}

export function getTotalCount() {
    if (isSqlite && db) {
        const res = db.prepare('SELECT COUNT(*) as cnt FROM contacts').get();
        return res ? res.cnt : 0;
    } else {
        return getContacts().length;
    }
}

export function addContact(name, email, subject, message) {
    if (isSqlite && db) {
        const stmt = db.prepare(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)'
        );
        const info = stmt.run(name, email, subject, message);
        return info.lastInsertRowid;
    } else {
        const contacts = getContacts();
        const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
        // Format timestamp like SQLite (YYYY-MM-DD HH:MM:SS)
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const receivedStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        const newContact = {
            id: newId,
            name,
            email,
            subject,
            message,
            received: receivedStr
        };
        contacts.push(newContact);
        // Write back sorted by id ASC
        contacts.sort((a, b) => a.id - b.id);
        fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
        return newId;
    }
}

export function deleteContact(id) {
    const numericId = Number(id);
    if (isSqlite && db) {
        db.prepare('DELETE FROM contacts WHERE id = ?').run(numericId);
    } else {
        let contacts = getContacts();
        contacts = contacts.filter(c => c.id !== numericId);
        contacts.sort((a, b) => a.id - b.id);
        fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2));
    }
}
