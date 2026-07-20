import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            // Determine active section
            const sections = navLinks.map(l => l.href.replace('#', ''));
            const current = sections.find(sec => {
                const el = document.getElementById(sec);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            if (current) setActive(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 shadow-2xl py-3' : 'py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                        <span className="text-white font-bold font-display text-sm">PK</span>
                    </div>
                    <span className="font-display font-bold text-white text-lg hidden sm:block">
                        Praveen<span className="gradient-text-purple">.</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${active === link.href.replace('#', '') ? 'active' : ''}`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        download="Praveen Kumar K - Resume.pdf"
                        className="btn-primary text-sm py-2 px-4"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="lg:hidden p-2 rounded-lg text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass border-t border-white/5"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-3 rounded-xl text-dark-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download="Praveen Kumar K - Resume.pdf"
                                className="btn-primary text-sm mt-2 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
