import mongoose from 'mongoose';
import {
    ContactMessageSchema,
    PortfolioAnalyticsSchema,
    ResumeDownloadSchema,
    CertificateViewSchema,
    ProjectClickSchema
} from '../models/schemas.js';

// ── Connection URI ────────────────────────────────────────────────────────────
// MongoDB Compass URI: mongodb+srv://praveenkrisk1204_db_user:abTI94Wn0uTJ55kY@cluster0.7xcs791.mongodb.net/
const MONGODB_URI = process.env.MONGODB_URI
    || 'mongodb+srv://praveenkrisk1204_db_user:abTI94Wn0uTJ55kY@cluster0.7xcs791.mongodb.net/portfolio?retryWrites=true&w=majority';

let Models = {};
let isConnected = false;

export async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000
    });
    isConnected = true;
    Models.ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
    Models.PortfolioAnalytics = mongoose.models.PortfolioAnalytics || mongoose.model('PortfolioAnalytics', PortfolioAnalyticsSchema);
    Models.ResumeDownload = mongoose.models.ResumeDownload || mongoose.model('ResumeDownload', ResumeDownloadSchema);
    Models.CertificateView = mongoose.models.CertificateView || mongoose.model('CertificateView', CertificateViewSchema);
    Models.ProjectClick = mongoose.models.ProjectClick || mongoose.model('ProjectClick', ProjectClickSchema);
    console.log(`💾 MongoDB Atlas Connected → portfolio database`);
    console.log(`📦 Collections: ContactMessages · PortfolioAnalytics · ResumeDownloads · CertificateViews · ProjectClicks`);
}

function M(name) {
    if (!Models[name]) throw new Error(`DB not connected. Model "${name}" unavailable.`);
    return Models[name];
}

function fmt(d) {
    const date = new Date(d);
    const p = n => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())} ${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`;
}

// ── ContactMessage Operations ─────────────────────────────────────────────────
export async function createContact(data) {
    return await new (M('ContactMessage'))(data).save();
}

export async function listContacts(filters = {}) {
    const q = {};
    if (filters.status) q.status = filters.status;
    if (filters.subject) q.subject = new RegExp(filters.subject, 'i');
    if (filters.starred !== undefined) q.starred = String(filters.starred) === 'true';
    if (filters.search) {
        const r = new RegExp(filters.search, 'i');
        q.$or = [{ name: r }, { email: r }, { company: r }, { subject: r }, { message: r }];
    }
    const docs = await M('ContactMessage').find(q).sort({ createdAt: -1 }).limit(200).exec();
    return docs.map(c => ({
        id: c._id.toString(), name: c.name, email: c.email, phone: c.phone || '', company: c.company || '',
        subject: c.subject, message: c.message, status: c.status,
        isRead: c.isRead, isReplied: c.isReplied, starred: c.starred,
        ipAddress: c.ipAddress, country: c.country, browser: c.browser, device: c.device, os: c.os || '',
        referrer: c.referrer || '', createdAt: fmt(c.createdAt), updatedAt: fmt(c.updatedAt)
    }));
}

export async function getContact(id) {
    const c = await M('ContactMessage').findById(id).exec();
    if (!c) return null;
    return {
        id: c._id.toString(), name: c.name, email: c.email, phone: c.phone || '', company: c.company || '',
        subject: c.subject, message: c.message, status: c.status,
        isRead: c.isRead, isReplied: c.isReplied, starred: c.starred,
        ipAddress: c.ipAddress, country: c.country, browser: c.browser, device: c.device, os: c.os || '',
        referrer: c.referrer || '', createdAt: fmt(c.createdAt)
    };
}

export async function patchContact(id, updates) {
    if (updates.isRead !== undefined) {
        updates.status = updates.isReplied ? 'replied' : (updates.isRead ? 'read' : 'unread');
    }
    if (updates.isReplied) updates.status = 'replied';
    return await M('ContactMessage').findByIdAndUpdate(id, updates, { new: true }).exec();
}

export async function removeContact(id) {
    await M('ContactMessage').findByIdAndDelete(id).exec();
    return true;
}

// ── Analytics Operations ──────────────────────────────────────────────────────
export async function logPageView(data) { try { return await new (M('PortfolioAnalytics'))(data).save(); } catch { return null; } }
export async function logResumeDownload(data) { try { return await new (M('ResumeDownload'))(data).save(); } catch { return null; } }
export async function logCertView(data) { try { return await new (M('CertificateView'))(data).save(); } catch { return null; } }
export async function logProjectClick(data) { try { return await new (M('ProjectClick'))(data).save(); } catch { return null; } }

// ── Dashboard Metrics ─────────────────────────────────────────────────────────
export async function getDashboard() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const [
        totalMsg, todayMsg, unreadMsg, starredMsg,
        totalVisitors, todayVisitors,
        resumeTotal, certTotal, projTotal,
        recentMsgs, recentVisits, recentDLs
    ] = await Promise.all([
        M('ContactMessage').countDocuments(),
        M('ContactMessage').countDocuments({ createdAt: { $gte: today } }),
        M('ContactMessage').countDocuments({ isRead: false }),
        M('ContactMessage').countDocuments({ starred: true }),
        M('PortfolioAnalytics').countDocuments(),
        M('PortfolioAnalytics').countDocuments({ timestamp: { $gte: today } }),
        M('ResumeDownload').countDocuments(),
        M('CertificateView').countDocuments(),
        M('ProjectClick').countDocuments(),
        M('ContactMessage').find().sort({ createdAt: -1 }).limit(10),
        M('PortfolioAnalytics').find().sort({ timestamp: -1 }).limit(10),
        M('ResumeDownload').find().sort({ downloadTime: -1 }).limit(10)
    ]);

    return {
        cards: { totalMsg, todayMsg, unreadMsg, starredMsg, totalVisitors, todayVisitors, resumeTotal, certTotal, projTotal },
        recentMsgs: recentMsgs.map(c => ({
            id: c._id.toString(), name: c.name, email: c.email,
            subject: c.subject, company: c.company || '', isRead: c.isRead,
            starred: c.starred, status: c.status, createdAt: fmt(c.createdAt)
        })),
        recentVisits: recentVisits.map(v => ({
            id: v._id.toString(), page: v.pageVisited, browser: v.browser,
            device: v.device, referrer: v.referrer, time: fmt(v.timestamp)
        })),
        recentDLs: recentDLs.map(d => ({
            id: d._id.toString(), action: d.action,
            browser: d.browser, device: d.device, time: fmt(d.downloadTime)
        }))
    };
}
