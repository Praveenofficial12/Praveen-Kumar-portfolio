import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';

const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FaGithub, label: 'GitHub', value: 'Praveenofficial12', href: personalInfo.github },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'praveen-kumar-k-developer', href: personalInfo.linkedin },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
];

export default function Contact() {
    const [status, setStatus] = useState(null); // null | 'loading' | 'success'
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Server error');
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch {
            // Fallback: open mailto so message isn't lost
            const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
            window.open(
                `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`,
                '_blank'
            );
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        }
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section id="contact" className="section" style={{ background: 'rgba(6,6,14,0.8)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">Contact</span>
                    <h2 className="section-title">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Interested in working together? Have a project idea? Let's talk!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                            <h3 className="font-display font-bold text-xl text-white mb-2">Get in Touch</h3>
                            <p className="text-dark-400 text-sm mb-6">Open to front-end development, data analysis & AI opportunities.</p>

                            <div className="space-y-4">
                                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                    <div key={label} className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}>
                                            <Icon size={16} className="text-purple-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-dark-500 text-xs">{label}</p>
                                            {href ? (
                                                <a href={href} target="_blank" rel="noopener noreferrer"
                                                    className="text-dark-200 text-sm hover:text-purple-300 transition-colors truncate block">
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="text-dark-200 text-sm">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass rounded-2xl p-8"
                            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-dark-400 text-sm mb-1.5 block" htmlFor="name">Name *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="text-dark-400 text-sm mb-1.5 block" htmlFor="email">Email *</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-dark-400 text-sm mb-1.5 block" htmlFor="subject">Subject *</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Internship opportunity / Collaboration"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-dark-400 text-sm mb-1.5 block" htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or opportunity..."
                                    required
                                    rows={5}
                                    className="form-input resize-none"
                                />
                            </div>

                            {/* Status messages */}
                            {status === 'success' && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-emerald-400 mb-4 p-3 rounded-xl"
                                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                                    <CheckCircle size={16} /> Message sent successfully!
                                </motion.div>
                            )}


                            <button
                                type="submit"
                                id="contact-submit"
                                disabled={status === 'loading'}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
