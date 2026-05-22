import { useEffect, useState } from "react";

export default function LiveRadar({ burnout, features }) {
  const [liveScore, setLiveScore] = useState(burnout);
const [spike, setSpike] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
//       setLiveScore((prev) => {
//       let change = (Math.random() - 0.5) * 1.5; // small base movement

// // if very stable → still tiny movement
// if (Math.abs(change) < 0.3) {
//   change += (Math.random() - 0.5) * 0.8;
// }
//         // 🔥 intelligent factors
//         const late = features?.late_night_intensity || 0;
//         const weekend = features?.weekend_ratio || 0;
//         const volatility = features?.volatility_index || 0;

//         // 🌙 late night pushes burnout up
//         change += late * 0.05;

//         // 📅 weekend work adds pressure
//         change += weekend * 0.04;

//         // 📊 unstable work = spikes
//         change += (Math.random() - 0.5) * volatility * 0.1;

//         // 💚 recovery chance
//         if (Math.random() < 0.3) {
//           change -= Math.random() * 5;
//         }

//         let next = prev + change;

//         return Math.max(0, Math.min(100, next));
//       });
// let change = (Math.random() - 0.5) * 0.5; // base movement

// const late = features?.late_night_intensity || 0;
// const weekend = features?.weekend_ratio || 0;
// const volatility = features?.volatility_index || 0;

// // normal influence
// change += late * 0.03;
// change += weekend * 0.02;
// change += (Math.random() - 0.5) * volatility * 0.05;

// // 💥 SHOCK SPIKE (10% chance)
// if (Math.random() < 0.1) {
//   const spike = (Math.random() * 10) + 5; // 5–15 jump

//   if (Math.random() < 0.7) {
//     change += spike; // stress spike
//   } else {
//     change -= spike; // recovery drop
//   }
//   if (Math.random() < 0.1) {
//   setSpike(true);

//   setTimeout(() => setSpike(false), 1000);
// }
// }
setLiveScore((prev) => {
  let change = (Math.random() - 0.5) * 0.3; // base movement

  const late = features?.late_night_intensity || 0;
  const weekend = features?.weekend_ratio || 0;
  const volatility = features?.volatility_index || 0;

  // normal influence
  change += late * 0.03;
  change += weekend * 0.02;
  change += (Math.random() - 0.5) * volatility * 0.05;

  // 💥 SHOCK SPIKE (10% chance)
  if (Math.random() < 0.1) {
    const spikeValue = (Math.random() * 10) + 5;

    if (Math.random() < 0.7) {
      change += spikeValue;
    } else {
      change -= spikeValue;
    }
if (Math.abs(change) < 0.2) {
  change += (Math.random() - 0.5) * 0.8;
}
    // trigger spike UI
    setSpike(true);
    setTimeout(() => setSpike(false), 1000);
  }

  let next = prev + change;

  return Math.max(0, Math.min(100, next));
});
    }, 1200);

    return () => clearInterval(interval);
  }, [features]);

  const getStatus = () => {
    if (liveScore < 40) return "🟢 STABLE";
    if (liveScore < 70) return "🟡 PRESSURE";
    return "🔴 CRITICAL";
  };

  const getAIThought = () => {
    if (features?.late_night_intensity > 40)
      return "Late-night activity increasing fatigue 🌙";

    if (features?.weekend_ratio > 30)
      return "Weekend workload is too high 📅";

    if (features?.volatility_index > 40)
      return "Your work pattern is unstable 📊";

    return "Your workflow is under control 👍";
  };

  const getColor = () => {
    if (liveScore < 40) return "#00ff99";
    if (liveScore < 70) return "#facc15";
    return "#ef4444";
  };

  return (
    <div
      className="card card-wide"
      style={{
        marginTop: "20px",
        textAlign: "center",
        border: `1px solid ${getColor()}`,
        boxShadow: `0 0 40px ${getColor()}40`,
      }}
    >
      <h2>🧠 Live Burnout Radar</h2>

      <p style={{ fontSize: "12px", color: "#94a3b8" }}>
        REAL-TIME ANALYSIS
      </p>

      <h1 style={{ fontSize: "42px", color: getColor() }}>
        {liveScore.toFixed(1)}%
      </h1>

      <p>{getStatus()}</p>

      {/* Pulse */}
      <div
        style={{
          margin: "20px auto",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: getColor(),
          animation: "pulse 1.5s infinite",
        }}
      />
      {spike && (
  <p style={{ color: "#ef4444", marginTop: "10px" }}>
    ⚡ Sudden stress spike detected
  </p>
)}

      <p style={{
        marginTop: "10px",
        fontStyle: "italic",
        color: "#cbd5e1"
      }}>
        🤖 {getAIThought()}
      </p>
    </div>
  );
}