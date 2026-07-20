import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 200);
                    return 100;
                }
                return p + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
        >
            {/* Orbs */}
            <div className="orb orb-purple w-64 h-64 top-0 left-0 opacity-50" />
            <div className="orb orb-pink w-48 h-48 bottom-0 right-0 opacity-30" />

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Animated logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}
                >
                    <span className="text-white font-bold font-display text-3xl">PK</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <p className="loading-logo">Praveen Kumar K</p>
                    <p className="text-dark-400 text-sm mt-1">AI & Data Science · Front-End Developer</p>
                </motion.div>

                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="loading-bar">
                        <motion.div
                            className="loading-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-dark-500 text-xs font-mono">{progress}% loaded</p>
                </motion.div>
            </div>
        </motion.div>
    );
}
