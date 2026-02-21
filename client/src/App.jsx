import { useState, useMemo } from "react";
import Background from "./components/Background";
import WeatherEffect from "./components/WeatherEffect";
import Character from "./components/Character";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import AngryScene from "./components/AngryScene";
import LandingPage from "./components/LandingPage";
import GravityOverlay from "./components/GravityOverlay";
import MoodTransition from "./components/MoodTransition";
import "./index.css";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [mood, setMood] = useState("neutral");
  const [messages, setMessages] = useState([]);

  // Add a message (user or bot)
  const handleMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Track the last bot reply to avoid immediate repeats
  const lastBotReply = useMemo(() => {
    const botMsgs = messages.filter((m) => m.sender === "bot");
    return botMsgs.length > 0 ? botMsgs[botMsgs.length - 1].text : "";
  }, [messages]);

  // Show typing indicator while InputBar is awaiting API response
  const isTyping = useMemo(() => {
    if (messages.length === 0) return false;
    return messages[messages.length - 1].sender === "user";
  }, [messages]);

  /* ---- Landing Page ---- */
  if (currentView === "landing") {
    return (
      <LandingPage onEnter={() => setCurrentView("simulation")} />
    );
  }

  /* ---- Simulation View ---- */
  return (
    <div className="app">
      {/* --- Environment Layers (Back → Front) --- */}
      <Background mood={mood} />
      <AngryScene mood={mood} />
      <WeatherEffect mood={mood} />

      {mood !== "angry" && mood !== "happy" && mood !== "neutral" && mood !== "calm" && mood !== "stress" && mood !== "sad" && (
        <Character mood={mood} />
      )}

      {/* --- Feedback Overlays --- */}
      <MoodTransition mood={mood} />
      <GravityOverlay mood={mood} />

      {/* --- UI Layer --- */}
      <div className="ui-center">
        <InputBar
          setMood={setMood}
          onMessage={handleMessage}
          lastBotReply={lastBotReply}
        />
        <ChatWindow messages={messages} isTyping={isTyping} mood={mood} />
      </div>
    </div>
  );
}