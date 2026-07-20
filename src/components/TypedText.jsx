import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Front-End Developer", "Prompt Engineer", "Data Analyst"];

export default function TypedText() {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1200);
            return;
        }
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 60 : 90);
        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    return (
        <span className="gradient-text font-display font-bold">
            {words[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
        </span>
    );
}
