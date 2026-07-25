import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// ── Read env at startup ──────────────────────────────────────────────────────
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'praveenkumark1204@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || 'praveenkumark1204@gmail.com';
const SMTP_PASS = (process.env.SMTP_PASS || '').trim();

console.log(`\n📧 Mailer Config Loaded:`);
console.log(`   OWNER_EMAIL: ${OWNER_EMAIL}`);
console.log(`   SMTP_USER:   ${SMTP_USER}`);
console.log(`   SMTP_PASS:   ${SMTP_PASS ? '✔ SET (' + SMTP_PASS.length + ' chars)' : '✘ NOT SET'}`);
console.log(`   RESEND_KEY:  ${RESEND_API_KEY ? '✔ SET' : '✘ NOT SET'}\n`);

function createTransporter() {
  if (!SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL TEMPLATE 1: OWNER NOTIFICATION (Dark SaaS Dashboard Theme)
// ══════════════════════════════════════════════════════════════════════════════
function ownerNotificationHtml({
  name, email, phone, company, subject, message,
  dateStr, ipAddress, browser, device, os, country, referrer, page
}) {
  const replyMailUrl = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`;
  const dashboardUrl = `https://praveenkumark-portfolio.vercel.app/api/viewer`;
  const safeMsg = (message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>🚀 New Portfolio Contact Request from ${name}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#060612;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(160deg,#060612 0%,#0d0a25 50%,#060612 100%);padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" style="max-width:660px;" cellspacing="0" cellpadding="0" border="0">

      <!-- ── HERO HEADER ─────────────────────────────────────────────────── -->
      <tr>
        <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 40%,#a855f7 70%,#ec4899 100%);border-radius:20px 20px 0 0;padding:40px 32px;text-align:center;">
          <div style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:5px 18px;font-size:11px;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;">PRAVEEN KUMAR PORTFOLIO</div>
          <div style="font-size:40px;margin-bottom:10px;">🚀</div>
          <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">New Contact Request</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:15px;font-weight:400;">Someone has contacted you through your portfolio</p>
        </td>
      </tr>

      <!-- ── MAIN CARD BODY ───────────────────────────────────────────────── -->
      <tr>
        <td style="background:rgba(13,10,37,0.97);border:1px solid rgba(124,58,237,0.3);border-top:none;border-radius:0 0 0 0;padding:32px 28px;">

          <!-- Visitor Details Header -->
          <div style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">👤 Visitor Details</div>

          <!-- Info Cards Grid (2 columns via table) -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
            <tr>
              <!-- Name Card -->
              <td width="48%" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:16px 18px;vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">👤 Full Name</div>
                <div style="font-size:16px;font-weight:700;color:#f8fafc;">${name}</div>
              </td>
              <td width="4%"></td>
              <!-- Email Card -->
              <td width="48%" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:16px 18px;vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">📧 Email Address</div>
                <div style="font-size:14px;font-weight:600;"><a href="mailto:${email}" style="color:#38bdf8;text-decoration:none;">${email}</a></div>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
            <tr>
              <!-- Company Card -->
              <td width="48%" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:16px 18px;vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">🏢 Company</div>
                <div style="font-size:15px;font-weight:600;color:#f8fafc;">${company || '<em style="color:#6b7280;font-style:italic;">Not Provided</em>'}</div>
              </td>
              <td width="4%"></td>
              <!-- Phone Card -->
              <td width="48%" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:16px 18px;vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">📞 Phone Number</div>
                <div style="font-size:15px;font-weight:600;color:#f8fafc;">${phone || '<em style="color:#6b7280;font-style:italic;">Not Provided</em>'}</div>
              </td>
            </tr>
          </table>

          <!-- Subject Card (Full Width) -->
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.08));border:1px solid rgba(168,85,247,0.35);border-radius:14px;padding:16px 20px;margin-bottom:20px;">
            <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">📌 Subject</div>
            <div style="font-size:17px;font-weight:700;color:#c084fc;">${subject}</div>
          </div>

          <!-- Message Card -->
          <div style="margin-bottom:28px;">
            <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">💬 Message</div>
            <div style="background:rgba(17,24,39,0.8);border-left:4px solid #7c3aed;border-radius:0 14px 14px 0;padding:20px 22px;font-size:14px;line-height:1.8;color:#e2e8f0;white-space:pre-wrap;word-break:break-word;">${safeMsg}</div>
          </div>

          <!-- Divider -->
          <div style="border-top:1px solid rgba(124,58,237,0.2);margin:28px 0;"></div>

          <!-- Analytics Section Header -->
          <div style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">📊 Portfolio Analytics</div>

          <!-- Analytics Cards Row 1 -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px;">
            <tr>
              <td width="22%" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:12px 14px;text-align:center;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:4px;">🌍</div>
                <div style="font-size:9px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Country</div>
                <div style="font-size:12px;font-weight:700;color:#f8fafc;">${country || 'India 🇮🇳'}</div>
              </td>
              <td width="2%"></td>
              <td width="22%" style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.25);border-radius:12px;padding:12px 14px;text-align:center;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:4px;">💻</div>
                <div style="font-size:9px;font-weight:700;color:#34d399;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Device</div>
                <div style="font-size:12px;font-weight:700;color:#f8fafc;">${device || 'Desktop'}</div>
              </td>
              <td width="2%"></td>
              <td width="22%" style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:12px;padding:12px 14px;text-align:center;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:4px;">🌐</div>
                <div style="font-size:9px;font-weight:700;color:#c084fc;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Browser</div>
                <div style="font-size:12px;font-weight:700;color:#f8fafc;">${browser || 'Chrome'}</div>
              </td>
              <td width="2%"></td>
              <td width="28%" style="background:rgba(236,72,153,0.08);border:1px solid rgba(236,72,153,0.25);border-radius:12px;padding:12px 14px;text-align:center;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:4px;">🖥</div>
                <div style="font-size:9px;font-weight:700;color:#f472b6;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">OS</div>
                <div style="font-size:12px;font-weight:700;color:#f8fafc;">${os || 'Windows'}</div>
              </td>
            </tr>
          </table>

          <!-- Analytics Cards Row 2 -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td width="48%" style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:12px;padding:12px 16px;vertical-align:top;">
                <div style="font-size:9px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">🕒 Submitted At</div>
                <div style="font-size:13px;font-weight:700;color:#f8fafc;">${dateStr}</div>
              </td>
              <td width="4%"></td>
              <td width="48%" style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:12px 16px;vertical-align:top;">
                <div style="font-size:9px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">🔗 Portfolio Page</div>
                <div style="font-size:13px;font-weight:700;color:#f8fafc;">${page || '/contact'}</div>
              </td>
            </tr>
          </table>

          <!-- IP Address Info -->
          <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px 16px;margin-bottom:28px;font-size:12px;color:#64748b;">
            <span style="color:#475569;">🔍 IP Address:</span>
            <code style="background:rgba(124,58,237,0.15);color:#a5f3fc;padding:2px 8px;border-radius:5px;font-size:11px;font-family:monospace;margin-left:6px;">${ipAddress}</code>
            &nbsp;·&nbsp;
            <span style="color:#475569;">Referrer:</span> <span style="color:#94a3b8;">${referrer || 'Direct'}</span>
          </div>

          <!-- Action Buttons -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width:100%;">
            <tr>
              <td style="padding:6px;" align="center">
                <a href="${replyMailUrl}" target="_blank"
                   style="background:linear-gradient(135deg,#7c3aed,#a855f7,#ec4899);border-radius:12px;color:#ffffff;display:inline-block;font-size:14px;font-weight:700;padding:14px 32px;text-decoration:none;box-shadow:0 4px 20px rgba(124,58,237,0.45);letter-spacing:0.3px;">
                  ✉️ Reply to Visitor
                </a>
              </td>
              <td style="padding:6px;" align="center">
                <a href="${dashboardUrl}" target="_blank"
                   style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);border-radius:12px;color:#e2e8f0;display:inline-block;font-size:14px;font-weight:700;padding:14px 28px;text-decoration:none;">
                  📊 Open Portfolio Dashboard
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- ── FOOTER ─────────────────────────────────────────────────────────── -->
      <tr>
        <td style="background:#0a0a1a;border:1px solid rgba(124,58,237,0.2);border-top:none;border-radius:0 0 20px 20px;padding:20px 28px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#4b5563;">Generated automatically by your Portfolio Website</p>
          <p style="margin:0;font-size:11px;color:#374151;font-weight:600;letter-spacing:0.5px;">Portfolio Contact Notification System · Praveen Kumar K</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL TEMPLATE 2: VISITOR CONFIRMATION (Premium Dark Gradient Theme)
// ══════════════════════════════════════════════════════════════════════════════
function visitorConfirmationHtml({ name, subject }) {
  const portfolioUrl = 'https://praveenkumar-portfolio.vercel.app';
  const githubUrl = 'https://github.com/Praveenofficial12';
  const linkedinUrl = 'https://linkedin.com/in/praveen-kumar-k-developer';
  const resumeUrl = 'https://praveenkumar-portfolio.vercel.app/resume.pdf';

  const skills = [
    { icon: '🤖', name: 'Artificial Intelligence' },
    { icon: '🧠', name: 'Machine Learning' },
    { icon: '📊', name: 'Data Science' },
    { icon: '🐍', name: 'Python' },
    { icon: '⚛️', name: 'React' },
    { icon: '⚡', name: 'FastAPI' },
    { icon: '🎨', name: 'UI/UX Design' },
  ];

  const skillBadges = skills.map(s =>
    `<span style="display:inline-block;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.35);color:#c084fc;padding:5px 12px;border-radius:999px;font-size:12px;font-weight:600;margin:3px;">${s.icon} ${s.name}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Thank You for Contacting Me 🚀</title>
</head>
<body style="margin:0;padding:0;background-color:#060612;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(160deg,#060612 0%,#0d0a25 50%,#060612 100%);padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" style="max-width:640px;" cellspacing="0" cellpadding="0" border="0">

      <!-- ── HERO HEADER ─────────────────────────────────────────────────── -->
      <tr>
        <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 40%,#a855f7 75%,#ec4899 100%);border-radius:20px 20px 0 0;padding:50px 32px 42px;text-align:center;position:relative;">
          <!-- Top badge -->
          <div style="display:inline-block;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);border-radius:999px;padding:5px 18px;font-size:11px;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;">MESSAGE RECEIVED ✓</div>
          <!-- Large emoji hero -->
          <div style="font-size:56px;margin-bottom:14px;line-height:1;">🚀</div>
          <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:800;letter-spacing:-1px;line-height:1.2;">Thank You!</h1>
          <p style="margin:12px 0 0;color:rgba(255,255,255,0.92);font-size:16px;font-weight:400;">Your message has been received successfully.</p>
          <!-- Decorative stars -->
          <div style="margin-top:22px;font-size:18px;opacity:0.6;">✨ &nbsp; ⭐ &nbsp; ✨ &nbsp; ⭐ &nbsp; ✨</div>
        </td>
      </tr>

      <!-- ── GLASSMORPHISM MAIN BODY ──────────────────────────────────────── -->
      <tr>
        <td style="background:rgba(13,10,37,0.97);border:1px solid rgba(124,58,237,0.3);border-top:none;padding:36px 30px;">

          <!-- Greeting -->
          <h2 style="margin:0 0 18px;font-size:20px;font-weight:700;color:#f8fafc;">Hello ${name},</h2>

          <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#cbd5e1;">
            Thank you for contacting me through my portfolio.<br/>
            I truly appreciate your interest.
          </p>

          <!-- Subject Highlight Card -->
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.08));border:1px solid rgba(168,85,247,0.4);border-radius:14px;padding:16px 20px;margin:20px 0;">
            <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">📌 Your Message Subject</div>
            <div style="font-size:15px;font-weight:700;color:#c084fc;">"${subject || 'Portfolio Inquiry'}"</div>
          </div>

          <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#cbd5e1;">
            I carefully review every message personally.<br/>
            You can expect a response within the next <strong style="color:#a78bfa;">24 hours</strong>.
          </p>

          <!-- Progress Timeline Card -->
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:22px 20px;margin:24px 0;">
            <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">📍 Submission Progress</div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="width:30%;text-align:center;padding:12px 8px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);border-radius:12px;">
                  <div style="font-size:20px;">✅</div>
                  <div style="font-size:11px;font-weight:700;color:#34d399;margin-top:4px;">Submitted</div>
                </td>
                <td style="text-align:center;color:#374151;font-size:18px;font-weight:700;">→</td>
                <td style="width:30%;text-align:center;padding:12px 8px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:12px;">
                  <div style="font-size:20px;">🔍</div>
                  <div style="font-size:11px;font-weight:700;color:#c084fc;margin-top:4px;">In Review</div>
                </td>
                <td style="text-align:center;color:#374151;font-size:18px;font-weight:700;">→</td>
                <td style="width:30%;text-align:center;padding:12px 8px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:12px;">
                  <div style="font-size:20px;">⚡</div>
                  <div style="font-size:11px;font-weight:700;color:#60a5fa;margin-top:4px;">Reply &lt;24h</div>
                </td>
              </tr>
            </table>
          </div>

          <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#cbd5e1;">
            Meanwhile, feel free to explore my latest work.
          </p>

          <!-- Skills Card -->
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(124,58,237,0.2);border-radius:16px;padding:20px 18px;margin-bottom:24px;">
            <div style="font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">⚡ My Skills</div>
            <div style="text-align:center;line-height:1.9;">
              ${skillBadges}
            </div>
          </div>

          <!-- Divider -->
          <div style="border-top:1px solid rgba(124,58,237,0.15);margin:24px 0;"></div>

          <!-- Action Buttons Grid -->
          <div style="text-align:center;margin-bottom:24px;">
            <div style="margin-bottom:10px;">
              <a href="${portfolioUrl}" target="_blank"
                 style="background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:12px;color:#ffffff;display:inline-block;font-size:13px;font-weight:700;padding:12px 24px;text-decoration:none;margin:4px;box-shadow:0 4px 16px rgba(124,58,237,0.4);">
                🌐 Visit Portfolio
              </a>
              <a href="${resumeUrl}" target="_blank"
                 style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:12px;color:#f1f5f9;display:inline-block;font-size:13px;font-weight:700;padding:12px 22px;text-decoration:none;margin:4px;">
                📄 Download Resume
              </a>
            </div>
            <div>
              <a href="${githubUrl}" target="_blank"
                 style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:12px;color:#f1f5f9;display:inline-block;font-size:13px;font-weight:700;padding:12px 22px;text-decoration:none;margin:4px;">
                💻 GitHub
              </a>
              <a href="${linkedinUrl}" target="_blank"
                 style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:12px;color:#f1f5f9;display:inline-block;font-size:13px;font-weight:700;padding:12px 22px;text-decoration:none;margin:4px;">
                🔗 LinkedIn
              </a>
              <a href="${portfolioUrl}/#contact" target="_blank"
                 style="background:rgba(236,72,153,0.12);border:1px solid rgba(236,72,153,0.3);border-radius:12px;color:#f472b6;display:inline-block;font-size:13px;font-weight:700;padding:12px 22px;text-decoration:none;margin:4px;">
                💬 Contact Again
              </a>
            </div>
          </div>

          <!-- Signature -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:22px;margin-top:8px;">
            <p style="margin:0 0 6px;font-size:14px;color:#94a3b8;">Thank you for visiting my portfolio.</p>
            <p style="margin:0 0 4px;font-size:14px;color:#94a3b8;">Looking forward to connecting with you.</p>
            <p style="margin:16px 0 2px;font-size:14px;color:#94a3b8;font-style:italic;">Best Regards,</p>
            <p style="margin:0;font-size:20px;font-weight:800;color:#f8fafc;">Praveen Kumar K</p>
            <p style="margin:4px 0 0;font-size:13px;font-weight:700;color:#c084fc;">AI Engineer</p>
          </div>

        </td>
      </tr>

      <!-- ── FOOTER ─────────────────────────────────────────────────────────── -->
      <tr>
        <td style="background:#0a0a1a;border:1px solid rgba(124,58,237,0.2);border-top:none;border-radius:0 0 20px 20px;padding:20px 28px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Thanks for visiting. Have an amazing day 🚀</p>
          <p style="margin:0;font-size:11px;color:#374151;">Praveen Kumar K · AI Engineer · Karur, Tamil Nadu, India</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EMAIL DISPATCHER with Resend Primary + Nodemailer SMTP Fallback
// ══════════════════════════════════════════════════════════════════════════════
export async function sendContactEmails(data) {
  const {
    name, email, phone, company, subject, message, dateStr,
    ipAddress, browser, device, os, country, referrer, page
  } = data;

  const ownerHtml = ownerNotificationHtml({
    name, email, phone, company, subject, message,
    dateStr, ipAddress, browser, device, os, country, referrer, page
  });

  const visitorHtml = visitorConfirmationHtml({ name, subject });

  let ownerSent = false;
  let visitorSent = false;

  // ── 1. RESEND API (Primary Provider) ────────────────────────────────────
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);

      // Owner notification
      const ownerResult = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: OWNER_EMAIL,
        subject: `🚀 New Portfolio Contact Request from ${name}`,
        html: ownerHtml
      });

      if (!ownerResult.error) {
        ownerSent = true;
        console.log(`✅ Owner notification delivered to ${OWNER_EMAIL} via Resend API`);
      } else {
        console.warn(`⚠️ Resend owner send error:`, ownerResult.error);
      }

      // Visitor confirmation (Resend only allows sending to owner email on free plan;
      // if visitor email ≠ owner email it may bounce on free tier — handled gracefully)
      try {
        const visitorResult = await resend.emails.send({
          from: 'Praveen Kumar <onboarding@resend.dev>',
          to: email,
          subject: `Thank You for Contacting Me 🚀`,
          html: visitorHtml
        });
        if (!visitorResult.error) {
          visitorSent = true;
          console.log(`✅ Visitor confirmation sent to ${email} via Resend API`);
        } else {
          console.warn(`⚠️ Resend visitor send note:`, visitorResult.error?.message);
        }
      } catch (vErr) {
        console.warn(`⚠️ Visitor email note (Resend domain restriction): ${vErr.message}`);
      }

      if (ownerSent) {
        return { ownerSent, visitorSent, provider: 'Resend API' };
      }
    } catch (err) {
      console.warn('⚠️ Resend failed, attempting SMTP fallback:', err.message);
    }
  }

  // ── 2. NODEMAILER SMTP (Fallback Provider) ───────────────────────────────
  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${SMTP_USER}>`,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `🚀 New Portfolio Contact Request from ${name}`,
        html: ownerHtml
      });
      ownerSent = true;
      console.log(`✅ Owner notification delivered to ${OWNER_EMAIL} via Nodemailer SMTP`);

      try {
        await transporter.sendMail({
          from: `"Praveen Kumar" <${SMTP_USER}>`,
          to: email,
          subject: `Thank You for Contacting Me 🚀`,
          html: visitorHtml
        });
        visitorSent = true;
        console.log(`✅ Visitor confirmation sent to ${email} via Nodemailer SMTP`);
      } catch (vErr) {
        console.warn(`⚠️ Visitor confirmation note: ${vErr.message}`);
      }

      return { ownerSent, visitorSent, provider: 'Nodemailer SMTP' };
    } catch (err) {
      console.error('❌ SMTP dispatch error:', err.message);
    }
  }

  // ── 3. Console fallback when no credentials active ───────────────────────
  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`📩 Contact from: ${name} <${email}>`);
  console.log(`📌 Subject: ${subject}`);
  console.log(`🎯 Owner: ${OWNER_EMAIL}`);
  console.log(`→ Add RESEND_API_KEY or SMTP_PASS to .env for delivery`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  return { ownerSent: false, visitorSent: false, provider: 'Console / DB Log' };
}
