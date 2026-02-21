import { moodConfig } from "../config/moodConfig";
import rain from "../assets/effects/rain_sprite.png";
import cloud from "../assets/effects/cloud_sprite.png";
import bubble from "../assets/effects/bubble_sprite.png";
import thunder from "../assets/effects/thunder_sprite.png";
import sun from "../assets/effects/sun_sprite.png";
import flowerField from "../assets/effects/flowerfield_sprite.png";
import "./WeatherEffect.css";
import Neutral from "./Neutral";
import CalmEffect from "./CalmEffect";
import StressEffect from "./StressEffect";
import SadEffect from "./SadEffect";

export default function WeatherEffect({ mood }) {
  const effect = moodConfig[mood]?.effect;

  if (!effect) return null;

  return (
    <div className="weather-layer">


      {effect === "rainDiagonal" && <SadEffect />}
      {effect === "stressBubbles" && <StressEffect />} 
      {effect === "calm" && <CalmEffect />}
      {/* Neutral special clouds */}
      {effect === "clouds" && <Neutral />}
    
      {/* Fast clouds (stress) */}
      {effect === "fastClouds" && (
        <div
          className="effect fastClouds"
          style={{ backgroundImage: `url(${cloud})` }}
        />
      )}

      {/* Rain */}
      {effect === "rain" && (
        <div
          className="effect rain"
          style={{ backgroundImage: `url(${rain})` }}
        />
      )}

      {/* Bubbles */}
      {effect === "bubbles" && (
        <div
          className="effect bubbles"
          style={{ backgroundImage: `url(${bubble})` }}
        />
      )}

      {/* Thunder */}
      {effect === "thunder" && (
        <div
          className="effect thunder"
          style={{ backgroundImage: `url(${thunder})` }}
        />
      )}

      {/* Sun + flower field */}
      {effect === "sun" && (
        <>
          <img src={sun} alt="sun" className="sunEffect" />

          <div
            className="flower-field"
            style={{ backgroundImage: `url(${flowerField})` }}
          />
        </>
      )}

    </div>
  );
}