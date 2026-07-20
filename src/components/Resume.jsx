import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function Resume() {
    return (
        <section id="resume" className="section bg-mesh">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <span className="tech-tag mb-4 inline-block">Resume</span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Resume</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        A quick glance at my education, skills, and experience.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    {/* Preview placeholder */}
                    <div className="relative h-96 flex items-center justify-center project-img-placeholder">
                        <div className="text-center">
                            <FileText size={48} className="text-purple-400 mx-auto mb-4" />
                            <p className="text-white font-display font-bold text-xl mb-2">Praveen Kumar K</p>
                            <p className="text-dark-400 text-sm mb-1">Front-End Developer & AI Student</p>
                            <p className="text-dark-500 text-xs">B.Tech | V.S.B Engineering College | CGPA: 8.05</p>
                        </div>
                        <div className="absolute inset-0 bg-grid opacity-20" />
                    </div>

                    {/* Action */}
                    <div className="p-6 flex justify-center gap-4">
                        <a
                            href="/resume.pdf"
                            download="Praveen Kumar K - Resume.pdf"
                            id="download-resume"
                            className="btn-primary flex items-center gap-2"
                        >
                            <Download size={16} />
                            Download Resume
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2"
                        >
                            <FileText size={16} />
                            View Full Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
