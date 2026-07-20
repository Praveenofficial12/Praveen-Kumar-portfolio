import { motion } from 'framer-motion';
import { caseStudies } from '../data/portfolio';
import { CheckCircle } from 'lucide-react';

export default function CaseStudies() {
    return (
        <section id="case-studies" className="section" style={{ background: 'rgba(8,8,16,0.7)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">UI/UX</span>
                    <h2 className="section-title">
                        Case <span className="gradient-text">Studies</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        A deep dive into my design process — from problem to pixel-perfect solution.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {caseStudies.map((cs, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7 }}
                            className="glass rounded-3xl p-8 md:p-12"
                            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                <div>
                                    <span className="tech-tag mb-3 inline-block">Case Study {idx + 1}</span>
                                    <h3 className="font-display font-bold text-3xl text-white">{cs.title}</h3>
                                    <p className="text-purple-400 mt-1">{cs.tagline}</p>
                                </div>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${cs.color} opacity-80`}
                                    style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(168,85,247,0.2)' }}>
                                    {idx === 0 ? '❤️' : '🌾'}
                                </div>
                            </div>

                            {/* Design Process Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {cs.phases.map((phase, pIdx) => (
                                    <motion.div
                                        key={phase.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: pIdx * 0.07, duration: 0.4 }}
                                        whileHover={{ y: -4 }}
                                        className="rounded-xl p-4"
                                        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)' }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                                                {pIdx + 1}
                                            </div>
                                            <span className="text-purple-300 font-semibold text-sm">{phase.label}</span>
                                        </div>
                                        <p className="text-dark-400 text-xs leading-relaxed">{phase.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Design Artifacts Placeholder */}
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Wireframes', 'Prototypes', 'UI Screens', 'Design System'].map((art, i) => (
                                    <div key={art} className="rounded-xl h-24 flex flex-col items-center justify-center gap-1.5 project-img-placeholder">
                                        <div className="text-2xl">{['🖊️', '📐', '🎨', '📏'][i]}</div>
                                        <span className="text-dark-400 text-xs font-medium">{art}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
