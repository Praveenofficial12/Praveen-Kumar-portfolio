import { useState } from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolio';
import { Award, Eye, CheckCircle2 } from 'lucide-react';
import CertificateModal from './ui/CertificateModal';

export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState(null);

    const handleViewCert = (cert, e) => {
        if (e) e.stopPropagation();
        setSelectedCert(cert);

        fetch('/api/analytics/certificate-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certificateName: cert.title })
        }).catch(() => { });
    };

    return (
        <section id="certifications" className="section relative overflow-hidden" style={{ background: 'rgba(8,8,16,0.85)' }}>
            {/* Background Orbs */}
            <div className="orb orb-purple w-96 h-96 -top-10 -left-10 opacity-20 pointer-events-none" />
            <div className="orb orb-blue w-80 h-80 bottom-0 right-0 opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <Award size={14} className="text-purple-400" /> Verified Credentials
                    </span>
                    <h2 className="section-title">
                        Achievements & <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                        Industry-recognized certifications validating my expertise in AI, Machine Learning, Cloud Architecture, and Data Science.
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
                            onClick={(e) => handleViewCert(cert, e)}
                            className="cert-card glass p-6 group cursor-pointer flex flex-col justify-between relative overflow-hidden"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <div>
                                {/* Icon + Year */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white p-2.5 shadow-md group-hover:scale-105 transition-transform"
                                        style={{ background: 'rgba(255, 255, 255, 0.98)' }}>
                                        {cert.logo ? (
                                            <img src={cert.logo} alt={cert.issuer} className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <span className="text-2xl">{cert.icon}</span>
                                        )}
                                    </div>
                                    <span className="tech-tag text-[11px] font-semibold">{cert.year}</span>
                                </div>

                                <h3 className="font-display font-bold text-base text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-dark-400 text-xs mb-4">Issued by {cert.issuer}</p>
                            </div>

                            <div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                        <CheckCircle2 size={13} /> Verified
                                    </div>

                                    {/* Prominent View Certificate Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => handleViewCert(cert, e)}
                                        className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:border-purple-400"
                                    >
                                        <Eye size={13} /> View Certificate
                                    </button>
                                </div>

                                {/* Gradient Bottom Bar */}
                                <div className={`mt-4 h-0.5 rounded-full w-full bg-gradient-to-r ${cert.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Lightbox Component */}
            <CertificateModal
                certificate={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </section>
    );
}
