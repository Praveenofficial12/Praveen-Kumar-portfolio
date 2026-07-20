import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/portfolio';

const categories = ['All', 'AI / ML', 'Software Platform'];

export default function Projects() {
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section bg-mesh">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="tech-tag mb-4 inline-block">Projects</span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Real-world projects combining AI, beautiful design, and web technologies.
                    </p>
                </motion.div>

                {/* Filter buttons */}
                <div className="flex gap-2 justify-center mb-10 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === cat ? 'btn-primary' : 'btn-outline'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Cards */}
                <AnimatePresence mode="wait">
                    <motion.div key={filter} className="grid lg:grid-cols-2 gap-8"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass rounded-2xl overflow-hidden group cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden flex items-center justify-center"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: project.bgColor }}>
                        <div className="text-center">
                            <div className={`text-7xl mb-3 bg-gradient-to-br ${project.color} bg-clip-text`}>
                                {project.id === 1 ? '❤️' : '🌾'}
                            </div>
                        </div>
                    </div>
                )}
                {/* Visual Category Label */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="tech-tag" style={{ backdropFilter: 'blur(8px)', background: 'rgba(10,10,20,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {project.category}
                    </span>
                </div>
                {/* Decorative overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:scale-110 transition-all"
                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                        <FaGithub size={15} className="text-white" />
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:scale-110 transition-all"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <ExternalLink size={15} className="text-white" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                </h3>
                <p className="text-dark-400 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                {/* Features toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-purple-400 text-sm hover:text-purple-300 transition-colors"
                >
                    {expanded ? 'Hide features' : 'View features'}
                    <ArrowRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                    {expanded && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 space-y-2"
                        >
                            {project.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-dark-300 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
