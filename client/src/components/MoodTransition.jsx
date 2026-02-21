import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MoodTransition.css";

const MOOD_FLASH_COLORS = {
    happy: "rgba(255, 213, 79, 0.25)",
    sad: "rgba(66, 165, 245, 0.2)",
    angry: "rgba(239, 83, 80, 0.25)",
    stress: "rgba(255, 112, 67, 0.2)",
    calm: "rgba(102, 187, 106, 0.18)",
    neutral: "rgba(120, 144, 156, 0.12)",
};

export default function MoodTransition({ mood }) {
    const [flash, setFlash] = useState(false);
    const prevMood = useRef(mood);

    useEffect(() => {
        if (prevMood.current !== mood) {
            prevMood.current = mood;
            setFlash(true);
            const timer = setTimeout(() => setFlash(false), 450);
            return () => clearTimeout(timer);
        }
    }, [mood]);

    const color = MOOD_FLASH_COLORS[mood] || MOOD_FLASH_COLORS.neutral;

    return (
        <AnimatePresence>
            {flash && (
                <motion.div
                    className="mood-transition-flash"
                    style={{ background: color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            )}
        </AnimatePresence>
    );
}
