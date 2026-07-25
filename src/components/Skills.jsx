import { motion } from 'framer-motion';
import {
    FaJava, FaPython, FaReact, FaDatabase, FaFigma, FaPaintBrush, FaCode, FaObjectGroup
} from 'react-icons/fa';
import { SiMongodb, SiMysql } from 'react-icons/si';
import { Cpu } from 'lucide-react';

const skillItems = [
    { name: "Java", category: "Languages", icon: FaJava, color: "#f89820", bg: "rgba(248, 152, 32, 0.12)" },
    { name: "Python", category: "Languages", icon: FaPython, color: "#3776ab", bg: "rgba(55, 118, 171, 0.12)" },
    { name: "React.js", category: "Tools & Frameworks", icon: FaReact, color: "#61dafb", bg: "rgba(97, 218, 251, 0.12)" },
    { name: "MongoDB", category: "Databases", icon: SiMongodb, color: "#47a248", bg: "rgba(71, 162, 72, 0.12)" },
    { name: "MySQL", category: "Databases", icon: SiMysql, color: "#00758f", bg: "rgba(0, 117, 143, 0.12)" },
    { name: "Canva", category: "Graphic Design", icon: FaPaintBrush, color: "#00c4cc", bg: "rgba(0, 196, 204, 0.12)" },
    { name: "Figma", category: "Graphic Design", icon: FaFigma, color: "#f24e1e", bg: "rgba(242, 78, 30, 0.12)" },
    { name: "UI & UX Design", category: "Other Skills", icon: FaObjectGroup, color: "#c084fc", bg: "rgba(192, 132, 252, 0.12)" },
    { name: "Frontend Dev", category: "Other Skills", icon: FaCode, color: "#a855f7", bg: "rgba(168, 85, 247, 0.12)" },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
    return (
        <section id="skills" className="section relative overflow-hidden bg-slate-950/70">
            {/* Background Orbs */}
            <div className="orb orb-purple w-80 h-80 top-10 left-0 opacity-20 pointer-events-none" />
            <div className="orb orb-cyan w-96 h-96 bottom-0 right-0 opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="tech-tag mb-4 inline-flex items-center gap-1.5">
                        <Cpu size={14} className="text-cyan-400" /> Technical Capabilities
                    </span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">
                        Core programming languages, frameworks, databases, and design software tools.
                    </p>
                </motion.div>

                {/* Square Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
                >
                    {skillItems.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="glass aspect-square rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-default group transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl"
                                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                {/* Top Glow Accent */}
                                <div
                                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: skill.bg }}
                                />

                                {/* Icon Wrapper */}
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-inner"
                                    style={{
                                        background: skill.bg,
                                        border: `1px solid ${skill.color}40`,
                                        boxShadow: `0 0 20px ${skill.color}20`
                                    }}
                                >
                                    <Icon size={34} style={{ color: skill.color }} />
                                </div>

                                {/* Title */}
                                <h3 className="font-display font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                                    {skill.name}
                                </h3>

                                {/* Category Tag */}
                                <span className="text-[11px] font-medium text-slate-400 mt-1">
                                    {skill.category}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
