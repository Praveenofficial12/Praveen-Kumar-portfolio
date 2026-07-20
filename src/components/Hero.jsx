import { motion } from 'framer-motion';
import { Mail, Phone, Download, Eye, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TypedText from './TypedText';
import { personalInfo } from '../data/portfolio';

const socialLinks = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${personalInfo.phone}`, label: 'Phone' },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh bg-grid">
            {/* Background Orbs */}
            <div className="orb orb-purple w-96 h-96 top-10 -left-20 opacity-60" />
            <div className="orb orb-pink w-80 h-80 bottom-20 -right-10" />
            <div className="orb orb-blue w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-16">
                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex-1 text-center lg:text-left"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{ background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(124, 58, 237, 0.25)' }}>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-purple-300 font-medium">Available for Internship</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tight mb-4">
                        {personalInfo.name.split(' ').slice(0, 2).join(' ')}{' '}
                        <span className="gradient-text">{personalInfo.name.split(' ').pop()}</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-dark-400 font-medium mb-3">
                        {personalInfo.title}
                    </motion.p>

                    <motion.div variants={itemVariants} className="text-2xl mb-6 h-8">
                        <TypedText />
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-dark-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                        {personalInfo.bio}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                        <a href="/resume.pdf" download="Praveen Kumar K - Resume.pdf" className="btn-primary flex items-center gap-2">
                            <Download size={16} />
                            Download Resume
                        </a>
                        <a href="#contact" className="btn-outline flex items-center gap-2">
                            <Mail size={16} />
                            Contact Me
                        </a>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:box-glow"
                                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <Icon size={18} className="text-dark-300 hover:text-purple-400 transition-colors" />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0"
                >
                    <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-full animate-spin-slow"
                            style={{ background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, #ec4899, #6366f1, #7c3aed)', padding: '3px' }}>
                            <div className="w-full h-full rounded-full bg-dark-950" />
                        </div>

                        {/* Avatar */}
                        <div className="absolute inset-3 rounded-full overflow-hidden flex items-center justify-center animate-pulse-subtle"
                            style={{ border: '1px solid rgba(168,85,247,0.3)' }}>
                            <img src="/praveen.jpg" alt="Praveen Kumar K" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
                        </div>

                        {/* Floating badges */}
                        {[
                            { emoji: '🎨', label: 'UI/UX', pos: '-top-4 -right-4' },
                            { emoji: '🤖', label: 'AI', pos: '-bottom-4 -left-4' },
                            { emoji: '💻', label: 'Front-End', pos: '-bottom-4 -right-4' },
                        ].map(({ emoji, label, pos }) => (
                            <motion.div
                                key={label}
                                className={`absolute ${pos} glass rounded-xl px-3 py-2 text-center animate-float-delayed`}
                                style={{ border: '1px solid rgba(168,85,247,0.3)' }}
                            >
                                <div className="text-xl">{emoji}</div>
                                <div className="text-xs text-purple-300 font-semibold">{label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-500"
            >
                <span className="text-xs font-medium">Scroll down</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    );
}
