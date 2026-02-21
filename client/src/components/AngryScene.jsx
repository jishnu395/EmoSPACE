import { useEffect, useState } from "react";
import cat from "../assets/character/cat_sprite.png";
import cloud from "../assets/effects/cloud_sprite.png";
import thunder from "../assets/effects/thunder_sprite.png";
import "./AngryScene.css";

export default function AngryScene({ mood }) {
  const [activeThunder, setActiveThunder] = useState(null);

  // Trigger thunder randomly under one of the clouds
  useEffect(() => {
    if (mood !== "angry") return;

    const interval = setInterval(() => {
      const cloudIndex = Math.floor(Math.random() * 10) + 1;
      setActiveThunder(cloudIndex);

      // Thunder visible duration (matches CSS animation)
      setTimeout(() => {
        setActiveThunder(null);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, [mood]);

  if (mood !== "angry") return null;

  return (
    <div className="angry-layer">
      {/* Clouds */}
      {Array.from({ length: 10 }, (_, i) => (
        <img
          key={i}
          src={cloud}
          className={`cloud cloud-${i + 1}`}
          alt=""
        />
      ))}

      {/* Thunder (sprite) */}
      {activeThunder && (
        <img
          src={thunder}
          className={`thunder thunder-${activeThunder}`}
          alt=""
        />
      )}

      {/* Cat */}
      <img src={cat} className="angry-cat" alt="" />
    </div>
  );
}