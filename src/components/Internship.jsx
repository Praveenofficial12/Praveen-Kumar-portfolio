import { motion } from 'framer-motion';
import { internship } from '../data/portfolio';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

export default function Internship() {
    return (
        <section id="internship" className="section bg-mesh">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">Experience</span>
                    <h2 className="section-title">
                        <span className="gradient-text">Internship</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Real-world industry experience through virtual training programs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass rounded-3xl p-8 md:p-12"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Logo + Info */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 p-2 bg-white overflow-hidden"
                                style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 15px rgba(255,255,255,0.05)' }}>
                                {internship.logo ? (
                                    <img src={internship.logo} alt={internship.company} className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-3xl">🏢</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-dark-400 text-sm mb-1">
                                <Briefcase size={13} />
                                <span>{internship.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-dark-400 text-sm">
                                <Calendar size={13} />
                                <span>{internship.duration}</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="mb-2">
                                <span className="tech-tag">Virtual Internship</span>
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mt-3 mb-1">{internship.company}</h3>
                            <p className="text-purple-400 font-medium mb-4">{internship.role}</p>
                            <p className="text-dark-300 leading-relaxed mb-6">{internship.description}</p>

                            {/* Skills gained */}
                            <div>
                                <p className="text-white font-semibold mb-3 text-sm">Skills Gained:</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {internship.skills.map((skill, i) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle size={15} className="text-purple-400 flex-shrink-0" />
                                            <span className="text-dark-300 text-sm">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
