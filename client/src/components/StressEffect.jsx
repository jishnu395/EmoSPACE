import "./StressEffect.css";
import bubbleImg from "../assets/effects/bubble_sprite.png";

export default function StressEffect() {
  // Editable bubble configuration
  const bubbles = [
    { top: "1%", left: "1%", size: 200 },
    { top: "1%", left: "50%", size: 280 },
    { top: "1%", left: "92%", size: 150 },
    { top: "75%", left: "2%", size: 280 },
    { top: "65%", left: "14%", size: 150 },
    { top: "69%", left: "78%", size: 280 },
    { top: "40%", left: "87%", size: 140 },
    { top: "19%", left: "9%", size: 85 },
    { top: "92%", left: "18%", size: 90 },
    { top: "55%", left: "75%", size: 100 },
    { top: "20%", left: "20%", size: 250 },
    { top: "92%", left: "60%", size: 100 },
    { top: "60%", left: "40%", size: 280 }
  ];

  return (
    <div className="stress-layer">
      {bubbles.map((bubble, index) => (
        <img
          key={index}
          src={bubbleImg}
          className="stress-bubble"
          style={{
            top: bubble.top,
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: `${index * 0.4}s`,
            animationDuration: `${3 + (index % 2)}s`
          }}
          alt="bubble"
        />
      ))}
    </div>
  );
}