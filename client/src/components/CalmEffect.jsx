import "./CalmEffect.css";
import flower from "../assets/effects/flower_sprite.png";

export default function CalmEffect() {
  // Editable flower settings
  const flowers = [
    { top: "0.5%", left: "0.5%", size: 400, duration: 60, direction: "normal" },
    { top: "-17%", left: "25%", size: 350, duration: 60, direction: "reverse" },
    { top: "-12%", left: "75%", size: 250, duration: 70, direction: "normal" },
    { top: "-5%", left: "95%", size: 150, duration: 90, direction: "reverse" },

    { top: "38%", left: "25%", size: 150, duration: 75, direction: "normal" },
    { top: "45%", left: "35%", size: 70, duration: 65, direction: "reverse" },
    { top: "25%", left: "35%", size: 175, duration: 85, direction: "normal" },
    { top: "12%", left: "87.5%", size: 120, duration: 70, direction: "reverse" },//

    { top: "91.5%", left: "-2.2%", size: 90, duration: 60, direction: "normal" },
    { top: "75%", left: "30%", size: 400, duration: 80, direction: "reverse" },
    { top: "65%", left: "90%", size: 350, duration: 85, direction: "normal" },
    { top: "85%", left: "80%", size: 150, duration: 75, direction: "reverse" },
    { top: "43%", left: "70%", size: 360, duration: 60, direction: "normal" }
  ];

  return (
    <div className="calm-layer">
      {flowers.map((item, index) => (
        <img
          key={index}
          src={flower}
          className="calm-flower"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            animationDuration: `${item.duration}s`,
            animationDirection: item.direction
          }}
          alt="flower"
        />
      ))}
    </div>
  );
}