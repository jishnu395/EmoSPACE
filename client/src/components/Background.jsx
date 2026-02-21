import { motion, AnimatePresence } from "framer-motion";
import { moodConfig } from "../config/moodConfig";
import FlowerField from "./FlowerField";
import "./Background.css";

export default function Background({ mood }) {
  const bg = moodConfig[mood]?.bg;

  let style = {};

  if (mood === "neutral") {
    style = {
      background: "linear-gradient(to top, #c7f0a6, #a8e080)",
    };
  } else if (bg) {
    style = {
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        className="background"
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {mood === "happy" && (
          <>
            <div className="sun-overlay" />
            <FlowerField />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}