import "./SadEffect.css";
import cat from "../assets/character/cat_sprite.png";

export default function SadEffect() {
  // Control number of drops
  const drops = Array.from({ length: 120 });

  return (
    <>
      {/* Rain Layer */}
      <div className="sad-layer">
        {drops.map((_, index) => (
          <span
            key={index}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.8 + Math.random() * 0.7}s`
            }}
          />
        ))}
      </div>

      {/* Stationary Cat */}
      <img src={cat} className="sad-cat" alt="cat" />
    </>
  );
}