import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, BrainCircuit, Sparkles, Code2, Database, ShieldCheck, Activity, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/portfolio';

const categories = ['All', 'AI / ML', 'Software Platform'];

export default function Projects() {
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section bg-neural-grid relative overflow-hidden">
            {/* Background Glows */}
            <div className="orb orb-purple w-96 h-96 top-1/4 -right-20 opacity-20 pointer-events-none" />
            <div className="orb orb-cyan w-80 h-80 bottom-10 left-10 opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <BrainCircuit size={14} className="text-purple-400" /> AI Applications &amp; Engineering
                    </span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">AI Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        End-to-end intelligent systems combining Machine Learning predictive models, real-time analytics, and modern web interfaces.
                    </p>
                </motion.div>

                {/* Filter Category Tabs */}
                <div className="flex gap-3 justify-center mb-12 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${filter === cat ? 'btn-primary shadow-lg shadow-purple-900/40' : 'btn-outline'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        className="grid lg:grid-cols-2 gap-8 items-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {filtered.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} idx={idx} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

function ProjectCard({ project, idx }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:border-purple-500/40 flex flex-col justify-between"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
            {/* Visual Container / Banner */}
            <div className="relative h-60 overflow-hidden flex items-center justify-center bg-slate-950 border-b border-slate-800">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: project.bgColor }}>
                        <div className="text-center p-6">
                            <div className="text-6xl mb-2">
                                {project.id === 1 ? '🫀' : '🌾'}
                            </div>
                            <span className="text-xs font-mono text-purple-300 tracking-widest uppercase">
                                {project.category}
                            </span>
                        </div>
                    </div>
                )}

                {/* Visual Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="tech-tag shadow-lg" style={{ backdropFilter: 'blur(10px)', background: 'rgba(6, 7, 18, 0.75)', border: '1px solid rgba(168,85,247,0.3)' }}>
                        <Sparkles size={12} className="mr-1 text-cyan-400" /> {project.category}
                    </span>
                </div>

                {/* External Action Links */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => {
                            e.stopPropagation();
                            fetch('/api/analytics/project-click', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ projectName: project.title, clickType: 'github' })
                            }).catch(() => { });
                        }}
                        aria-label="GitHub Repository"
                        className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-all border border-slate-700 hover:border-purple-400 shadow-md"
                    >
                        <FaGithub size={17} className="text-slate-200 hover:text-purple-300" />
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => {
                                e.stopPropagation();
                                fetch('/api/analytics/project-click', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ projectName: project.title, clickType: 'demo' })
                                }).catch(() => { });
                            }}
                            aria-label="Live Demo"
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-all border border-slate-700 hover:border-cyan-400 shadow-md"
                        >
                            <ExternalLink size={17} className="text-slate-200 hover:text-cyan-300" />
                        </a>
                    )}
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2.5 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                        {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map(t => (
                            <span key={t} className="skill-tag text-[11px] py-1 px-2.5">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Architectural Features Toggle */}
                <div className="pt-4 border-t border-slate-800">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-between text-purple-300 text-xs font-semibold hover:text-cyan-300 transition-colors py-1"
                    >
                        <span className="flex items-center gap-1.5">
                            <Activity size={14} className="text-cyan-400" /> System Features &amp; AI Capabilities
                        </span>
                        <ArrowRight size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-90 text-cyan-400' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-3 space-y-2 text-xs text-slate-300 bg-slate-900/70 rounded-xl p-3.5 border border-slate-800"
                            >
                                {project.features.map(f => (
                                    <li key={f} className="flex items-start gap-2 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
