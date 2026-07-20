import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Palette, Sparkles, Wrench } from 'lucide-react';
import { skills } from '../data/portfolio';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Languages':
            return <Code2 className="text-purple-400" size={24} />;
        case 'Tools & Frameworks':
            return <Cpu className="text-blue-400" size={24} />;
        case 'Databases':
            return <Database className="text-pink-400" size={24} />;
        case 'Graphic Design':
            return <Palette className="text-amber-400" size={24} />;
        case 'Other Skills':
            return <Sparkles className="text-emerald-400" size={24} />;
        default:
            return <Wrench className="text-purple-400" size={24} />;
    }
};

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
    return (
        <section id="skills" className="section" style={{ background: 'rgba(10,10,20,0.5)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">Skills</span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Tools, technologies, and skills I've developed through projects and continuous learning.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={skill.category}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="glass rounded-2xl p-6 cursor-default group"
                            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-dark-900 border border-purple-500/20 shadow-inner">
                                    {getCategoryIcon(skill.category)}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white">{skill.category}</h3>
                                    <p className="text-dark-400 text-xs">{skill.items.length} skills</p>
                                </div>
                            </div>

                            {/* Skill Tags */}
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, i) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 + idx * 0.02 }}
                                        className="skill-tag"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Progress indicator */}
                            <div className="mt-5 flex items-center gap-2">
                                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                    <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '75%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                                    />
                                </div>
                                <span className="text-dark-400 text-xs">Proficient</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
