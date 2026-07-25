import 'dotenv/config';
import { connectDB, createContact, logPageView, logResumeDownload, logCertView, logProjectClick } from './services/database.js';

async function seed() {
    console.log('🌱 Seeding sample telemetry and contact messages to MongoDB Atlas...');
    await connectDB();

    // 1. Seed Contact Messages
    await createContact({
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@techrecruiter.com',
        company: 'Google Talent Acquisition',
        subject: 'Full-Time Job',
        message: 'Hi Praveen, loved your Heart Predictor & AgriSense projects! Would love to schedule a interview for an AI Engineer role.',
        status: 'unread',
        starred: true,
        ipAddress: '103.24.12.5',
        browser: 'Chrome',
        device: 'Desktop'
    });

    await createContact({
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.k@vit.ac.in',
        company: 'Vellore Institute of Technology',
        subject: 'Collaboration',
        message: 'Hello Praveen, we are interested in collaborating on an AI research paper based on computer vision.',
        status: 'read',
        starred: false,
        ipAddress: '182.74.55.12',
        browser: 'Firefox',
        device: 'Desktop'
    });

    // 2. Seed Analytics Page Views
    await logPageView({ pageVisited: '/', browser: 'Chrome', device: 'Desktop', referrer: 'LinkedIn', visitorId: 'vis_001' });
    await logPageView({ pageVisited: '/#projects', browser: 'Safari', device: 'Mobile', referrer: 'GitHub', visitorId: 'vis_002' });
    await logPageView({ pageVisited: '/#contact', browser: 'Edge', device: 'Desktop', referrer: 'Google Search', visitorId: 'vis_003' });

    // 3. Seed Resume Downloads
    await logResumeDownload({ visitorId: 'vis_001', name: 'Sarah Jenkins', email: 'sarah@techrecruiter.com', action: 'download', browser: 'Chrome', device: 'Desktop' });
    await logResumeDownload({ visitorId: 'vis_004', name: 'Recruiter', email: '', action: 'view', browser: 'Safari', device: 'Mobile' });

    // 4. Seed Certificate Views
    await logCertView({ certificateName: 'Microsoft Certified: Azure AI Fundamentals', visitorId: 'vis_001', browser: 'Chrome', device: 'Desktop' });
    await logCertView({ certificateName: 'Infosys Springboard AI & ML Certification', visitorId: 'vis_002', browser: 'Firefox', device: 'Desktop' });

    // 5. Seed Project Clicks
    await logProjectClick({ projectName: 'Heart Predictor AI', clickType: 'github', visitorId: 'vis_001', browser: 'Chrome', device: 'Desktop' });
    await logProjectClick({ projectName: 'AgriSense - Smart Farming Platform', clickType: 'demo', visitorId: 'vis_002', browser: 'Safari', device: 'Mobile' });

    console.log('✅ Seeding complete! Check MongoDB Compass database "portfolio".');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
});
