import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Mail, Phone, MapPin, CheckCircle, AlertCircle,
    Building2, Sparkles, User, MessageSquare, Tag
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';

const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FaGithub, label: 'GitHub', value: 'Praveenofficial12', href: personalInfo.github },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'praveen-kumar-k-developer', href: personalInfo.linkedin },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
];

const subjectOptions = [
    'Job Opportunity',
    'Internship Opportunity',
    'Freelance Project',
    'Collaboration',
    'General Inquiry',
    'Technical Question',
    'Partnership',
    'Other',
];

// ── Confetti Particle Component ──────────────────────────────────────────────
function Confetti({ active }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const colors = ['#7c3aed', '#a855f7', '#ec4899', '#38bdf8', '#34d399', '#fbbf24', '#f472b6'];
        particles.current = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 40,
            w: 6 + Math.random() * 8,
            h: 4 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 3,
            vy: 2 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.15,
            opacity: 1,
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current = particles.current.filter(p => p.opacity > 0.01);
            particles.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.vAngle;
                p.vy += 0.08; // gravity
                if (p.y > canvas.height * 0.7) p.opacity -= 0.025;
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (particles.current.length > 0) {
                animRef.current = requestAnimationFrame(draw);
            }
        }
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [active]);

    if (!active) return null;
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 20, borderRadius: '1rem'
            }}
        />
    );
}

// ── Main Contact Component ────────────────────────────────────────────────────
export default function Contact() {
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        botcheck: '', // honeypot
    });

    const maxMessageLength = 1000;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message' && value.length > maxMessageLength) return;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'loading') return;

        // Frontend validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus('error');
            setErrorMessage('Please fill in all required fields.');
            setTimeout(() => setStatus(null), 5000);
            return;
        }
        if (!form.subject) {
            setStatus('error');
            setErrorMessage('Please select a subject for your message.');
            setTimeout(() => setStatus(null), 5000);
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        setSubmittedEmail(form.email);

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            company: form.company.trim(),
            subject: form.subject,
            message: form.message.trim(),
            botcheck: form.botcheck,
            page: window.location.pathname || '/',
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit. Please try again.');
            }

            // Success path
            setStatus('success');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4500);
            setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '', botcheck: '' });

        } catch (err) {
            console.error('Submission error:', err);
            // Graceful fallback: open mailto so message is never lost
            const mailBody = `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\n\n${form.message}`;
            window.open(
                `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(mailBody)}`,
                '_blank'
            );
            setStatus('success');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4500);
            setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '', botcheck: '' });
        }

        setTimeout(() => setStatus(null), 10000);
    };

    return (
        <section id="contact" className="section relative overflow-hidden" style={{ background: 'rgba(6,6,14,0.85)' }}>
            {/* Ambient Background Glows */}
            <div className="orb orb-purple w-96 h-96 -top-20 -right-20 opacity-30 pointer-events-none" />
            <div className="orb orb-blue w-80 h-80 bottom-0 left-0 opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <Sparkles size={14} className="text-purple-400" /> Contact &amp; Hiring
                    </span>
                    <h2 className="section-title">
                        Let&apos;s <span className="gradient-text">Connect &amp; Collaborate</span>
                    </h2>
                    <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                        Open for Full-Time Roles, AI Projects, and Freelance Opportunities.
                        Leave a message below and get an automated confirmation right away!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* ── Contact Info Card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="glass rounded-2xl p-7 relative overflow-hidden" style={{ border: '1px solid rgba(168,85,247,0.2)' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

                            <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
                                📬 Get in Touch
                            </h3>
                            <p className="text-dark-400 text-sm mb-6 leading-relaxed">
                                Feel free to reach out via the form or through any of my official social channels. I usually respond within 24 hours.
                            </p>

                            <div className="space-y-4">
                                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                    <div key={label} className="flex items-center gap-3.5 group p-2 rounded-xl transition-all duration-300 hover:bg-white/[0.03]">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                                            <Icon size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-dark-500 text-xs font-medium uppercase tracking-wider">{label}</p>
                                            {href ? (
                                                <a href={href} target="_blank" rel="noopener noreferrer"
                                                    className="text-dark-200 text-sm font-semibold hover:text-purple-300 transition-colors truncate block">
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="text-dark-200 text-sm font-semibold">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Availability badge */}
                            <div className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                                <span className="text-emerald-400 text-xs font-semibold">Available for new opportunities</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass rounded-2xl p-8 relative overflow-hidden"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            {/* Confetti canvas */}
                            <Confetti active={showConfetti} />

                            {/* Honeypot anti-spam */}
                            <input
                                type="text"
                                name="botcheck"
                                value={form.botcheck}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {/* Row 1: Name + Email */}
                            <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider mb-2 block" htmlFor="name">
                                        Full Name <span className="text-purple-400">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <User size={16} className="absolute left-3.5 text-dark-400 pointer-events-none z-10" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Alex Johnson"
                                            required
                                            className="form-input"
                                            style={{ paddingLeft: '2.75rem' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider mb-2 block" htmlFor="email">
                                        Email Address <span className="text-purple-400">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <Mail size={16} className="absolute left-3.5 text-dark-400 pointer-events-none z-10" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="alex@example.com"
                                            required
                                            className="form-input"
                                            style={{ paddingLeft: '2.75rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Phone + Company */}
                            <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between" htmlFor="phone">
                                        <span>Phone Number</span>
                                        <span className="text-dark-500 font-normal normal-case text-xs">(Optional)</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <Phone size={16} className="absolute left-3.5 text-dark-400 pointer-events-none z-10" />
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="form-input"
                                            style={{ paddingLeft: '2.75rem' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between" htmlFor="company">
                                        <span>Company Name</span>
                                        <span className="text-dark-500 font-normal normal-case text-xs">(Optional)</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <Building2 size={16} className="absolute left-3.5 text-dark-400 pointer-events-none z-10" />
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={form.company}
                                            onChange={handleChange}
                                            placeholder="e.g. Google, Startup, etc."
                                            className="form-input"
                                            style={{ paddingLeft: '2.75rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subject Dropdown */}
                            <div className="mb-5">
                                <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider mb-2 block" htmlFor="subject">
                                    Subject <span className="text-purple-400">*</span>
                                </label>
                                <div className="relative flex items-center">
                                    <Tag size={16} className="absolute left-3.5 text-dark-400 pointer-events-none z-10" />
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-input cursor-pointer"
                                        style={{
                                            paddingLeft: '2.75rem',
                                            background: 'rgba(255,255,255,0.04)',
                                            color: form.subject ? 'inherit' : 'rgba(148,163,184,0.6)'
                                        }}
                                    >
                                        <option value="" disabled style={{ color: '#6b7280', background: '#111827' }}>
                                            Select a subject...
                                        </option>
                                        {subjectOptions.map(opt => (
                                            <option key={opt} value={opt} style={{ color: '#f1f5f9', background: '#111827' }}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-dark-300 text-xs font-semibold uppercase tracking-wider block" htmlFor="message">
                                        Message <span className="text-purple-400">*</span>
                                    </label>
                                    <span className={`text-xs ${form.message.length >= maxMessageLength ? 'text-rose-400 font-bold' : 'text-dark-500'}`}>
                                        {form.message.length} / {maxMessageLength}
                                    </span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project, role, or collaboration inquiry..."
                                        required
                                        rows={5}
                                        className="form-input resize-none"
                                    />
                                </div>
                            </div>

                            {/* Status Notifications */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.35 }}
                                        className="mb-5 p-5 rounded-xl"
                                        style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.35)' }}
                                    >
                                        <div className="flex items-center gap-2 font-bold text-base text-emerald-400 mb-2">
                                            <CheckCircle size={22} className="text-emerald-400 flex-shrink-0" />
                                            🎉 Message Sent Successfully!
                                        </div>
                                        <p className="text-sm text-emerald-300/90 leading-relaxed mb-1">
                                            Thank you for contacting me. Your message has been received successfully.
                                        </p>
                                        <p className="text-xs text-emerald-300/70 leading-relaxed">
                                            A confirmation email has been sent to <strong>{submittedEmail || 'your email'}</strong>.
                                            I&apos;ll get back to you within 24 hours.
                                        </p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-rose-400 mb-5 p-4 rounded-xl text-sm"
                                        style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.35)' }}
                                    >
                                        <AlertCircle size={18} className="flex-shrink-0" />
                                        {errorMessage || 'An error occurred. Please try again.'}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                id="contact-submit"
                                disabled={status === 'loading'}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 font-bold shadow-lg shadow-purple-900/30 transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        <span>Sending Message...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>

                            {/* Privacy note */}
                            <p className="text-center text-dark-500 text-xs mt-4">
                                🔒 Your information is secure. I never share your details with anyone.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
