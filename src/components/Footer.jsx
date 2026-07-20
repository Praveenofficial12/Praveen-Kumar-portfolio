import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';

const socials = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${personalInfo.phone}`, label: 'Phone' },
];

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative py-12 px-4"
            style={{ background: '#060610', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                            <span className="text-white font-bold font-display text-sm">PK</span>
                        </div>
                        <div>
                            <p className="font-display font-bold text-white">Praveen Kumar K</p>
                            <p className="text-dark-500 text-xs">AI & DS Student | Front-End Developer</p>
                        </div>
                    </div>

                    {/* Social icons */}
                    <div className="flex gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                aria-label={label}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:box-glow"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <Icon size={16} className="text-dark-400 hover:text-purple-400 transition-colors" />
                            </a>
                        ))}
                    </div>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        id="back-to-top"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-purple-400 transition-all hover:text-white hover:scale-105"
                        style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                    >
                        <ArrowUp size={14} />
                        Back to Top
                    </button>
                </div>

                <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <p className="text-dark-500 text-sm">
                        © {new Date().getFullYear()} Praveen Kumar K. All rights reserved.
                    </p>
                    <p className="text-dark-600 text-xs">
                        Built with React · Vite · Tailwind CSS · Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
