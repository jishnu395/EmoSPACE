import { Router } from "express";
import { detectEmotion, getHistory } from "../controllers/emotionController.js";

const router = Router();

router.post("/", detectEmotion);
router.get("/history", getHistory);

export default router;
