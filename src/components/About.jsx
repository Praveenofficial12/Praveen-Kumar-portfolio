import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Star } from 'lucide-react';
import { education, personalInfo, certifications } from '../data/portfolio';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
    return (
        <section id="about" className="section bg-mesh">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">About Me</span>
                    <h2 className="section-title">
                        Who am{' '}
                        <span className="gradient-text">I?</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        A passionate front-end developer and artificial intelligence student.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Bio Card */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                    >
                        <div className="glass rounded-2xl p-8 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))' }}>
                                    👋
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl text-white">Praveen Kumar K</h3>
                                    <p className="text-purple-400 text-sm">AI & DS Student · Karur, Tamil Nadu</p>
                                </div>
                            </div>

                            <p className="text-dark-300 leading-relaxed mb-6">
                                I enjoy combining creativity with technology to build intuitive front-end interfaces and AI-powered solutions.
                                I continuously improve my skills through projects, internships, and hands-on learning.
                            </p>
                            <p className="text-dark-300 leading-relaxed mb-8">
                                Currently pursuing my B.Tech in Artificial Intelligence & Data Science, I'm actively seeking
                                Front-End Development internship opportunities where I can apply my skills in building beautiful,
                                interactive, and user-centric web applications.
                            </p>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'CGPA', value: '8.05', icon: '🎯' },
                                    { label: 'Location', value: 'Karur, TN', icon: '📍' },
                                    { label: 'Projects', value: '2+', icon: '🚀' },
                                    { label: 'Certs', value: `${certifications.length}+`, icon: '🏆' },
                                ].map(({ label, value, icon }) => (
                                    <div key={label} className="rounded-xl p-4"
                                        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}>
                                        <div className="text-xl mb-1">{icon}</div>
                                        <div className="font-display font-bold text-white">{value}</div>
                                        <div className="text-dark-400 text-xs">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Timeline */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                    >
                        <h3 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
                            <GraduationCap className="text-purple-400" size={24} />
                            Education
                        </h3>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 timeline-line" />

                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15, duration: 0.5 }}
                                        className="relative pl-14"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-2.5 top-5 w-5 h-5 rounded-full flex items-center justify-center"
                                            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 12px rgba(124,58,237,0.5)' }}>
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>

                                        <div className="glass rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                                            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                                                <div>
                                                    <span className="text-sm font-medium px-2 py-0.5 rounded-full"
                                                        style={{ background: 'rgba(124,58,237,0.15)', color: '#c084fc' }}>
                                                        {edu.period}
                                                    </span>
                                                </div>
                                                <span className="text-emerald-400 text-sm font-bold">{edu.grade}</span>
                                            </div>
                                            <h4 className="font-display font-bold text-white text-lg mt-2">{edu.degree}</h4>
                                            <p className="text-purple-300 font-medium text-sm">{edu.field}</p>
                                            <div className="flex items-center gap-1.5 mt-2 text-dark-400 text-sm">
                                                <MapPin size={13} />
                                                {edu.institution}, {edu.location}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
