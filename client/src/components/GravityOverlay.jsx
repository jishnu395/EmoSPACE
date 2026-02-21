import { motion, AnimatePresence } from "framer-motion";
import "./GravityOverlay.css";

const MOOD_COLORS = {
    happy: "#FFD54F",
    sad: "#42a5f5",
    angry: "#ef5350",
    stress: "#ff7043",
    calm: "#66bb6a",
    neutral: "#78909c",
};

export default function GravityOverlay({ mood }) {
    const color = MOOD_COLORS[mood] || MOOD_COLORS.neutral;

    return (
        <div className="gravity-overlay">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mood}
                    className="gravity-badge"
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span
                        className="gravity-dot"
                        style={{ backgroundColor: color, color }}
                    />
                    <span className="gravity-label">{mood}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
