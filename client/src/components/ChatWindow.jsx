import { useEffect, useRef } from "react";
import "./ChatWindow.css";
import { GREETING } from "../config/replyBank";

export default function ChatWindow({ messages = [], isTyping = false, mood = "neutral" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (isNearBottom || isTyping) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages, isTyping]);

  return (
    <div className={`chat-window chat-mood-${mood}`} ref={containerRef}>
      <div className="chat-greeting">{GREETING}</div>

      {messages.length === 0 && !isTyping ? (
        <div className="chat-placeholder">Share how you're feeling…</div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`chat-row ${msg.sender}`}>
            {msg.sender === "bot" && <div className="chat-avatar">✦</div>}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))
      )}

      {isTyping && (
        <div className="chat-row bot">
          <div className="chat-avatar">✦</div>
          <div className="chat-typing">
            <span /><span /><span />
          </div>
        </div>
      )}
    </div>
  );
}
