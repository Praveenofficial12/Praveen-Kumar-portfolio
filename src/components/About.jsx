import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { education, personalInfo, certifications } from '../data/portfolio';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
    return (
        <section id="about" className="section bg-neural-grid relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="orb orb-purple w-96 h-96 -top-20 -left-20 opacity-25 pointer-events-none" />
            <div className="orb orb-cyan w-80 h-80 bottom-10 -right-10 opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    className="text-center mb-14"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <Sparkles size={14} className="text-purple-400" /> About Me
                    </span>
                    <h2 className="section-title">
                        Who am <span className="gradient-text">I?</span>
                    </h2>
                    <p className="section-subtitle">
                        Front-End Developer, Prompt Engineer, and Data Analyst with a passion for user-centric digital experiences.
                    </p>
                </motion.div>

                {/* Main Content Grid: Bio Card + Academic Timeline */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Bio Card (7 cols) */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="lg:col-span-7"
                    >
                        <div className="glass rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-between"
                            style={{ border: '1px solid rgba(168,85,247,0.2)' }}>
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.25))', border: '1px solid rgba(168,85,247,0.3)' }}>
                                        👋
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-2xl text-white">{personalInfo.name}</h3>
                                        <p className="text-purple-300 text-sm font-semibold mt-0.5">
                                            {personalInfo.title}
                                        </p>
                                        <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                                            <MapPin size={13} className="text-purple-400" /> {personalInfo.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-300 leading-relaxed text-base mb-4">
                                    I am a creative and technology-focused <strong className="text-purple-300">Front-End Developer, Prompt Engineer, and Data Analyst</strong>. I specialize in designing intuitive digital interfaces, engineering intelligent prompts, and building user-centric data-driven web applications.
                                </p>
                                <p className="text-slate-300 leading-relaxed text-base mb-8">
                                    Currently pursuing my <strong className="text-cyan-300">B.Tech in Artificial Intelligence &amp; Data Science</strong> at V.S.B Engineering College (CGPA: 8.05), I am actively seeking Front-End Development and AI internship opportunities where I can apply my technical skills to build interactive, scalable web solutions.
                                </p>
                            </div>

                            {/* Key Stats Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
                                {[
                                    { label: 'CGPA', value: '8.05', sub: 'B.Tech AI & DS', icon: '🎯' },
                                    { label: 'Location', value: 'Karur, TN', sub: 'Tamil Nadu', icon: '📍' },
                                    { label: 'Projects', value: '2+', sub: 'Full Stack & AI', icon: '🚀' },
                                    { label: 'Certs', value: `${certifications.length}+`, sub: 'Industry Certified', icon: '🏆' },
                                ].map(({ label, value, sub, icon }) => (
                                    <div key={label} className="rounded-xl p-3.5 bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
                                        <div className="text-xl mb-1">{icon}</div>
                                        <div className="font-display font-extrabold text-lg text-white">{value}</div>
                                        <div className="text-purple-300 text-xs font-semibold">{label}</div>
                                        <div className="text-slate-500 text-[10px]">{sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Academic Timeline (5 cols) */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="lg:col-span-5"
                    >
                        <div className="glass rounded-2xl p-7 relative h-full flex flex-col justify-between" style={{ border: '1px solid rgba(56,189,248,0.2)' }}>
                            <div>
                                <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2.5">
                                    <GraduationCap className="text-cyan-400" size={24} />
                                    Education &amp; Academics
                                </h3>

                                {/* Timeline Wrapper with Perfect Alignment */}
                                <div className="relative pl-8 space-y-6">
                                    {/* Timeline Vertical Guide Line */}
                                    <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-slate-800" />

                                    {education.map((edu, idx) => (
                                        <div key={idx} className="relative group">
                                            {/* Perfectly Centered Timeline Node Dot */}
                                            <div
                                                className="absolute -left-[29px] top-3.5 w-5 h-5 rounded-full flex items-center justify-center bg-slate-950 border-2 border-purple-400 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 z-10"
                                                style={{ boxShadow: '0 0 12px rgba(168,85,247,0.5)' }}
                                            >
                                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                            </div>

                                            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 group-hover:border-purple-500/40 transition-all duration-300">
                                                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                                                        {edu.period}
                                                    </span>
                                                    <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                                                        {edu.grade}
                                                    </span>
                                                </div>
                                                <h4 className="font-display font-bold text-white text-base mt-1.5">{edu.degree}</h4>
                                                <p className="text-cyan-300 font-medium text-xs mt-0.5">{edu.field}</p>
                                                <div className="flex items-center gap-1.5 mt-2 text-slate-400 text-xs">
                                                    <MapPin size={13} className="text-slate-500" />
                                                    {edu.institution}, {edu.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Resume Pitch Callout */}
                            <div className="mt-6 p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200/90 leading-relaxed flex items-start gap-2.5">
                                <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Objective:</strong> Seeking Front-End &amp; AI Internship roles to apply user experience design and full-stack engineering skills.
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
