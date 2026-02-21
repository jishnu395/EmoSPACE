import happy from "../assets/backgrounds/happy_bg.jpeg";
import sad from "../assets/backgrounds/sad_bg.jpeg";
import stress from "../assets/backgrounds/stress_bg.jpeg";
import calm from "../assets/backgrounds/calm_bg.jpeg";
import angry from "../assets/backgrounds/anger_bg.jpeg";
import neutral from "../assets/backgrounds/neutral_bg.jpeg";
import stressBg from "../assets/backgrounds/stress_bg.jpeg";
import StressEffect from "../components/StressEffect";


export const moodConfig = {
  happy: { bg: happy, effect: "sun" },
  sad: { bg: sad, effect: "rainDiagonal" },
  stress: { bg: stress, effect: "stressBubbles" },
  calm: { bg: calm, effect: "calm" },
  angry: { bg: angry, effect: "thunder" },
  neutral: { bg: neutral, effect: "clouds" }
};