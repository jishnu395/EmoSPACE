import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { detectEmotion, getHistory } from "./controllers/emotionController.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware — allow requests from the React dev server
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json({ limit: "100kb" }));

// ─── Routes ───────────────────────────────────────────────
// Main emotion endpoint (matches the spec: POST /chat)
app.post("/chat", detectEmotion);

// History endpoint
app.get("/api/emotion/history", getHistory);

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ─── Global error handler (always returns JSON, never plain text) ─────
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────
async function start() {
    try {
        const mongoUri =
            process.env.MONGO_URI || "mongodb://localhost:27017/doraemon-emotion";
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
}

start();
