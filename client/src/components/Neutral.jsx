import "./Neutral.css";
import neutralBg from "../assets/backgrounds/neutral_bg.jpeg";
import whiteCloud from "../assets/effects/whitecloud_sprite.png";

export default function Neutral() {
  const clouds = [
    { id: 1, top: "1%", left: "1%", width: "220px"}, 
    { id: 2, top: "1%", left: "22%", width: "120px"}, 
    { id: 3, top: "35%", left: "22%", width: "120px"}, 
    { id: 4, top: "6%", left: "32.5%", width: "450px", scaleY: 0.7}, 
    // { id: 5, top: "10%", left: "50%", width: "390px"}, 
    { id: 6, top: "26%", left: "77%", width: "170px"}, 
    { id: 7, top: "30%", left: "9%", width: "400px"}, 
    { id: 8, top: "42%", left: "-5%", width: "400px"},
    { id: 9, top: "38%", left: "85%", width: "400px", scaleY: 0.7},
  ];

return (
  <div className="neutral-layer">
    <img src={neutralBg} alt="neutral" className="neutral-bg" />

    <div className="cloud-track">
      {/* First copy */}
      {clouds.map((cloud) => (
        <img
          key={cloud.id}
          src={whiteCloud}
          alt="cloud"
          className="neutral-cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            ...(cloud.scaleY && { "--scaleY": cloud.scaleY })
          }}
        />
      ))}

      {/* Duplicate copy for seamless loop */}
      {clouds.map((cloud) => (
        <img
          key={"dup-" + cloud.id}
          src={whiteCloud}
          alt="cloud"
          className="neutral-cloud"
          style={{
            top: cloud.top,
            left: `calc(${cloud.left} + 100vw)`,
            width: cloud.width,
            ...(cloud.scaleY && { "--scaleY": cloud.scaleY })
          }}
        />
      ))}
    </div>
  </div>
);
}