import { InferenceClient } from "@huggingface/inference";
import EmotionLog from "../models/EmotionLog.js";

const client = new InferenceClient(process.env.HF_TOKEN);

// Normalize the HF model labels to our app labels
const LABEL_MAP = {
    joy: "joy",
    sadness: "sadness",
    anger: "anger",
    fear: "fear",
    disgust: "disgust",
    surprise: "surprise",
    neutral: "neutral",
};

/**
 * POST /chat
 * Request body: { "text": "...", "session_id": "user1" }
 * Response:     { "emotion": "joy", "score": 0.97 }
 *
 * The Hugging Face textClassification API returns a NESTED array:
 *   [[{ label: "joy", score: 0.97 }, { label: "anger", score: 0.01 }, ...]]
 * We flatten it before processing.
 */
export async function detectEmotion(req, res) {
    try {
        const { text, session_id } = req.body;

        // ── Validate input ──────────────────────────────────
        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({ error: "Text is required." });
        }
        if (text.length > 5000) {
            return res
                .status(400)
                .json({ error: "Text must be under 5000 characters." });
        }

        console.log(
            `📩 [${session_id || "anon"}] Detecting emotion for: "${text.trim().slice(0, 80)}…"`
        );

        // ── Call Hugging Face Inference API ──────────────────
        const output = await client.textClassification({
            model: "j-hartmann/emotion-english-distilroberta-base",
            inputs: text.trim(),
            provider: "hf-inference",
        });

        console.log("🤖 HF raw response:", JSON.stringify(output));

        // ── Parse response (handle nested arrays) ───────────
        // HF can return [[{…}]] or [{…}] depending on SDK version
        let results = output;
        if (Array.isArray(results) && results.length > 0 && Array.isArray(results[0])) {
            results = results[0]; // Flatten: [[{…}]] → [{…}]
        }

        if (!results || !Array.isArray(results) || results.length === 0) {
            return res.status(502).json({ error: "No response from emotion model." });
        }

        // ── Pick the top-scoring emotion ────────────────────
        const top = results.reduce((best, curr) =>
            curr.score > best.score ? curr : best
        );

        const emotion = LABEL_MAP[top.label] || "neutral";
        const score = parseFloat(top.score.toFixed(4));

        console.log(`✅ Detected: ${emotion} (${score})`);

        // ── Save to MongoDB (non-fatal if DB is down) ───────
        try {
            await EmotionLog.create({
                text: text.trim(),
                emotion,
                score,
                sessionId: session_id || "anon",
            });
        } catch (dbErr) {
            console.warn("⚠️ Failed to save to DB:", dbErr.message);
        }

        // ── Always return JSON ──────────────────────────────
        return res.json({ emotion, score });
    } catch (err) {
        console.error("❌ Emotion detection error:", err);

        if (
            err.message?.includes("401") ||
            err.message?.includes("Authorization")
        ) {
            return res
                .status(401)
                .json({ error: "Invalid Hugging Face API token." });
        }

        // Never return plain text — always JSON
        return res
            .status(500)
            .json({ error: "Failed to detect emotion. Please try again." });
    }
}

/**
 * GET /api/emotion/history
 * Returns the most recent emotion logs as JSON
 */
export async function getHistory(req, res) {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 200);
        const logs = await EmotionLog.find()
            .sort({ timestamp: -1 })
            .limit(limit)
            .select("text emotion score timestamp");

        return res.json(logs);
    } catch (err) {
        console.error("❌ History fetch error:", err);
        return res.status(500).json({ error: "Failed to fetch history." });
    }
}
