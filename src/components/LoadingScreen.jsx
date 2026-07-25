import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const completedRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    if (!completedRef.current) {
                        completedRef.current = true;
                        setTimeout(() => {
                            if (onComplete) onComplete();
                        }, 250);
                    }
                    return 100;
                }
                return prev + 4;
            });
        }, 35);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060712] overflow-hidden">
            {/* Background Orbs */}
            <div className="orb orb-purple w-96 h-96 -top-20 -left-20 opacity-40 pointer-events-none" />
            <div className="orb orb-pink w-80 h-80 bottom-0 right-0 opacity-30 pointer-events-none" />
            <div className="orb orb-cyan w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 px-4">
                {/* Logo Badge */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border border-purple-500/30"
                    style={{
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.8), rgba(168,85,247,0.8))',
                        boxShadow: '0 0 50px rgba(168,85,247,0.4)'
                    }}
                >
                    <span className="text-white font-extrabold font-display text-3xl tracking-wide">PK</span>
                </motion.div>

                {/* Name & Title */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-display gradient-text tracking-tight mb-1">
                        Praveen Kumar K
                    </h1>
                    <p className="text-purple-300 text-sm font-medium">
                        Front-End Developer · Prompt Engineer · Data Analyst
                    </p>
                </motion.div>

                {/* Progress Bar & Counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-2.5 w-64 mt-2"
                >
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5 shadow-inner">
                        <div
                            className="h-full rounded-full transition-all duration-150 ease-out"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)'
                            }}
                        />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                        {progress}% Initializing...
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
