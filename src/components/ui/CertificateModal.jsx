import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ certificate, isOpen, onClose }) {
    if (!certificate) return null;

    const handleDownload = () => {
        if (!certificate.certificateImage) return;
        const link = document.createElement('a');
        link.href = certificate.certificateImage;
        link.download = `${certificate.title.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl glass rounded-3xl overflow-hidden shadow-2xl z-10 border border-purple-500/30 my-8"
                        style={{ background: 'rgba(13, 17, 23, 0.95)' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                                    <Award size={20} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg md:text-xl font-bold text-white truncate">
                                        {certificate.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-purple-300/80 flex items-center gap-2">
                                        <span>Issued by {certificate.issuer}</span>
                                        {certificate.year && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} /> {certificate.year}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-dark-300 hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Certificate Image Container */}
                        <div className="p-4 sm:p-6 bg-black/40 flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-auto">
                            {certificate.certificateImage ? (
                                <img
                                    src={certificate.certificateImage}
                                    alt={certificate.title}
                                    className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-white/10"
                                />
                            ) : (
                                <div className="text-center py-12 text-dark-400">
                                    <Award size={48} className="mx-auto mb-3 opacity-40" />
                                    <p>Certificate preview not available.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 border-t border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                                <CheckCircle2 size={16} /> Verified Official Certificate
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                {certificate.certificateImage && (
                                    <>
                                        <a
                                            href={certificate.certificateImage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
                                        >
                                            <ExternalLink size={15} /> Open Full Size
                                        </a>

                                        <button
                                            onClick={handleDownload}
                                            className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-2"
                                        >
                                            <Download size={15} /> Download
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
