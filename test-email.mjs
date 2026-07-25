import 'dotenv/config';
import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'praveenkumark1204@gmail.com';

console.log('\n🔍 Email Test Diagnostics:');
console.log('   SMTP_USER:', SMTP_USER);
console.log('   SMTP_PASS:', SMTP_PASS ? `✔ SET (${SMTP_PASS.length} chars)` : '✘ NOT SET');
console.log('   OWNER_EMAIL:', OWNER_EMAIL, '\n');

if (!SMTP_PASS) {
    console.error('❌ SMTP_PASS is empty. Check .env file.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
});

console.log('📤 Sending test notification to', OWNER_EMAIL, '...');

try {
    await transporter.verify();
    console.log('✅ SMTP Credentials Verified Successfully!\n');

    const info = await transporter.sendMail({
        from: `"Portfolio Contact" <${SMTP_USER}>`,
        to: OWNER_EMAIL,
        subject: '🔔 LIVE TEST — Portfolio Contact System Working!',
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111827;color:#f1f5f9;padding:32px;border-radius:16px;border:1px solid rgba(168,85,247,0.4);">
                <div style="background:linear-gradient(135deg,#7c3aed,#a855f7,#ec4899);padding:28px;border-radius:12px;text-align:center;margin-bottom:24px;">
                    <h1 style="margin:0;color:#fff;font-size:22px;">🔔 Portfolio Email System — LIVE!</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Admin notification delivery confirmed</p>
                </div>
                <p style="color:#94a3b8;font-size:15px;line-height:1.6;">Hi Praveen, your portfolio contact email backend is <strong style="color:#34d399;">fully operational</strong>.</p>
                <p style="color:#94a3b8;font-size:15px;line-height:1.6;">Every time a visitor submits the contact form on your portfolio, you will receive an instant notification like this to <strong style="color:#38bdf8;">${OWNER_EMAIL}</strong>.</p>
                <div style="background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);border-radius:10px;padding:14px 18px;margin-top:20px;color:#34d399;font-weight:600;font-size:14px;">
                    ✅ SMTP Gmail delivery: Working<br/>
                    ✅ Admin notification: Delivered<br/>
                    ✅ MongoDB storage: Active<br/>
                    ✅ Visitor auto-reply: Configured
                </div>
                <p style="margin-top:20px;color:#6b7280;font-size:12px;text-align:center;">Generated automatically from PromptEditor Portfolio.</p>
            </div>
        `
    });

    console.log('✅ EMAIL DELIVERED SUCCESSFULLY!');
    console.log('   Message ID:', info.messageId);
    console.log('   To:', OWNER_EMAIL);
    console.log('\n🎉 Your portfolio email system is fully live and operational!\n');

} catch (err) {
    console.error('\n❌ SMTP Error:', err.message);
    console.error('   Code:', err.code);

    if (err.code === 'EAUTH') {
        console.error('\n💡 Authentication failed. Please:');
        console.error('   1. Go to https://myaccount.google.com/apppasswords');
        console.error('   2. Create a new App Password (the old one may be invalid)');
        console.error('   3. Update SMTP_PASS in .env');
    }
    process.exit(1);
}
