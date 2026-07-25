import express from 'express';
import {
    createContact, listContacts, getContact,
    patchContact, removeContact
} from '../services/database.js';
import { sendContactEmails } from '../services/mailer.js';

const router = express.Router();

// ── Rate Limiter (5 submissions per IP per 15 min) ───────────────────────────
const rateLimits = new Map();
function rateLimit(req, res, next) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '::1';
    const now = Date.now();
    const hits = (rateLimits.get(ip) || []).filter(t => now - t < 15 * 60 * 1000);
    if (hits.length >= 5) {
        return res.status(429).json({ error: 'Too many requests. Please wait 15 minutes and try again.' });
    }
    hits.push(now);
    rateLimits.set(ip, hits);
    next();
}

// ── Client Metadata Extractor ─────────────────────────────────────────────────
function detectClientMeta(req) {
    const ua = req.headers['user-agent'] || 'Unknown';
    let ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';
    if (ip === '::1' || ip === '::ffff:127.0.0.1') ip = '127.0.0.1 (Local Dev)';

    const device = /Mobile|Android|iPhone|iPod/i.test(ua) ? 'Mobile' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Desktop';

    let browser = 'Unknown Browser';
    if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Apple Safari';
    else if (ua.includes('Opera') || ua.includes('OPR/')) browser = 'Opera';

    let os = 'Unknown OS';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    const country = req.headers['x-vercel-ip-country'] || req.headers['cf-ipcountry'] || 'India 🇮🇳';
    const referrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';

    return { ua, ip, device, browser, os, country, referrer };
}

// ── Input Sanitizer (XSS / injection protection) ─────────────────────────────
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '').slice(0, 5000);
}

// ── POST /api/contact — Submit contact form ───────────────────────────────────
router.post('/', rateLimit, async (req, res) => {
    const {
        name, email, phone, company, subject, message,
        botcheck, page
    } = req.body;

    // Honeypot spam guard
    if (botcheck) return res.status(400).json({ error: 'Spam detected.' });

    // Required field validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email, and Message are required.' });
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address format.' });
    }

    // Sanitize all inputs
    const safeName = sanitize(name);
    const safeEmail = sanitize(email).toLowerCase();
    const safePhone = sanitize(phone || '');
    const safeCompany = sanitize(company || '');
    const safeSubject = sanitize(subject || `Portfolio Inquiry from ${name}`);
    const safeMessage = sanitize(message);
    const safePage = sanitize(page || '/contact');

    const meta = detectClientMeta(req);
    const dateStr = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium'
    });

    const contactPayload = {
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        company: safeCompany || 'Not Provided',
        subject: safeSubject,
        message: safeMessage,
        ipAddress: meta.ip,
        country: meta.country,
        browser: meta.browser,
        device: meta.device,
        os: meta.os,
        referrer: meta.referrer,
    };

    try {
        // 1. Store in MongoDB (message is never lost even if email fails)
        const doc = await createContact(contactPayload);

        // 2. Dispatch emails asynchronously (non-blocking for faster response)
        // We still await it to include the email status in the response
        let emailResult = { ownerSent: false, visitorSent: false, provider: 'Skipped' };
        try {
            emailResult = await sendContactEmails({
                ...contactPayload,
                dateStr,
                page: safePage,
                id: doc._id.toString()
            });
        } catch (emailErr) {
            // Email failure must NOT lose the contact — already stored in DB
            console.error('Email dispatch error (contact safely stored):', emailErr.message);
        }

        return res.status(201).json({
            success: true,
            id: doc._id.toString(),
            message: 'Message received! Emails dispatched.',
            emailStatus: emailResult
        });

    } catch (err) {
        console.error('Contact Route Error:', err.message);
        return res.status(500).json({ error: err.message || 'Failed to process contact form.' });
    }
});

// ── GET /api/contact — List messages with optional filters ───────────────────
router.get('/', async (req, res) => {
    try {
        const messages = await listContacts(req.query);
        res.json({ messages, total: messages.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── GET /api/contact/:id — Get single message ────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const msg = await getContact(req.params.id);
        if (!msg) return res.status(404).json({ error: 'Message not found.' });
        // Auto-mark as read when fetched
        if (!msg.isRead) {
            await patchContact(req.params.id, { isRead: true });
        }
        res.json(msg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── PATCH /api/contact/:id — Update (star, read, notes, status) ──────────────
router.patch('/:id', async (req, res) => {
    try {
        const updated = await patchContact(req.params.id, req.body);
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── DELETE /api/contact/:id — Permanently delete message ─────────────────────
router.delete('/:id', async (req, res) => {
    try {
        await removeContact(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
