import express from 'express';
import { logPageView, logResumeDownload, logCertView, logProjectClick, getDashboard } from '../services/database.js';

const router = express.Router();

function clientMeta(req) {
    const ua = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'Anonymous';
    const device = /Mobile|Android|iPhone|iPad/.test(ua) ? 'Mobile' : 'Desktop';
    const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : 'Browser';
    return { ua, ip, device, browser };
}

// POST /api/analytics/pageview
router.post('/pageview', async (req, res) => {
    const { pageVisited, referrer, visitorId, sessionId } = req.body || {};
    const { device, browser } = clientMeta(req);
    try {
        await logPageView({ pageVisited: pageVisited || '/', referrer: referrer || 'Direct', device, browser, visitorId: visitorId || '', sessionId: sessionId || '' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/analytics/resume-download
router.post('/resume-download', async (req, res) => {
    const { visitorId, name, email, action } = req.body || {};
    const { device, browser } = clientMeta(req);
    try {
        await logResumeDownload({ visitorId: visitorId || '', name: name || '', email: email || '', action: action || 'download', browser, device });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/analytics/certificate-view
router.post('/certificate-view', async (req, res) => {
    const { certificateName, visitorId } = req.body || {};
    const { device, browser } = clientMeta(req);
    try {
        await logCertView({ certificateName: certificateName || 'Unknown', visitorId: visitorId || '', browser, device });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/analytics/project-click
router.post('/project-click', async (req, res) => {
    const { projectName, clickType, visitorId } = req.body || {};
    const { device, browser } = clientMeta(req);
    try {
        await logProjectClick({ projectName: projectName || 'Unknown', clickType: clickType || 'card', visitorId: visitorId || '', browser, device });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/analytics/dashboard — JSON metrics
router.get('/dashboard', async (req, res) => {
    try {
        res.json(await getDashboard());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
