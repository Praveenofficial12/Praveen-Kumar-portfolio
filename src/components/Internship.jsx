import { useState } from 'react';
import { motion } from 'framer-motion';
import { internship } from '../data/portfolio';
import { Briefcase, Calendar, CheckCircle, Eye, Award } from 'lucide-react';
import CertificateModal from './ui/CertificateModal';

export default function Internship() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const internCertData = {
        title: "Infosys Springboard Internship 6.0 Certificate",
        issuer: "Infosys Springboard",
        year: internship.duration,
        certificateImage: internship.certificateImage || "/certificates/infosys-internship.png"
    };

    const handleViewInternCert = () => {
        setIsModalOpen(true);
        fetch('/api/analytics/certificate-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certificateName: internCertData.title })
        }).catch(() => { });
    };

    return (
        <section id="internship" className="section bg-mesh relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <Briefcase size={14} className="text-purple-400" /> Industry Experience
                    </span>
                    <h2 className="section-title">
                        Virtual <span className="gradient-text">Internship</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Practical industry experience in AI & Machine Learning through Infosys Springboard.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    style={{ border: '1px solid rgba(168,85,247,0.2)' }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Logo + Info */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 p-2 bg-white overflow-hidden shadow-lg"
                                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                {internship.logo ? (
                                    <img src={internship.logo} alt={internship.company} className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-3xl">🏢</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-dark-400 text-sm mb-1">
                                <Briefcase size={13} className="text-purple-400" />
                                <span>{internship.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-dark-400 text-sm">
                                <Calendar size={13} className="text-purple-400" />
                                <span>{internship.duration}</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                <span className="tech-tag text-xs font-semibold">Virtual Internship 6.0</span>

                                {/* Prominent View Certificate Button for Internship */}
                                <button
                                    onClick={handleViewInternCert}
                                    className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30 hover:scale-105 transition-all"
                                >
                                    <Eye size={14} /> View Internship Certificate
                                </button>
                            </div>

                            <h3 className="font-display font-bold text-2xl text-white mt-3 mb-1">{internship.company}</h3>
                            <p className="text-purple-300 font-medium mb-4 flex items-center gap-2">
                                <Award size={16} /> {internship.role}
                            </p>
                            <p className="text-dark-300 leading-relaxed mb-6 text-sm sm:text-base">
                                {internship.description}
                            </p>

                            {/* Skills gained */}
                            <div>
                                <p className="text-white font-semibold mb-3 text-sm">Key Domains & Skills Acquired:</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {internship.skills.map((skill, i) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-2.5 bg-white/[0.02] p-2.5 rounded-xl border border-white/5"
                                        >
                                            <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                                            <span className="text-dark-200 text-xs sm:text-sm font-medium">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Internship Certificate Modal */}
            <CertificateModal
                certificate={internCertData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
