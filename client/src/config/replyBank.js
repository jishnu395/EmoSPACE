// ─── Reply bank grouped by emotion bucket ─────────────────────────────────
export const REPLIES = {
    joy: [
        "I'm so glad that happened. Want to share a little more about it?",
        "That sounds genuinely uplifting. It's nice to see things aligning for you.",
        "That's such a bright moment. How are you feeling right now?",
        "That's really beautiful to hear. It sounds like something meaningful happened for you.",
    ],
    sadness: [
        "It's okay to feel like this. What's been on your mind lately?",
        "That sounds difficult. What's been bothering you underneath it all?",
        "It's alright to pause here. You're allowed to move through this slowly.",
        "It seems like this has been building up. It's understandable that it feels this way.",
    ],
    anxiety: [
        "It makes sense you'd feel stretched. What's pulling at you the most?",
        "I can sense the pressure there. What part is taking up the most space in your mind?",
        "I can sense the pressure. Breaking it into smaller parts can help.",
        "That feels stretched thin. There's a lot of movement there — grounding yourself will help steady it.",
    ],
    calm: [
        "I can sense the ease there. What's helping you stay centered?",
        "That's a nice space to be in. What's supporting that feeling?",
        "There's something balanced about that. It sounds quietly strong.",
        "There's quiet confidence in that. It sounds balanced.",
    ],
    anger: [
        "I can understand that frustration. What's been repeating in your thoughts?",
        "It sounds like something crossed a line. What happened exactly?",
        "That sounds really frustrating. Your reaction makes sense — I can feel the intensity there.",
        "There's strong energy in that response. It's valid to feel upset.",
    ],
    neutral: [
        "Thanks for sharing that. What's next for you?",
        "Okay. What would you like to focus on?",
        "That sounds reasonable. I'm glad you mentioned it — we can move forward step by step.",
        "I get it. You're always welcome to take this conversation wherever it feels right.",
        "That makes sense. I'm glad you shared it here, and we can take this wherever you'd like.",
    ],
};

// ─── Hartmann label → bucket mapping ─────────────────────────────────────
const EMOTION_BUCKET = {
    joy: "joy",
    surprise: "joy",       // surprise → joy
    sadness: "sadness",
    fear: "anxiety",       // fear → anxiety
    disgust: "anger",      // disgust → anger
    anger: "anger",
    neutral: "neutral",
};

/**
 * Pick a random reply for the given Hartmann emotion label.
 * Avoids repeating the immediately previous reply.
 * Falls back to neutral if the emotion is unknown.
 *
 * @param {string} emotion   - Raw Hartmann label (e.g. "joy", "fear")
 * @param {string} lastReply - The last bot reply text (to avoid repeating)
 * @returns {string}
 */
export function pickReply(emotion, lastReply = "") {
    const bucket = EMOTION_BUCKET[emotion] ?? "neutral";
    const pool = REPLIES[bucket];

    // Filter out the last reply if possible
    const candidates = pool.length > 1
        ? pool.filter((r) => r !== lastReply)
        : pool;

    return candidates[Math.floor(Math.random() * candidates.length)];
}

/** The default greeting shown when the simulation view first loads */
export const GREETING = "I'm glad you're here. Whenever you're ready, we can begin.";
