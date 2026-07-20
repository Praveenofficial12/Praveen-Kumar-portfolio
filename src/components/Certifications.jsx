import { motion } from 'framer-motion';
import { certifications } from '../data/portfolio';
import { Award } from 'lucide-react';

export default function Certifications() {
    return (
        <section id="certifications" className="section" style={{ background: 'rgba(8,8,16,0.7)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">Certifications</span>
                    <h2 className="section-title">
                        Achievements &{' '}
                        <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Industry-recognized certifications validating my AI, cloud, and programming expertise.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="cert-card glass p-6 group"
                        >
                            {/* Icon + Year */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white p-2.5 overflow-hidden filter hover:brightness-105 transition-all shadow-inner"
                                    style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                                    {cert.logo ? (
                                        <img src={cert.logo} alt={cert.issuer} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <span className="text-2xl">{cert.icon}</span>
                                    )}
                                </div>
                                <span className="tech-tag">{cert.year}</span>
                            </div>

                            <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-dark-400 text-sm mb-4">Issued by {cert.issuer}</p>

                            <div className="flex items-center gap-2">
                                <Award size={14} className="text-purple-400" />
                                <span className="text-purple-300 text-sm font-medium">Verified Certificate</span>
                            </div>

                            {/* Decorative line */}
                            <div className={`mt-4 h-0.5 rounded-full w-full bg-gradient-to-r ${cert.color} opacity-30 group-hover:opacity-60 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
