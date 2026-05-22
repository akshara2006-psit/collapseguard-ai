// import { useState, useMemo } from "react";

// export default function DigitalTwin({ latestBurnout, features }) {
//   // 🎛️ Controls (user controls behavior)
//   const [lateNight, setLateNight] = useState(40);
//   const [weekend, setWeekend] = useState(30);
//   const [volatility, setVolatility] = useState(40);

         
//   // 🧠 Digital Twin Brain
//  const twinScore = useMemo(() => {
//   const base = latestBurnout;

//   const currentLate = features?.late_night_intensity || 0;
//   const currentWeekend = features?.weekend_ratio || 0;
//   const currentVolatility = features?.volatility_index || 0;

//   // 🔥 calculate DIFFERENCE (this is key)
//   const deltaLate = lateNight - currentLate;
//   const deltaWeekend = weekend - currentWeekend;
//   const deltaVolatility = volatility - currentVolatility;

//   let score = base;

//   score += deltaLate * 0.2;
//   score += deltaWeekend * 0.15;
//   score += deltaVolatility * 0.2;

//   return Math.max(0, Math.min(100, score));
// }, [lateNight, weekend, volatility, latestBurnout, features]);

//   // 🎨 Status
//   const getStatus = () => {
//     if (twinScore < 40) return "🟢 Stable Future";
//     if (twinScore < 70) return "🟡 Risk Building";
//     return "🔴 Burnout Likely";
//   };

//   const getColor = () => {
//     if (twinScore < 40) return "#00ff99";
//     if (twinScore < 70) return "#facc15";
//     return "#ef4444";
//   };

//   const getInsight = () => {
//     if (lateNight > 60)
//       return "Late-night work is pushing your future burnout up 🌙";

//     if (weekend > 50)
//       return "Too much weekend work is reducing recovery 📅";

//     if (volatility > 60)
//       return "Unstable workflow is causing stress spikes 📊";

//     return "Your future looks balanced 👍";
//   };
//    const difference = (twinScore - latestBurnout).toFixed(1);

//   return (
//     <div style={{ color: "white" }}>
//       <h1 style={{ marginBottom: "20px" }}>🧠 Your Digital Twin</h1>

//       {/* 🎛️ Controls */}
//       <div
//         className="card card-wide"
//         style={{
//           marginBottom: "30px",
//           padding: "20px",
//         }}
//       >
//         <h2>🎛️ Control Your Future Behavior</h2>

//         {/* Late Night */}
//         <div style={{ marginTop: "20px" }}>
//             <div style={{ marginBottom: "10px", color: "#94a3b8" }}>
//   Current You: {latestBurnout.toFixed(1)}%
// </div>
//           <p>🌙 Late Night Work: 
//           {lateNight}%</p>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={lateNight}
//             onChange={(e) => setLateNight(Number(e.target.value))}
//             style={{ width: "100%" }}
//           />
//         </div>

//         {/* Weekend */}
//         <div style={{ marginTop: "20px" }}>
//           <p>📅 Weekend Work: {weekend}%</p>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={weekend}
//             onChange={(e) => setWeekend(Number(e.target.value))}
//             style={{ width: "100%" }}
//           />
//         </div>

//         {/* Volatility */}
//         <div style={{ marginTop: "20px" }}>
//           <p>📊 Work Instability: {volatility}%</p>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={volatility}
//             onChange={(e) => setVolatility(Number(e.target.value))}
//             style={{ width: "100%" }}
//           />
//           <p style={{
//   marginTop: "10px",
//   color: difference > 0 ? "#ef4444" : "#00ff99",
//   fontWeight: "600"
// }}>
//   {difference > 0
//     ? `⬆️ +${difference}% more burnout`
//     : `⬇️ ${difference}% recovery`}
// </p>
          
//         </div>
//       </div>

//       {/* 🧠 Twin Output */}
//       <div
//         className="card card-wide"
//         style={{
//           textAlign: "center",
//           border: `1px solid ${getColor()}`,
//           boxShadow: `0 0 40px ${getColor()}40`,
//         }}
//       >
//         <h2>🔮 Simulated Future You</h2>

//         <h1 style={{ fontSize: "48px", color: getColor() }}>
//           {twinScore.toFixed(1)}%
//         </h1>

//         <p style={{ fontSize: "18px" }}>{getStatus()}</p>

//         <p
//           style={{
//             marginTop: "15px",
//             fontStyle: "italic",
//             color: "#cbd5e1",
//           }}
//         >
//           🤖 {getInsight()}
//         </p>

//         {/* Pulse */}
//         <div
//           style={{
//             margin: "20px auto",
//             width: "18px",
//             height: "18px",
//             borderRadius: "50%",
//             background: getColor(),
//             animation: "pulse 1.5s infinite",
//           }}
//         />
//       </div>
//     </div>
//   );
// }



// import { useState, useMemo } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// function DigitalTwin({ currentBurnout = 26.5 }) {
//   const [lateNight, setLateNight] = useState(40);
//   const [weekend, setWeekend] = useState(30);
//   const [instability, setInstability] = useState(40);

//   // 🧠 SMART BURNOUT CALCULATION
//   const futureBurnout = useMemo(() => {
//     const total = lateNight + weekend + instability;

//     // FIX: no increase at 0
//     if (total === 0) return currentBurnout;

//     // non-linear realistic growth
//     let impact =
//       lateNight * 0.25 +
//       weekend * 0.2 +
//       instability * 0.3 +
//       (lateNight * instability) / 200;

//     let result = currentBurnout + impact / 5;

//     return Math.min(100, Math.max(0, result));
//   }, [lateNight, weekend, instability, currentBurnout]);

//   // 🧬 BEST VERSION (ideal low inputs)
//   const bestFuture = currentBurnout - 8;
// const daysToRisk = Math.max(1, Math.round((80 - futureBurnout) / 3));
//   // 📉 TREND GRAPH (next 7 days)
//   const trendData = useMemo(() => {
//     return Array.from({ length: 7 }).map((_, i) => ({
//       day: `Day ${i + 1}`,
//       burnout: Math.min(100, futureBurnout + i * 2),
//     }));
//   }, [futureBurnout]);

//   // 🧠 AI TWIN MESSAGE
//   const twinMessage = useMemo(() => {
//     if (futureBurnout > 75)
//       return "⚠️ Your future self is heading toward burnout risk zone!";
//     if (futureBurnout > 55)
//       return "⚡ Your habits are increasing stress gradually.";
//     if (futureBurnout > 35)
//       return "🙂 You're somewhat balanced but can improve.";
//     return "🌿 Your future looks stable and healthy.";
//   }, [futureBurnout]);
// const getColor = () => {
//   if (futureBurnout > 70) return "red";
//   if (futureBurnout > 50) return "orange";
//   return "lightgreen";
// };
//   // 🎯 RECOMMENDATIONS
//   const recommendations = useMemo(() => {
//     let tips = [];
//     if (lateNight > 50) tips.push("Reduce late-night work 🌙");
//     if (weekend > 50) tips.push("Take weekends for recovery 🧘");
//     if (instability > 50) tips.push("Stabilize your work schedule 📊");
//     if (tips.length === 0) tips.push("Maintain this balanced routine 👍");
//     return tips;
//   }, [lateNight, weekend, instability]);

//   // ⚡ QUICK MODES
//   const setMode = (mode) => {
//     if (mode === "hard") {
//       setLateNight(80);
//       setWeekend(80);
//       setInstability(70);
//     } else if (mode === "recovery") {
//       setLateNight(10);
//       setWeekend(10);
//       setInstability(10);
//     } else {
//       setLateNight(40);
//       setWeekend(30);
//       setInstability(40);
//     }
//   };
// const mainCause = useMemo(() => {
//   const max = Math.max(lateNight, weekend, instability);
//   if (max === lateNight) return "Late-night work is the biggest risk 🌙";
//   if (max === weekend) return "Weekend overload is hurting recovery 📅";
//   return "Unstable schedule is increasing stress 📊";
// }, [lateNight, weekend, instability]);
//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-3xl font-bold mb-4">🧠 Your Digital Twin</h1>

//       {/* CONTROLS */}
//       <div className="card mb-6">
//         <h2 className="text-xl mb-2">Control Your Future Behavior</h2>

//         <p>Current You: {currentBurnout}%</p>

//         <label>Late Night Work: {lateNight}%</label>
//         <input
//           type="range"
//           value={lateNight}
//           onChange={(e) => setLateNight(Number(e.target.value))}
//         />

//         <label>Weekend Work: {weekend}%</label>
//         <input
//           type="range"
//           value={weekend}
//           onChange={(e) => setWeekend(Number(e.target.value))}
//         />

//         <label>Work Instability: {instability}%</label>
//         <input
//           type="range"
//           value={instability}
//           onChange={(e) => setInstability(Number(e.target.value))}
//         />

//         {/* WHAT IF BUTTONS */}
//         <div className="mt-3">
//           <button onClick={() => setMode("hard")}>🔥 Push Hard</button>
//           <button onClick={() => setMode("balanced")}>⚖️ Balanced</button>
//           <button onClick={() => setMode("recovery")}>🌿 Recovery</button>
//         </div>
//       </div>

//       {/* TWIN COMPARISON */}
//       <div className="card mb-6">
//         <h2>🧬 Twin Comparison</h2>
//         <p>Current You: {currentBurnout}%</p>
//         <h1 style={{ color: getColor() }}>
//   {futureBurnout.toFixed(1)}%
// </h1>
//         <p>Best Possible You: {bestFuture.toFixed(1)}%</p>
//       </div>
// {futureBurnout > 60 && (
//   <div className="card" style={{ border: "2px solid red" }}>
//     ⚠️ High Burnout Risk Detected!
//     <p>Your current behavior may lead to serious burnout in 3–5 days.</p>
//   </div>
// )}
//       {/* FUTURE RESULT */}
//       <div className="card mb-6">
//         <h2>🔮 Simulated Future You</h2>
//         <h1 className="text-4xl">{futureBurnout.toFixed(1)}%</h1>
//         <p>{twinMessage}</p>
//         <p>🔍 Main Cause: {mainCause}</p>
//         <p>⏳ Estimated burnout risk in {daysToRisk} days</p>
//       </div>

//       {/* TREND GRAPH */}
//       <div className="card mb-6">
//         <h2>📉 7-Day Burnout Trend</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={trendData}>
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="burnout" stroke="#00ffcc" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* RECOMMENDATIONS */}
//       <div className="card">
//         <h2>🎯 AI Recommendations</h2>
//         <ul>
//           {recommendations.map((tip, i) => (
//             <li key={i}>👉 {tip}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default DigitalTwin;

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DigitalTwin({ currentBurnout = 26.5 }) {
  const [userInput, setUserInput] = useState("");
const [chatHistory, setChatHistory] = useState([]);
  const [lateNight, setLateNight] = useState(40);
  const [weekend, setWeekend] = useState(30);
  const [instability, setInstability] = useState(40);

  // 🧠 SMART BURNOUT CALCULATION
  const futureBurnout = useMemo(() => {
    const total = lateNight + weekend + instability;
    if (total === 0) return currentBurnout;

    let impact =
      lateNight * 0.25 +
      weekend * 0.2 +
      instability * 0.3 +
      (lateNight * instability) / 200;

    let result = currentBurnout + impact / 5;
    return Math.min(100, Math.max(0, result));
  }, [lateNight, weekend, instability, currentBurnout]);

  // 🧬 BEST VERSION
  const bestFuture = currentBurnout - 8;

  const daysToRisk = Math.max(1, Math.round((80 - futureBurnout) / 3));

  // 📉 7-DAY TREND
  const trendData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      day: `Day ${i + 1}`,
      burnout: Math.min(100, futureBurnout + i * 2),
    }));
  }, [futureBurnout]);

  // 🧬 5-WEEK TIMELINE
  const futureTimeline = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      let value = futureBurnout + i * (futureBurnout > 60 ? 3 : 1.5);
      return {
        label: `Week ${i + 1}`,
        burnout: Math.min(100, value),
      };
    });
  }, [futureBurnout]);

  // 🧠 AI MESSAGE
  const twinMessage = useMemo(() => {
    if (futureBurnout > 75)
      return "⚠️ Your future self is heading toward burnout risk zone!";
    if (futureBurnout > 55)
      return "⚡ Your habits are increasing stress gradually.";
    if (futureBurnout > 35)
      return "🙂 You're somewhat balanced but can improve.";
    return "🌿 Your future looks stable and healthy.";
  }, [futureBurnout]);

  const getColor = () => {
    if (futureBurnout > 70) return "red";
    if (futureBurnout > 50) return "orange";
    return "lightgreen";
  };
// 🧠 AI DIGITAL TWIN PERSONALITY
const twinPersonality = useMemo(() => {
  if (futureBurnout > 75) {
    return {
      mood: "⚠️ Critical",
      message:
        "I'm your future self... and honestly, I'm exhausted. If you continue like this, burnout is inevitable. You need rest, not more work.",
      tone: "red",
    };
  }

  if (futureBurnout > 55) {
    return {
      mood: "😓 Stressed",
      message:
        "Hey... things are getting heavy. You're pushing a bit too much. Try slowing down before it becomes overwhelming.",
      tone: "orange",
    };
  }

  if (futureBurnout > 35) {
    return {
      mood: "🙂 Balanced",
      message:
        "You're doing okay, but there's room for improvement. A bit more balance and you'll feel much better.",
      tone: "lightgreen",
    };
  }

  return {
    mood: "🌿 Healthy",
    message:
      "I'm feeling great! Your current habits are working well. Keep this balance and you'll stay in a good place.",
    tone: "lightgreen",
  };
}, [futureBurnout]);
const detectIntent = (text) => {
  text = text.toLowerCase();

  if (text.match(/burnout|stress|tired|exhausted/)) return "burnout";
  if (text.match(/improve|better|fix|help/)) return "improve";
  if (text.match(/future|predict|will i/)) return "future";
  if (text.match(/hello|hi|hey/)) return "greeting";

  return "general";
};
const getLastUserMessage = () => {
  const last = [...chatHistory].reverse().find(m => m.type === "user");
  return last?.text || "";
};
const getTone = () => {
  if (futureBurnout > 75) return "strict";
  if (futureBurnout > 55) return "concerned";
  if (futureBurnout > 35) return "calm";
  return "motivating";
};
const memory = useMemo(() => {
  return {
    burnoutMentioned: chatHistory.some(m =>
      m.text.toLowerCase().includes("burnout")
    ),
    emotionalState: chatHistory.some(m =>
      m.text.match(/sad|tired|overwhelmed/)
    ),
  };
}, [chatHistory]);
const generateResponse = (input) => {
  const text = input.toLowerCase(); // ✅ move here

  const intent = detectIntent(input);
  const lastMessage = getLastUserMessage();
  const tone = getTone();

if (
  lastMessage.includes("fine") &&
  text.includes("burnout")
) {
  return "You say you're fine… but you're asking about burnout. Something doesn't match.";
}
  // 🔴 Emotional detection FIRST
  if (text.match(/sad|low|depressed|overwhelmed/)) {
    return "I remember feeling like this. It's not just workload — it's the pressure you're putting on yourself.";
  }

  // 🔥 Tone override
  if (tone === "strict") {
    return "Listen. If you don't slow down, you're going to crash. I'm telling you because I've lived it.";
  }

  // 🧠 Context awareness
  if (intent === "general" && lastMessage.includes("burnout")) {
    return "You're still thinking about burnout. That means it's bothering you more than you admit.";
  }

  switch (intent) {
    case "burnout":
      return `You're currently at ${futureBurnout.toFixed(1)}%. ${twinPersonality.message}`;

case "improve":
  if (lateNight > weekend && lateNight > instability) {
    return `Your late-night work (${lateNight}%) is your biggest problem. Fix that first.`;
  }
  if (weekend > instability) {
    return `You're overworking weekends (${weekend}%). You need recovery time.`;
  }
  return `Your unstable schedule (${instability}%) is stressing you. Try consistency.`;

    case "future":
      return `If nothing changes, you'll hit risk in ${daysToRisk} days.`;

    case "greeting":
      return "Hey… I'm you from the future. Ask me something real.";

    default:
      return "You're avoiding the real question. Ask me what's actually bothering you.";
  }
};
const handleChat = () => {
  if (!userInput.trim()) return;

  const reply = generateResponse(userInput);

setChatHistory(prev => [
  ...prev,
  { type: "user", text: userInput },
  { type: "ai", text: reply },
]);

  setUserInput("");
};
  // 🎯 RECOMMENDATIONS
  const recommendations = useMemo(() => {
    let tips = [];
    if (lateNight > 50) tips.push("Reduce late-night work 🌙");
    if (weekend > 50) tips.push("Take weekends for recovery 🧘");
    if (instability > 50) tips.push("Stabilize your work schedule 📊");
    if (tips.length === 0) tips.push("Maintain this balanced routine 👍");
    return tips;
  }, [lateNight, weekend, instability]);

  // ⚡ QUICK MODES
  const setMode = (mode) => {
    if (mode === "hard") {
      setLateNight(80);
      setWeekend(80);
      setInstability(70);
    } else if (mode === "recovery") {
      setLateNight(10);
      setWeekend(10);
      setInstability(10);
    } else {
      setLateNight(40);
      setWeekend(30);
      setInstability(40);
    }
  };

  // 🧠 MAIN CAUSE
  const mainCause = useMemo(() => {
    const max = Math.max(lateNight, weekend, instability);
    if (max === lateNight) return "Late-night work is the biggest risk 🌙";
    if (max === weekend) return "Weekend overload is hurting recovery 📅";
    return "Unstable schedule is increasing stress 📊";
  }, [lateNight, weekend, instability]);

  // 🧠 IMPACT BREAKDOWN
  const impactBreakdown = {
    lateNight: (lateNight * 0.25).toFixed(1),
    weekend: (weekend * 0.2).toFixed(1),
    instability: (instability * 0.3).toFixed(1),
  };

  return (
    <div className="p-6 text-white">
      <h1
  className="text-3xl font-bold"
  style={{ marginBottom: "30px" }}
> Your Digital Twin</h1>

      {/* CONTROLS */}
      <div className="card mb-8" style={{ marginBottom: "20px" }}>
        <h2>Control Your Future Behavior</h2>
        <p>Current You: {currentBurnout}%</p>

        <label>Late Night Work: {lateNight}%</label>
        <input type="range" value={lateNight} onChange={(e) => setLateNight(+e.target.value)} />

        <label>Weekend Work: {weekend}%</label>
        <input type="range" value={weekend} onChange={(e) => setWeekend(+e.target.value)} />

        <label>Work Instability: {instability}%</label>
        <input type="range" value={instability} onChange={(e) => setInstability(+e.target.value)} />

        <div className="mt-3" style={{ marginBottom: "20px" }}>
          <button onClick={() => setMode("hard")}>🔥 Push Hard</button>
          <button onClick={() => setMode("balanced")}>⚖️ Balanced</button>
          <button onClick={() => setMode("recovery")}>🌿 Recovery</button>
        </div>
      </div>

      {/* COMPARISON */}
      <div className="card mb-6"style={{ marginBottom: "20px" }}>
        <h2> Twin Comparison</h2>
        <p>Current: {currentBurnout}%</p>
        <h1 style={{ color: getColor() }}>{futureBurnout.toFixed(1)}%</h1>
        <p>Best Possible: {bestFuture.toFixed(1)}%</p>
      </div>

      {/* IMPACT */}
      <div className="card mb-6" style={{ marginBottom: "20px" }}>
        <h2> Behavior Impact</h2>
        <p>🌙 Late Night: +{impactBreakdown.lateNight}</p>
        <p>📅 Weekend: +{impactBreakdown.weekend}</p>
        <p>📊 Instability: +{impactBreakdown.instability}</p>
        <p>💡 {mainCause}</p>
      </div>

      {/* RESULT */}
      <div className="card mb-6" style={{ marginBottom: "20px" }}>
        <h2> Simulated Future</h2>
        <h1>{futureBurnout.toFixed(1)}%</h1>
        <p>{twinMessage}</p>
        <p>⏳ Risk in {daysToRisk} days</p>

        {/* RISK BAR */}
        <div style={{ height: 10, background: "#3d3a89", borderRadius: 10 }}>
          <div
            style={{
              width: `${futureBurnout}%`,
              height: "100%",
              background: getColor(),
              borderRadius: 10,
            }}
          />
        </div>
      </div>
{/* 🤖 AI DIGITAL TWIN */}
<div
  className="card mb-6"
  style={{
    border: `2px solid ${twinPersonality.tone}`,
    boxShadow: `0 0 20px ${twinPersonality.tone}`,
    marginBottom:"20px"
  }}
>
  <h2>🤖 Your Future Self Speaks</h2>

  <h3>{twinPersonality.mood}</h3>

  <p style={{ marginTop: "10px",marginBottom:"20px", fontStyle: "italic" }}>
    "{twinPersonality.message}"
  </p>
</div>
<div className="card mb-6"style={{ marginBottom: "20px" }}>
  <h2>💬 Talk to Your Future Self</h2>

  <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "10px" }}>
    {chatHistory.map((msg, i) => (
      <div
        key={i}
        style={{
          textAlign: msg.type === "user" ? "right" : "left",
          margin: "5px 0",
        }}
      >
        <span
          style={{
            background: msg.type === "user" ? "#007bff" : "#333",
            padding: "6px 10px",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          {msg.text}
        </span>
      </div>
    ))}
  </div>

  <div style={{ display: "flex", gap: "10px" }}>
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Ask your future self..."
      style={{ flex: 1, padding: "8px", borderRadius: "6px" }}
    />
    <button onClick={handleChat}>Send</button>
  </div>
</div>
      {/* TREND */}
      <div className="card mb-6" style={{ marginBottom: "20px" }}>
        <h2> 7-Day Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="burnout" stroke="#00ffcc" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TIMELINE */}
      <div className="card mb-6" style={{ marginBottom: "20px" }}>
        <h2> 5-Week Projection</h2>
        {futureTimeline.map((item, i) => (
          <div key={i}>
            {item.label}: {item.burnout.toFixed(1)}%
            <div style={{ height: 6, background: "#4a4fb5", borderRadius: 5 }}>
              <div
                style={{
                  width: `${item.burnout}%`,
                  height: "100%",
                  background:
                    item.burnout > 70
                      ? "red"
                      : item.burnout > 50
                      ? "orange"
                      : "lightgreen",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="card">
        <h2> AI Recommendations</h2>
        <ul>
          {recommendations.map((tip, i) => (
            <li key={i}>👉 {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DigitalTwin;