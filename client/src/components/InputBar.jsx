import { useState } from "react";
import axios from "axios";
import { pickReply } from "../config/replyBank";

const API_BASE = "http://127.0.0.1:8000";

// Hartmann label → moodConfig key (for background changes)
const EMOTION_TO_MOOD = {
  joy: "happy",
  surprise: "happy",   // surprise → joy bucket
  sadness: "sad",
  fear: "stress",  // fear → stress background
  disgust: "angry",   // disgust → anger bucket
  anger: "angry",
  neutral: "neutral",
};

/**
 * Keyword-based mood fallback used when the API server is unreachable.
 * Only maps the most obvious words — keeps it minimal.
 */
function detectMoodLocally(text) {
  const t = text.toLowerCase();
  if (/\b(happy|joy|great|amazing|excited|wonderful|love|good|glad|yay|awesome)\b/.test(t)) return "happy";
  if (/\b(sad|unhappy|cry|depressed|heartbroken|miss|lonely|grief|grief|hurt)\b/.test(t)) return "sad";
  if (/\b(angry|anger|furious|mad|rage|hate|annoyed|frustrated|irritated)\b/.test(t)) return "angry";
  if (/\b(stress|stressed|anxious|anxiety|worried|nervous|panic|overwhelmed|fear|scared)\b/.test(t)) return "stress";
  if (/\b(calm|peaceful|relax|serene|quiet|at ease|balanced|content|mindful)\b/.test(t)) return "calm";
  return "neutral";
}

export default function InputBar({ setMood, onMessage, lastBotReply }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // 1. Show user message immediately
    onMessage({ sender: "user", text: trimmed });
    setText("");
    setLoading(true);

    try {
      // 2. Call Hugging Face emotion API via our server
      const { data } = await axios.post(`${API_BASE}/chat`, {
        text: trimmed,
        session_id: "user1",
      });

      const { emotion } = data;

      // 3. Update background via detected emotion
      const mood = EMOTION_TO_MOOD[emotion] ?? "neutral";
      setMood(mood);

      // 4. Pick a reply from the correct emotion bucket
      const reply = pickReply(emotion, lastBotReply);
      onMessage({ sender: "bot", text: reply });

    } catch (err) {
      // Server unreachable or error — fall back to local keyword detection
      // so the background ALWAYS changes regardless of server status.
      console.warn("Emotion API unavailable — using local keyword fallback:", err.message);

      const localMood = detectMoodLocally(trimmed);
      setMood(localMood);  // ← background now always updates

      // Map local mood back to an emotion bucket for reply selection
      const moodToEmotion = {
        happy: "joy",
        sad: "sadness",
        angry: "anger",
        stress: "fear",
        calm: "calm",
        neutral: "neutral",
      };
      const fallbackEmotion = moodToEmotion[localMood] ?? "neutral";
      const reply = pickReply(fallbackEmotion, lastBotReply);
      onMessage({ sender: "bot", text: reply });

    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your feelings…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "…" : "Send"}
      </button>
    </form>
  );
}
