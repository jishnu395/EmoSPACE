import mongoose from "mongoose";

const emotionLogSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  emotion: {
    type: String,
    required: true,
    enum: ["joy", "sadness", "anger", "fear", "disgust", "surprise", "neutral"],
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const EmotionLog = mongoose.model("EmotionLog", emotionLogSchema);

export default EmotionLog;
