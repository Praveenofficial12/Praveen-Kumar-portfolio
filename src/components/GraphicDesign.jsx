import { motion } from 'framer-motion';
import { graphicDesignItems } from '../data/portfolio';

export default function GraphicDesign() {
    return (
        <section id="graphic-design" className="section bg-mesh">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="tech-tag mb-4 inline-block">Design Gallery</span>
                    <h2 className="section-title">
                        Graphic <span className="gradient-text">Design</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        A collection of posters, banners, and visual content created with Canva, Figma, and Adobe tools.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {graphicDesignItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            whileHover={{ scale: 1.04, y: -4 }}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer h-48 md:h-64 bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            {/* Background grid */}
                            <div className="absolute inset-0 bg-grid opacity-20" />

                            {/* Content */}
                            <div className="relative z-10 text-center p-4">
                                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <p className="text-white font-display font-semibold text-sm">{item.title}</p>
                                <p className="text-dark-400 text-xs mt-1">{item.category}</p>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                style={{ background: 'rgba(124,58,237,0.15)' }}>
                                <span className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                                    style={{ background: 'rgba(124,58,237,0.4)', border: '1px solid rgba(168,85,247,0.4)' }}>
                                    View Design
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tools used */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex flex-wrap gap-3 justify-center"
                >
                    {['Canva', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator'].map(tool => (
                        <span key={tool} className="skill-tag text-sm">🎨 {tool}</span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
