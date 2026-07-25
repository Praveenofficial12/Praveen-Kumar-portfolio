import mongoose from 'mongoose';

// ── ContactMessages (Essential Fields Only) ───────────────────────────────────
export const ContactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['unread', 'read', 'replied', 'archived'], default: 'unread' },
    ipAddress: { type: String, default: 'Anonymous' },
    country: { type: String, default: 'India' },
    browser: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Desktop' },
    os: { type: String, default: 'Unknown' },
    referrer: { type: String, default: 'Direct' },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
}, { timestamps: true });

// ── PortfolioAnalytics ─────────────────────────────────────────────────────────
export const PortfolioAnalyticsSchema = new mongoose.Schema({
    pageVisited: { type: String, default: '/' },
    country: { type: String, default: 'India' },
    device: { type: String, default: 'Desktop' },
    browser: { type: String, default: 'Unknown' },
    referrer: { type: String, default: 'Direct' },
    timestamp: { type: Date, default: Date.now }
});

// ── ResumeDownloads ────────────────────────────────────────────────────────────
export const ResumeDownloadSchema = new mongoose.Schema({
    action: { type: String, default: 'download' }, // 'download' | 'view'
    browser: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Desktop' },
    country: { type: String, default: 'India' },
    downloadTime: { type: Date, default: Date.now }
});

// ── CertificateViews ───────────────────────────────────────────────────────────
export const CertificateViewSchema = new mongoose.Schema({
    certificateName: { type: String, required: true },
    browser: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Desktop' },
    viewedAt: { type: Date, default: Date.now }
});

// ── ProjectClicks ──────────────────────────────────────────────────────────────
export const ProjectClickSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    clickType: { type: String, default: 'card' }, // 'card' | 'github' | 'demo'
    browser: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Desktop' },
    clickedAt: { type: Date, default: Date.now }
});
