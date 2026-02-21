import { motion } from "framer-motion";
import "./LandingPage.css";
import landingBg from "../assets/backgrounds/landing page bg.jpeg";

const TITLE = "EmoSPACE".split("");

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 18 }
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function LandingPage({ onEnter }) {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      {/* Everything centred together */}
      <motion.div
        className="landing-content"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.p className="landing-welcome" variants={fadeUp}>
          ✦ Welcome To ✦
        </motion.p>

        <motion.h1 className="landing-title" variants={containerVariants}>
          {TITLE.map((ch, i) => (
            <motion.span key={i} variants={letterVariants} className="title-letter">
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p className="landing-team" variants={fadeUp}>
          TEAM: 404_NOT_FURRED
        </motion.p>

        <motion.button
          className="landing-enter-btn"
          variants={fadeUp}
          onClick={onEnter}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter EmoSPACE →
        </motion.button>
      </motion.div>
    </div>
  );
}
