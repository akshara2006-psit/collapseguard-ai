
// import logo from "../assets/logo.png";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import AIChat from "../components/AIChat";

// import "./heatmap.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function Dashboard() {
//   const [showTip, setShowTip] = useState(false);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const dataParam = queryParams.get("data");

//   if (!dataParam) return <h2 style={{ color: "white" }}>No Data Found</h2>;

//   const decoded = JSON.parse(decodeURIComponent(dataParam));
//   const [aiExplain, setAiExplain] = useState("");
// const [showModal, setShowModal] = useState(false);
// //   const explainBurnout = async () => {
// //   const res = await fetch("http://127.0.0.1:8000/ai-chat", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({
// //       message: "Explain why my burnout score is like this",
// //       burnout_score: decoded.burnout_score,
// //       burnout_status: decoded.burnout_status,
// //       features: decoded.feature_breakdown
// //     })
// //   });

// //   const data = await res.json();
// //   alert(data.reply); // or show modal
// // };
// const explainBurnout = async () => {
//   const res = await fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       message: "Explain why my burnout score is like this",
//       burnout_score: decoded.burnout_score,
//       burnout_status: decoded.burnout_status,
//       features: decoded.feature_breakdown
//     })
//   });

//   const data = await res.json();
//   setAiExplain(data.reply);
//   setShowModal(true);
// };
// //   const [typedText, setTypedText] = useState("");
// // const fullText = decoded.ai_coach || "Analyzing your behavior...";

// // useEffect(() => {
// //   let index = 0;
// //   setTypedText("");

// //   const interval = setInterval(() => {
// //     setTypedText((prev) => prev + fullText.charAt(index));
// //     index++;

// //     if (index >= fullText.length) {
// //       clearInterval(interval);
// //     }
// //   }, 20);

// //   return () => clearInterval(interval);
// // }, [fullText]);
// const [typedText, setTypedText] = useState("");

// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   if (!decoded.ai_coach) return;

//   let index = 0;
//   const text = decoded.ai_coach;

//   const interval = setInterval(() => {
//     index++;
//     setTypedText(text.slice(0, index)); // ✅ SAFE method

//     if (index >= text.length) {
//       clearInterval(interval);
//     }
//   }, 20);

//   return () => clearInterval(interval);
// }, [decoded.ai_coach]);
// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   setTimeout(() => {
//     setShowTip(true);
//   }, 800); // smooth delay like reward popup
// }, []);

//   const featureBreakdown = decoded.feature_breakdown || {};
//   const burnoutScores =
//     decoded.weekly_burnout_scores || [decoded.burnout_score];
//   const latestBurnout = burnoutScores[burnoutScores.length - 1];

//   const healthIndex = (100 - latestBurnout).toFixed(1);
//   let predictedBurnout = decoded.predicted_burnout ?? latestBurnout;

//   // Pattern detection
//   let pattern = "Balanced Developer";
//   if (featureBreakdown.weekend_ratio > 50) pattern = "Weekend Warrior";
//   else if (featureBreakdown.late_night_intensity > 40)
//     pattern = "Night Owl";
//   else if (featureBreakdown.volatility_index > 50)
//     pattern = "Burst Worker";

//   // Commit data
//   const weeklyActivity = decoded.weekly_commit_activity || {};
//   const rawCommits = Object.values(weeklyActivity);

//   const n = rawCommits.length;
//   const x = rawCommits.map((_, i) => i + 1);
//   const y = rawCommits;

//   const sumX = x.reduce((a, b) => a + b, 0);
//   const sumY = y.reduce((a, b) => a + b, 0);
//   const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
//   const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

//   const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
//   const b = (sumY - m * sumX) / (n || 1);

//   const predictedCommits = Number((m * (n + 1) + b).toFixed(2));

//   const commitData = rawCommits.map((val, i) => ({
//     week: `W${i + 1}`,
//     commits: val,
//   }));

//   commitData.push({
//     week: `W${n + 1}`,
//     predicted: predictedCommits,
//   });
  
//   // 🔮 Clean Future Burnout Forecast
// // const futureBurnoutTrend = [];

// // const recentScores = burnoutScores.slice(-4); // last 4 weeks
// // const weights = [0.1, 0.2, 0.3, 0.4];

// // // compute trend
// // let trend = 0;
// // for (let i = 1; i < recentScores.length; i++) {
// //   trend += (recentScores[i] - recentScores[i - 1]) * weights[i - 1];
// // }

// // // generate 4-week forecast
// // for (let i = 1; i <= 4; i++) {
// //   const decay = Math.pow(0.85, i); // optional decreasing trend
// //   const noise = (Math.random() - 0.5) * 2; // small ±1 burnout points
// //   const adjustment =
// //     (featureBreakdown.late_night_intensity || 0) * 0.03 +
// //     (featureBreakdown.weekend_ratio || 0) * 0.02 +
// //     (featureBreakdown.volatility_index || 0) * 0.04;

// //   let next = latestBurnout + i * trend * decay + noise + adjustment;
// //   next = Math.max(0, Math.min(100, next)); // clamp 0-100

// //   futureBurnoutTrend.push({ week: `+${i}`, burnout: Number(next.toFixed(1)) });
// // }
// // 🔮 Improved Future Burnout Forecast (Dynamic & Realistic)

// // 🔮 Realistic Human-like Burnout Forecast

// // const futureBurnoutTrend = [];

// // let lastValue = latestBurnout;

// // // detect recent direction (important)
// // const direction =
// //   burnoutScores.length > 1
// //     ? burnoutScores[burnoutScores.length - 1] -
// //       burnoutScores[burnoutScores.length - 2]
// //     : 0;

// // // behavior factors
// // const fatiguePressure =
// //   (featureBreakdown.late_night_intensity || 0) * 0.04 +
// //   (featureBreakdown.weekend_ratio || 0) * 0.03;

// // const recoveryChance = latestBurnout < 50 ? 0.6 : 0.3;

// // for (let i = 1; i <= 4; i++) {
// //   // strong random fluctuation
// //  let randomSwing = (Math.random() - 0.5) * 10;

// // // add occasional spike/drop
// // if (Math.random() < 0.3) {
// //   randomSwing += (Math.random() - 0.5) * 10;
// // }

// //   // recovery behavior
// //   if (Math.random() < recoveryChance) {
// //     randomSwing -= Math.random() * 8;
// //   }

// //   // gradual fatigue push
// //   let drift = fatiguePressure * (Math.random() * 2);

// //   let next =
// //     lastValue +
// //     randomSwing +
// //     drift +
// //     direction * 0.3; // trend influence

// //   // clamp 0–100
// //   next = Math.max(0, Math.min(100, next));

// //   futureBurnoutTrend.push({
// //     week: `+${i}`,
// //     burnout: Number(next.toFixed(1)),
// //   });

// //   lastValue = next; // 🔥 makes curve natural
// // }
// // const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);

// // useEffect(() => {
// //   fetch("http://127.0.0.1:8000/predict-burnout", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       burnout_history: burnoutScores,
// //       features: featureBreakdown,
// //     }),
// //   })
// //     .then(res => res.json())
// //     .then(data => {
// //       const formatted = data.prediction.map((val, i) => ({
// //         week: `+${i + 1}`,
// //         burnout: val,
// //       }));
// //       setFutureBurnoutTrend(formatted);
// //     })
// //     .catch(err => console.error(err));
// // }, [burnoutScores]);
// const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);
// const [isFlatPrediction, setIsFlatPrediction] = useState(false);

// useEffect(() => {
//   fetch("http://127.0.0.1:8000/predict-burnout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       burnout_history: burnoutScores,
//       features: featureBreakdown,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       const formatted = data.prediction.map((val, i) => ({
//         week: `+${i + 1}`,
//         burnout: val,
//       }));

//       setFutureBurnoutTrend(formatted);

//       // 🔥 detect flat prediction
//       const flat = formatted.every(
//         (p, i, arr) =>
//           i === 0 || Math.abs(p.burnout - arr[0].burnout) < 0.3
//       );

//       setIsFlatPrediction(flat);
//     })
//     .catch(err => console.error(err));
// }, [burnoutScores, featureBreakdown]);
// useEffect(() => {
//   if (!isFlatPrediction) return;

//   fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//      message: `
// Explain the pattern in my burnout prediction trend.

// If the trend is flat:
// - explain that behavior and inputs are stable

// If increasing:
// - explain workload pressure

// If decreasing:
// - explain recovery

// Be short, natural, and human-like (2 lines max).
// `,
//       burnout_score: decoded.burnout_score,
//       burnout_status: decoded.burnout_status,
//       features: decoded.feature_breakdown,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       setAiExplain(data.reply);
//     })
//     .catch(err => console.error(err));
// }, [isFlatPrediction]);

//   // Heatmap normalization
//   const today = new Date();
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(today.getFullYear() - 1);

//   const maxCount = Math.max(
//     ...decoded.heatmap.map((d) => d.count || 0)
//   );

//   const heatmapData = decoded.heatmap.map((d) => ({
//     date: d.date,
//     count: maxCount === 0 ? 0 : Math.round((d.count / maxCount) * 10),
//   }));

//   // Colors
//   let scoreColor = "#00ff99";
//   if (latestBurnout >= 40) scoreColor = "#facc15";
//   if (latestBurnout >= 60) scoreColor = "#f97316";
//   if (latestBurnout >= 80) scoreColor = "#ef4444";
// // 🔥 ADD BELOW YOUR EXISTING LOGIC (after calculations)

// const generateTimelineStory = () => {
//   const scores = decoded.weekly_burnout_scores || [];

//   if (scores.length < 2) {
//     return "Tracking will improve as more weekly data is collected 📊";
//   }

//   let story = "";

//   for (let i = 1; i < scores.length; i++) {
//     const diff = scores[i] - scores[i - 1];

//     if (diff > 5) {
//       story += `⚠️ Week ${i + 1}: Stress increased\n`;
//     } else if (diff < -5) {
//       story += `✅ Week ${i + 1}: Recovery phase\n`;
//     } else {
//       story += `➖ Week ${i + 1}: Stable\n`;
//     }
//   }

//   return story;
// };

// const getAlerts = () => {
//   let alerts = [];

//   if ((featureBreakdown.late_night_intensity || 0) > 30)
//     alerts.push("🌙 Late-night work detected");

//   if ((featureBreakdown.weekend_ratio || 0) > 20)
//     alerts.push("📅 Weekend work is higher than ideal");

//   if ((featureBreakdown.volatility_index || 0) > 35)
//     alerts.push("📊 Work pattern is unstable");

//   if (latestBurnout > 50)
//     alerts.push("🔥 Burnout risk rising");

//   return alerts;
// };

// const getWeeklyGoal = () => {
//   if (latestBurnout < 30) return "Maintain your current rhythm ✅";
//   if (latestBurnout < 60) return "Reduce 1–2 work sessions this week ⚖️";
//   return "Take 2 days off + reduce workload 🔴";
// };

// const focusScore = (
//   100 -
//   (featureBreakdown.volatility_index || 0) -
//   (featureBreakdown.late_night_intensity || 0) / 2
// ).toFixed(1);

// const alerts = getAlerts();
//   return (
//     <><div
//       style={{
//         display: "flex",
//         // background: "#0f172a",
//         background: "radial-gradient(circle at top, #0f172a, #020617)",
//         color: "white",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "220px",
//           background: "#111827",
//           padding: "30px",
//           position: "fixed",
//           height: "100vh",
//           textAlign: "center",
//         }}
//       >
//         <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h2>
//           Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
//         </h2>
//       </div>

//       {/* Main */}
//       <div
//         style={{
//           marginLeft: "220px",
//           padding: "40px",
//           width: "calc(100% - 220px)",
//           boxSizing: "border-box",
//         }}
//       >
//         <h1>Welcome, {decoded.username}</h1>

//         {/* AI Coach */}
//         {/* <div className="card" style={{ marginTop: "30px" }}>
//       <h2>🧠 AI Burnout Coach</h2>
//      <p style={{
// whiteSpace: "pre-line",
// lineHeight: "1.6",
// color: "#cbd5e1",
// fontFamily: "monospace"
// }}>
// {typedText}
// <span className="cursor">|</span>
// </p>

//     </div> */}
//         <div style={{
//           marginTop: "30px",
//           display: "flex",
//           alignItems: "flex-start",
//           gap: "15px"
//         }}>

//           {/* 🤖 AI Avatar */}
//           <div 
//           // style={{
//           //   width: "45px",
//           //   height: "45px",
//           //   borderRadius: "50%",
//           //   background: "linear-gradient(135deg, #00ff99, #00bfff)",
//           //   display: "flex",
//           //   alignItems: "center",
//           //   justifyContent: "center",
//           //   fontSize: "20px",
//           //   boxShadow: "0 0 15px rgba(0,255,150,0.5)"
//           // }}
//           style={{
//     background: "rgba(255,255,255,0.05)",
//     backdropFilter: "blur(12px)",
//     padding: "20px",
//     borderRadius: "20px",
//     maxWidth: "700px",
//     border: "1px solid rgba(255,255,255,0.08)",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//     transition: "0.3s"
//   }}
//           >
//             🤖
//           </div>

//           {/* 💬 Chat Bubble */}
//           <div
//             style={{
//               // background: "linear-gradient(145deg, #1e293b, #0f172a)",
//               background: "rgba(30,41,59,0.6)",
// backdropFilter: "blur(15px)",
// border: "1px solid rgba(255,255,255,0.1)",
//               padding: "20px",
//               borderRadius: "15px",
//               maxWidth: "700px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//               // border: "1px solid rgba(255,255,255,0.05)",
//               transition: "0.3s" // ✅ ADD HERE
//             }}

//             onMouseEnter={(e) => {
//               e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.2)";
//             } }

//             onMouseLeave={(e) => {
//               e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
//             } }
//           >

//             <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>
//               AI Burnout Coach
//             </h3>

//             <div style={{
//               whiteSpace: "pre-line",
//               lineHeight: "1.8",
//               color: "#e2e8f0",
//               fontFamily: "monospace"
//             }}>
//               {typedText}
//               <span className="cursor">|</span>
//             </div>

//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid">
//           <Card title="Burnout Score" value={latestBurnout} color={scoreColor} icon="🔥" />
//           <Card title="Health Index" value={healthIndex} color="#00ff99" icon="💚" />
//           <Card title="Next Week Commits" value={predictedCommits} color="#00bfff" icon="📈" />
//           <Card title="Burnout Risk" value={`${predictedBurnout}%`} color="#facc15" icon="⚠️" />
//           <Card title="Pattern" value={pattern} color="#a78bfa" icon="🧠" small />
//         </div>

//         {/* Why */}
        
//           {/* <h3>⚡ Why this score?</h3>
//           <ul>
//             {featureBreakdown.late_night_intensity > 30 && <li>Late night work</li>}
//             {featureBreakdown.work_streak_index > 50 && <li>Long streak</li>}
//             {featureBreakdown.volatility_index > 40 && <li>Irregular workload</li>}
//             {featureBreakdown.weekend_ratio > 40 && <li>Weekend work</li>}
//           </ul> */}
//           {/* <button onClick={explainBurnout} className="button-w">
//   Why this score?
// </button> */}
// <div style={{
//   display: "flex",
//   justifyContent: "center",
//   marginTop: "30px",
//   marginBottom: "10px"
// }}>
//   <button
//     onClick={explainBurnout}
//     style={{
//       padding: "14px 28px",
//       borderRadius: "30px",
//       border: "none",
//       cursor: "pointer",
//       fontWeight: "600",
//       fontSize: "15px",
//       color: "white",
// //       background: "linear-gradient(135deg, #00ff99, #00bfff)",
// // boxShadow: "0 0 20px rgba(0,255,150,0.4)",
// background: "linear-gradient(135deg, #3d4a5f, #1a2425)",
// boxShadow: "0 0 20px rgba(59,130,246,0.4)",
//       // background: "linear-gradient(135deg, #00ff99, #00bfff)",
//       // boxShadow: "0 10px 25px rgba(0,255,150,0.3)",
//       transition: "0.3s"
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "scale(1.05)";
//       e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.5)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "scale(1)";
//       e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,255,150,0.3)";
//     }}
//   >
//     ⚡ Why this score?
//   </button>
// </div>
        

//         {/* Heatmap */}
//         <div className="card">
//           <h2>Contribution Heatmap</h2>
//           <CalendarHeatmap
//             startDate={oneYearAgo}
//             endDate={today}
//             values={heatmapData}
//             gutterSize={4}
//             showMonthLabels
//             classForValue={(value) => {
//               if (!value || value.count === 0) return "color-empty";
//               if (value.count < 3) return "color-scale-1";
//               if (value.count < 6) return "color-scale-2";
//               if (value.count < 10) return "color-scale-3";
//               return "color-scale-4";
//             } } />
//         </div>

//         {/* Chart */}
//         <div className="card">
//           <h2>Commits Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={commitData}>
//               <CartesianGrid stroke="#333" />
//               <XAxis dataKey="week" />
//               <YAxis />
//               <Tooltip />
//               <Line dataKey="commits" stroke="#00ff99" />
//               <Line dataKey="predicted" stroke="#00bfff" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

// <div className="card" style={{ marginTop: "20px", position: "relative" }}>
//   <h2>🔮 Burnout Forecast (4 Weeks)</h2>
//   {aiExplain && (
//   <div style={{
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "rgba(30,41,59,0.9)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     padding: "12px 16px",
//     borderRadius: "12px",
//     maxWidth: "260px",
//     fontSize: "13px",
//     lineHeight: "1.5",
//     color: "#e2e8f0",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
//     zIndex: 10
//   }}>
//     🤖 <strong>AI Insight</strong>
//     <br />
//     {aiExplain}
//   </div>
// )}
//   <ResponsiveContainer width="100%" height={250}>
//     <LineChart data={futureBurnoutTrend}>
//       <CartesianGrid stroke="#333" strokeDasharray="3 3" />
//       <XAxis dataKey="week" />
//       <YAxis domain={[0, 100]} />
//       <Tooltip />
//       <Line 
//         type="monotone" 
//         dataKey="burnout" 
//         stroke="#f97316" 
//         strokeWidth={3} 
//         dot={{ r: 5 }} 
//         activeDot={{ r: 7 }} 
//       />
//     </LineChart>
//   </ResponsiveContainer>
// </div>

//         {/* 🔥 Focus Score */}

//   <Card title="Focus Score" value={focusScore} color="#38bdf8" icon="⚡" />


// {/* 📖 Burnout Timeline */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>📖 Burnout Timeline Story</h2>
//   <p style={{ whiteSpace: "pre-line", color: "#cbd5e1" }}>
//     {generateTimelineStory()}
//   </p>
// </div>

// {/* 🚨 Alerts */}
// <div className="card" style={{ borderLeft: "4px solid #facc15" }}>
//   <h2>🚨 Smart Alerts</h2>

//   {alerts.length === 0 ? (
//     <p style={{ color: "#00ff99" }}>All good 👍</p>
//   ) : (
//     <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//       {alerts.map((a, i) => (
//         <div
//           key={i}
//           style={{
//             background: "rgba(250,204,21,0.1)",
//             border: "1px solid rgba(250,204,21,0.3)",
//             padding: "12px",
//             borderRadius: "10px",
//             cursor: "pointer",
//             transition: "0.2s"
//           }}
//           onClick={() => explainBurnout()}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.02)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           ⚠️ {a}
//         </div>
//       ))}
//     </div>
//   )}

//   {alerts.length > 0 && (
//     <button
//       onClick={explainBurnout}
//       style={{
//         marginTop: "15px",
//         padding: "10px 20px",
//         borderRadius: "10px",
//         border: "none",
//         background: "linear-gradient(135deg, #00ff99, #00bfff)",
//         color: "#022c22",
//         fontWeight: "600",
//         cursor: "pointer"
//       }}
//     >
//       ⚡ Fix with AI
//     </button>
//   )}
// </div>

// {/* 🎯 Weekly Goal */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>🎯 Weekly Goal</h2>
//  <h3 style={{
//   color: "#38bdf8",
//   background: "rgba(56,189,248,0.1)",
//   padding: "10px 15px",
//   borderRadius: "10px",
//   display: "inline-block"
// }}>
//   {getWeeklyGoal()}
// </h3>
// </div>

// {/* 🧑‍💻 Comparison */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>🧑‍💻 You vs Ideal Developer</h2>

//   <p>Late Night: {featureBreakdown.late_night_intensity}% (Ideal: &lt;20%)</p>
//   <p>Weekend Work: {featureBreakdown.weekend_ratio}% (Ideal: &lt;15%)</p>
//   <p>
//   Stability: {featureBreakdown.volatility_index?.toFixed(1)}% (Ideal: &lt;30%)
// </p>
// </div>
//       </div>
//     </div>
//     {decoded &&(<AIChat
//         burnoutScore={decoded.burnout_score}
//         burnoutStatus={decoded.burnout_status} />)}
//         {showModal && (
//   <div style={{
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.7)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999
//   }}>
//     <div style={{
//       background: "#1e293b",
//       padding: "30px",
//       borderRadius: "15px",
//       maxWidth: "600px",
//       color: "white",
//       boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
//     }}>
//       <h2 style={{ marginBottom: "15px" }}> AI Explanation</h2>

//       <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
//         {aiExplain}
//       </p>

//       <button
//         onClick={() => setShowModal(false)}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "10px",
//           background: "#FF8C00",
//           color: "white",
//           cursor: "pointer"
//         }}
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}

// {showTip && (
//   <div style={{
//     position: "fixed",
//     top: "20px",
//     right: "20px",
//     background: "linear-gradient(135deg, #00ff99, #00bfff)",
//     color: "#022c22",
//     padding: "18px 22px",
//     borderRadius: "15px",
//     boxShadow: "0 10px 30px rgba(0,255,150,0.4)",
//     zIndex: 1000,
//     animation: "slideIn 0.5s ease"
//   }}>
//     <strong>💡 Daily Insight</strong>
//     <p style={{ marginTop: "5px", fontSize: "14px" }}>
//       {latestBurnout > 40
//         ? "Take a lighter day today — your pattern shows rising fatigue."
//         : "You're in a great rhythm — keep it consistent!"}
//     </p>

//     <button
//       onClick={() => setShowTip(false)}
//       style={{
//         marginTop: "10px",
//         border: "none",
//         background: "#022c22",
//         color: "white",
//         padding: "5px 10px",
//         borderRadius: "8px",
//         cursor: "pointer"
//       }}
//     >
//       Close
//     </button>
//   </div>
// )}
// </>

//   );
  
// }

// // 🔥 Modern Card Component
// const Card = ({ title, value, color, icon, small }) => (
//   <div className="card hover">
//     <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>

//     <h4 style={{ opacity: 0.7 }}>{title}</h4>

//     <h1
//       style={{
//         color,
//         fontSize: small ? "20px" : "32px",
//         wordBreak: "break-word",
//       }}
//     >
//       {value}
//     </h1>
//   </div>
// );

// export default Dashboard;







// import logo from "../assets/logo.png";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import AIChat from "../components/AIChat";

// import "./heatmap.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function Dashboard() {
//   const [showTip, setShowTip] = useState(false);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const dataParam = queryParams.get("data");

//   if (!dataParam) return <h2 style={{ color: "white" }}>No Data Found</h2>;

//   const decoded = JSON.parse(decodeURIComponent(dataParam));
//   const [aiExplain, setAiExplain] = useState("");
// const [showModal, setShowModal] = useState(false);
// const [hasRecommended, setHasRecommended] = useState(false);
// //   const explainBurnout = async () => {
// //   const res = await fetch("http://127.0.0.1:8000/ai-chat", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({
// //       message: "Explain why my burnout score is like this",
// //       burnout_score: decoded.burnout_score,
// //       burnout_status: decoded.burnout_status,
// //       features: decoded.feature_breakdown
// //     })
// //   });

// //   const data = await res.json();
// //   alert(data.reply); // or show modal
// // };
// const [bestMode, setBestMode] = useState(null);
// const [recommendationText, setRecommendationText] = useState("");
// const [decisionScores, setDecisionScores] = useState(null);
// const [confidence, setConfidence] = useState(null);

// const explainBurnout = async () => {
//   const res = await fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       message: "Explain why my burnout score is like this",
//       burnout_score: decoded.burnout_score,
//       burnout_status: decoded.burnout_status,
//       features: decoded.feature_breakdown
//     })
//   });

//   const data = await res.json();
//   setAiExplain(data.reply);
//   setShowModal(true);
// };
// //   const [typedText, setTypedText] = useState("");
// // const fullText = decoded.ai_coach || "Analyzing your behavior...";

// // useEffect(() => {
// //   let index = 0;
// //   setTypedText("");

// //   const interval = setInterval(() => {
// //     setTypedText((prev) => prev + fullText.charAt(index));
// //     index++;

// //     if (index >= fullText.length) {
// //       clearInterval(interval);
// //     }
// //   }, 20);

// //   return () => clearInterval(interval);
// // }, [fullText]);
// const [typedText, setTypedText] = useState("");

// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   if (!decoded.ai_coach) return;

//   let index = 0;
//   const text = decoded.ai_coach;

//   const interval = setInterval(() => {
//     index++;
//     setTypedText(text.slice(0, index)); // ✅ SAFE method

//     if (index >= text.length) {
//       clearInterval(interval);
//     }
//   }, 20);

//   return () => clearInterval(interval);
// }, [decoded.ai_coach]);
// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   setTimeout(() => {
//     setShowTip(true);
//   }, 800); // smooth delay like reward popup
// }, []);

//   const featureBreakdown = decoded.feature_breakdown || {};
//   const burnoutScores =
//     decoded.weekly_burnout_scores || [decoded.burnout_score];
//   const latestBurnout = burnoutScores[burnoutScores.length - 1];

//   const healthIndex = (100 - latestBurnout).toFixed(1);
//   let predictedBurnout = decoded.predicted_burnout ?? latestBurnout;

//   // Pattern detection
//   let pattern = "Balanced Developer";
//   if (featureBreakdown.weekend_ratio > 50) pattern = "Weekend Warrior";
//   else if (featureBreakdown.late_night_intensity > 40)
//     pattern = "Night Owl";
//   else if (featureBreakdown.volatility_index > 50)
//     pattern = "Burst Worker";

//   // Commit data
//   const weeklyActivity = decoded.weekly_commit_activity || {};
//   const rawCommits = Object.values(weeklyActivity);

//   const n = rawCommits.length;
//   const x = rawCommits.map((_, i) => i + 1);
//   const y = rawCommits;

//   const sumX = x.reduce((a, b) => a + b, 0);
//   const sumY = y.reduce((a, b) => a + b, 0);
//   const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
//   const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

//   const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
//   const b = (sumY - m * sumX) / (n || 1);

//   const predictedCommits = Number((m * (n + 1) + b).toFixed(2));

//   const commitData = rawCommits.map((val, i) => ({
//     week: `W${i + 1}`,
//     commits: val,
//   }));

//   commitData.push({
//     week: `W${n + 1}`,
//     predicted: predictedCommits,
//   });
//   const getRiskLevel = () => {
//   if (latestBurnout < 30) return "SAFE";
//   if (latestBurnout < 60) return "WARNING";
//   return "DANGER";
// };

// const riskLevel = getRiskLevel();
// const getProtectionMessage = () => {
//   if (riskLevel === "SAFE") {
//     return "🟢 You are in a healthy zone. Maintain your rhythm.";
//   }
//   if (riskLevel === "WARNING") {
//     return "🟡 Early signs of burnout detected. Adjust workload.";
//   }
//   return "🔴 High burnout risk. Immediate intervention required.";
// };
//   const generateIntervention = () => {
//   const actions = [];

//   if (featureBreakdown.late_night_intensity > 30) {
//     actions.push("🌙 Avoid coding after 11 PM for next 3 days");
//   }

//   if (featureBreakdown.weekend_ratio > 20) {
//     actions.push("📅 Take at least 1 full day off this weekend");
//   }

//   if (featureBreakdown.volatility_index > 40) {
//     actions.push("📊 Stabilize your work schedule (avoid bursts)");
//   }

//   if (latestBurnout > 60) {
//     actions.push("🛑 Reduce workload by 30% immediately");
//   }

//   if (actions.length === 0) {
//     actions.push("✅ Keep following your current routine");
//   }

//   return actions;
// };

// const interventions = generateIntervention();
// const simulateFuture = (mode) => {
//   let modifier = 0;

//   if (mode === "rest") modifier = -8;
//   if (mode === "balanced") modifier = -3;
//   if (mode === "push") modifier = +10;

//   return futureBurnoutTrend.map((p) => ({
//     ...p,
//     burnout: Math.max(0, Math.min(100, p.burnout + modifier)),
//   }));
// };
// const [simulatedData, setSimulatedData] = useState(null);
//   // 🔮 Clean Future Burnout Forecast
// // const futureBurnoutTrend = [];

// // const recentScores = burnoutScores.slice(-4); // last 4 weeks
// // const weights = [0.1, 0.2, 0.3, 0.4];

// // // compute trend
// // let trend = 0;
// // for (let i = 1; i < recentScores.length; i++) {
// //   trend += (recentScores[i] - recentScores[i - 1]) * weights[i - 1];
// // }

// // // generate 4-week forecast
// // for (let i = 1; i <= 4; i++) {
// //   const decay = Math.pow(0.85, i); // optional decreasing trend
// //   const noise = (Math.random() - 0.5) * 2; // small ±1 burnout points
// //   const adjustment =
// //     (featureBreakdown.late_night_intensity || 0) * 0.03 +
// //     (featureBreakdown.weekend_ratio || 0) * 0.02 +
// //     (featureBreakdown.volatility_index || 0) * 0.04;

// //   let next = latestBurnout + i * trend * decay + noise + adjustment;
// //   next = Math.max(0, Math.min(100, next)); // clamp 0-100

// //   futureBurnoutTrend.push({ week: `+${i}`, burnout: Number(next.toFixed(1)) });
// // }
// // 🔮 Improved Future Burnout Forecast (Dynamic & Realistic)

// // 🔮 Realistic Human-like Burnout Forecast

// // const futureBurnoutTrend = [];

// // let lastValue = latestBurnout;

// // // detect recent direction (important)
// // const direction =
// //   burnoutScores.length > 1
// //     ? burnoutScores[burnoutScores.length - 1] -
// //       burnoutScores[burnoutScores.length - 2]
// //     : 0;

// // // behavior factors
// // const fatiguePressure =
// //   (featureBreakdown.late_night_intensity || 0) * 0.04 +
// //   (featureBreakdown.weekend_ratio || 0) * 0.03;

// // const recoveryChance = latestBurnout < 50 ? 0.6 : 0.3;

// // for (let i = 1; i <= 4; i++) {
// //   // strong random fluctuation
// //  let randomSwing = (Math.random() - 0.5) * 10;

// // // add occasional spike/drop
// // if (Math.random() < 0.3) {
// //   randomSwing += (Math.random() - 0.5) * 10;
// // }

// //   // recovery behavior
// //   if (Math.random() < recoveryChance) {
// //     randomSwing -= Math.random() * 8;
// //   }

// //   // gradual fatigue push
// //   let drift = fatiguePressure * (Math.random() * 2);

// //   let next =
// //     lastValue +
// //     randomSwing +
// //     drift +
// //     direction * 0.3; // trend influence

// //   // clamp 0–100
// //   next = Math.max(0, Math.min(100, next));

// //   futureBurnoutTrend.push({
// //     week: `+${i}`,
// //     burnout: Number(next.toFixed(1)),
// //   });

// //   lastValue = next; // 🔥 makes curve natural
// // }
// // const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);

// // useEffect(() => {
// //   fetch("http://127.0.0.1:8000/predict-burnout", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       burnout_history: burnoutScores,
// //       features: featureBreakdown,
// //     }),
// //   })
// //     .then(res => res.json())
// //     .then(data => {
// //       const formatted = data.prediction.map((val, i) => ({
// //         week: `+${i + 1}`,
// //         burnout: val,
// //       }));
// //       setFutureBurnoutTrend(formatted);
// //     })
// //     .catch(err => console.error(err));
// // }, [burnoutScores]);
// const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);
// const [isFlatPrediction, setIsFlatPrediction] = useState(false);
// const [selectedMode, setSelectedMode] = useState(null);
// useEffect(() => {
//   fetch("http://127.0.0.1:8000/predict-burnout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       burnout_history: burnoutScores,
//       features: featureBreakdown,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       const formatted = data.prediction.map((val, i) => ({
//         week: `+${i + 1}`,
//         burnout: val,
//       }));

//       setFutureBurnoutTrend(formatted);

//       // 🔥 detect flat prediction
//       const flat = formatted.every(
//         (p, i, arr) =>
//           i === 0 || Math.abs(p.burnout - arr[0].burnout) < 0.3
//       );

//       setIsFlatPrediction(flat);
//     })
//     .catch(err => console.error(err));
// }, [burnoutScores, featureBreakdown]);
// useEffect(() => {
//   if (!futureBurnoutTrend.length || hasRecommended) return;

//   const rest = simulateFuture("rest");
//   const balanced = simulateFuture("balanced");
//   const push = simulateFuture("push");

//   const avg = (arr) =>
//     arr.reduce((sum, x) => sum + x.burnout, 0) / arr.length;

//   const scores = {
//     rest: avg(rest),
//     balanced: avg(balanced),
//     push: avg(push),
//   };

//   // ✅ store all scores
//   setDecisionScores(scores);

//   // ✅ find best
//   const best = Object.keys(scores).reduce((a, b) =>
//     scores[a] < scores[b] ? a : b
//   );

//   setBestMode(best);
//   setHasRecommended(true);
// const confidence = Math.max(
//   60,
//   100 - Math.abs(scores.rest - scores.push)
// );
//   // ✅ confidence
//   const values = Object.values(scores);
//   const spread = Math.max(...values) - Math.min(...values);
//   setConfidence(Math.min(100, Math.round(spread * 10)));

//   // 🤖 AI explanation
//   fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       message: `Explain why ${best} is best and others are worse (2 lines)`
//     })
//   })
//     .then(res => res.json())
//     .then(data => setRecommendationText(data.reply));

// }, [futureBurnoutTrend, hasRecommended]);
// useEffect(() => {
//   if (!selectedMode || !futureBurnoutTrend.length) return;

//   fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: `
// User selected ${selectedMode} mode.

// Explain:
// - Why burnout will change in this scenario
// - What behavior causes it
// - Keep it short (2 lines max, human tone)

// Data:
// Current burnout: ${latestBurnout}
// Late night: ${featureBreakdown.late_night_intensity}
// Weekend work: ${featureBreakdown.weekend_ratio}
// Volatility: ${featureBreakdown.volatility_index}
//       `,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       setAiExplain(data.reply);
//     })
//     .catch(err => console.error(err));
// }, [selectedMode]);
// useEffect(() => {
//   if (!isFlatPrediction) return;

//   fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//      message: `
// Explain the pattern in my burnout prediction trend.

// If the trend is flat:
// - explain that behavior and inputs are stable

// If increasing:
// - explain workload pressure

// If decreasing:
// - explain recovery

// Be short, natural, and human-like (2 lines max).
// `,
//       burnout_score: decoded.burnout_score,
//       burnout_status: decoded.burnout_status,
//       features: decoded.feature_breakdown,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       setAiExplain(data.reply);
//     })
//     .catch(err => console.error(err));
// }, [isFlatPrediction]);

//   // Heatmap normalization
//   const today = new Date();
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(today.getFullYear() - 1);

//   const maxCount = Math.max(
//     ...decoded.heatmap.map((d) => d.count || 0)
//   );

//   const heatmapData = decoded.heatmap.map((d) => ({
//     date: d.date,
//     count: maxCount === 0 ? 0 : Math.round((d.count / maxCount) * 10),
//   }));

//   // Colors
//   let scoreColor = "#00ff99";
//   if (latestBurnout >= 40) scoreColor = "#facc15";
//   if (latestBurnout >= 60) scoreColor = "#f97316";
//   if (latestBurnout >= 80) scoreColor = "#ef4444";
// // 🔥 ADD BELOW YOUR EXISTING LOGIC (after calculations)

// const generateTimelineStory = () => {
//   const scores = decoded.weekly_burnout_scores || [];

//   if (scores.length < 2) {
//     return "Tracking will improve as more weekly data is collected 📊";
//   }

//   let story = "";

//   for (let i = 1; i < scores.length; i++) {
//     const diff = scores[i] - scores[i - 1];

//     if (diff > 5) {
//       story += `⚠️ Week ${i + 1}: Stress increased\n`;
//     } else if (diff < -5) {
//       story += `✅ Week ${i + 1}: Recovery phase\n`;
//     } else {
//       story += `➖ Week ${i + 1}: Stable\n`;
//     }
//   }

//   return story;
// };

// const getAlerts = () => {
//   let alerts = [];

//   if ((featureBreakdown.late_night_intensity || 0) > 30)
//     alerts.push("🌙 Late-night work detected");

//   if ((featureBreakdown.weekend_ratio || 0) > 20)
//     alerts.push("📅 Weekend work is higher than ideal");

//   if ((featureBreakdown.volatility_index || 0) > 35)
//     alerts.push("📊 Work pattern is unstable");

//   if (latestBurnout > 50)
//     alerts.push("🔥 Burnout risk rising");

//   return alerts;
// };

// const getWeeklyGoal = () => {
//   if (latestBurnout < 30) return "Maintain your current rhythm ✅";
//   if (latestBurnout < 60) return "Reduce 1–2 work sessions this week ⚖️";
//   return "Take 2 days off + reduce workload 🔴";
// };

// const focusScore = (
//   100 -
//   (featureBreakdown.volatility_index || 0) -
//   (featureBreakdown.late_night_intensity || 0) / 2
// ).toFixed(1);

// const alerts = getAlerts();
//   return (
//     <><div
//       style={{
//         display: "flex",
//         // background: "#0f172a",
//         background: "radial-gradient(circle at top, #0f172a, #020617)",
//         color: "white",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "220px",
//           background: "#111827",
//           padding: "30px",
//           position: "fixed",
//           height: "100vh",
//           textAlign: "center",
//         }}
//       >
//         <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h2>
//           Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
//         </h2>
//       </div>

//       {/* Main */}
//       <div
//         style={{
//           marginLeft: "220px",
//           padding: "40px",
//           width: "calc(100% - 220px)",
//           boxSizing: "border-box",
//         }}
//       >
//         <h1>Welcome, {decoded.username}</h1>

//         {/* AI Coach */}
//         {/* <div className="card" style={{ marginTop: "30px" }}>
//       <h2>🧠 AI Burnout Coach</h2>
//      <p style={{
// whiteSpace: "pre-line",
// lineHeight: "1.6",
// color: "#cbd5e1",
// fontFamily: "monospace"
// }}>
// {typedText}
// <span className="cursor">|</span>
// </p>

//     </div> */}
//         <div style={{
//           marginTop: "30px",
//           display: "flex",
//           alignItems: "flex-start",
//           gap: "15px"
//         }}>

//           {/* 🤖 AI Avatar */}
//           <div 
//           // style={{
//           //   width: "45px",
//           //   height: "45px",
//           //   borderRadius: "50%",
//           //   background: "linear-gradient(135deg, #00ff99, #00bfff)",
//           //   display: "flex",
//           //   alignItems: "center",
//           //   justifyContent: "center",
//           //   fontSize: "20px",
//           //   boxShadow: "0 0 15px rgba(0,255,150,0.5)"
//           // }}
//           style={{
//     background: "rgba(255,255,255,0.05)",
//     backdropFilter: "blur(12px)",
//     padding: "20px",
//     borderRadius: "20px",
//     maxWidth: "700px",
//     border: "1px solid rgba(255,255,255,0.08)",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//     transition: "0.3s"
//   }}
//           >
//             🤖
//           </div>

//           {/* 💬 Chat Bubble */}
//           <div
//             style={{
//               // background: "linear-gradient(145deg, #1e293b, #0f172a)",
//               background: "rgba(30,41,59,0.6)",
// backdropFilter: "blur(15px)",
// border: "1px solid rgba(255,255,255,0.1)",
//               padding: "20px",
//               borderRadius: "15px",
//               maxWidth: "700px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//               // border: "1px solid rgba(255,255,255,0.05)",
//               transition: "0.3s" // ✅ ADD HERE
//             }}

//             onMouseEnter={(e) => {
//               e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.2)";
//             } }

//             onMouseLeave={(e) => {
//               e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
//             } }
//           >

//             <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>
//               AI Burnout Coach
//             </h3>

//             <div style={{
//               whiteSpace: "pre-line",
//               lineHeight: "1.8",
//               color: "#e2e8f0",
//               fontFamily: "monospace"
//             }}>
//               {typedText}
//               <span className="cursor">|</span>
//             </div>

//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid">
//           <Card title="Burnout Score" value={latestBurnout} color={scoreColor} icon="🔥" />
//           <Card title="Health Index" value={healthIndex} color="#00ff99" icon="💚" />
//           <Card title="Next Week Commits" value={predictedCommits} color="#00bfff" icon="📈" />
//           <Card title="Burnout Risk" value={`${predictedBurnout}%`} color="#facc15" icon="⚠️" />
//           <Card title="Pattern" value={pattern} color="#a78bfa" icon="🧠" small />
//         </div>

//         {/* Why */}
        
//           {/* <h3>⚡ Why this score?</h3>
//           <ul>
//             {featureBreakdown.late_night_intensity > 30 && <li>Late night work</li>}
//             {featureBreakdown.work_streak_index > 50 && <li>Long streak</li>}
//             {featureBreakdown.volatility_index > 40 && <li>Irregular workload</li>}
//             {featureBreakdown.weekend_ratio > 40 && <li>Weekend work</li>}
//           </ul> */}
//           {/* <button onClick={explainBurnout} className="button-w">
//   Why this score?
// </button> */}
// <div style={{
//   display: "flex",
//   justifyContent: "center",
//   marginTop: "30px",
//   marginBottom: "10px"
// }}>
//   <button
//     onClick={explainBurnout}
//     style={{
//       padding: "14px 28px",
//       borderRadius: "30px",
//       border: "none",
//       cursor: "pointer",
//       fontWeight: "600",
//       fontSize: "15px",
//       color: "white",
// //       background: "linear-gradient(135deg, #00ff99, #00bfff)",
// // boxShadow: "0 0 20px rgba(0,255,150,0.4)",
// background: "linear-gradient(135deg, #3d4a5f, #1a2425)",
// boxShadow: "0 0 20px rgba(59,130,246,0.4)",
//       // background: "linear-gradient(135deg, #00ff99, #00bfff)",
//       // boxShadow: "0 10px 25px rgba(0,255,150,0.3)",
//       transition: "0.3s"
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "scale(1.05)";
//       e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.5)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "scale(1)";
//       e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,255,150,0.3)";
//     }}
//   >
//     ⚡ Why this score?
//   </button>
// </div>
        

//         {/* Heatmap */}
//         <div className="card">
//           <h2>Contribution Heatmap</h2>
//           <CalendarHeatmap
//             startDate={oneYearAgo}
//             endDate={today}
//             values={heatmapData}
//             gutterSize={4}
//             showMonthLabels
//             classForValue={(value) => {
//               if (!value || value.count === 0) return "color-empty";
//               if (value.count < 3) return "color-scale-1";
//               if (value.count < 6) return "color-scale-2";
//               if (value.count < 10) return "color-scale-3";
//               return "color-scale-4";
//             } } />
//         </div>
// <div className="card" style={{
//   marginTop: "20px",
//   borderLeft: riskLevel === "DANGER" ? "4px solid #ef4444"
//     : riskLevel === "WARNING" ? "4px solid #facc15"
//     : "4px solid #00ff99"
// }}>
//   <h2>🛡️ AI Protection System</h2>

//   <h3 style={{
//     color:
//       riskLevel === "DANGER" ? "#ef4444"
//       : riskLevel === "WARNING" ? "#facc15"
//       : "#00ff99"
//   }}>
//     {riskLevel}
//   </h3>

//   <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
//     {getProtectionMessage()}
//   </p>
// </div>
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>🚨 AI Actions</h2>

//   <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
//     {interventions.map((action, i) => (
//       <div
//         key={i}
//         style={{
//           background: "rgba(56,189,248,0.1)",
//           border: "1px solid rgba(56,189,248,0.3)",
//           padding: "12px",
//           borderRadius: "10px",
//           fontSize: "14px"
//         }}
//       >
//         {action}
//       </div>
//     ))}
//   </div>
// </div>
//         {/* Chart */}
//         <div className="card">
//           <h2>Commits Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={commitData}>
//               <CartesianGrid stroke="#333" />
//               <XAxis dataKey="week" />
//               <YAxis />
//               <Tooltip />
//               <Line dataKey="commits" stroke="#00ff99" />
//               <Line dataKey="predicted" stroke="#00bfff" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
// <div style={{
//   display: "flex",
//   gap: "10px",
//   marginBottom: "15px"
// }}>
//   <button onClick={() => {
//   setSimulatedData(simulateFuture("rest"));
//   setSelectedMode("rest");
// }}>
//   🧘 Take Break
// </button>

// <button onClick={() => {
//   setSimulatedData(simulateFuture("balanced"));
//   setSelectedMode("balanced");
// }}>
//   ⚖️ Stay Balanced
// </button>

// <button onClick={() => {
//   setSimulatedData(simulateFuture("push"));
//   setSelectedMode("push");
// }}>
//   🚀 Push Hard
// </button>
// </div>
// <div className="card" style={{
//   marginTop: "20px",
//   borderLeft: "4px solid #00ff99"
// }}>
//   <h2>🧠 AI Recommendation</h2>

//   {bestMode && (
//     <h3 style={{ color: "#00ff99" }}>
//       Recommended: {
//         bestMode === "rest" ? "🧘 Take Break" :
//         bestMode === "balanced" ? "⚖️ Stay Balanced" :
//         "🚀 Push Hard"
//       }
//     </h3>
//   )}

//   <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
//     {recommendationText}
//   </p>
// </div>
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>⚖️ Decision Comparison</h2>

//   {decisionScores && Object.entries(decisionScores).map(([mode, score]) => {
//     const isBest = mode === bestMode;

//     return (
//       <div
//         key={mode}
//         style={{
//           marginTop: "12px",
//           padding: "14px",
//           borderRadius: "12px",
//           background: isBest
//             ? "rgba(0,255,150,0.1)"
//             : "rgba(255,255,255,0.05)",
//           border: isBest
//             ? "1px solid rgba(0,255,150,0.5)"
//             : "1px solid rgba(255,255,255,0.1)",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center"
//         }}
//       >
//         <div>
//           <strong>
//             {mode === "rest" && "🧘 Take Break"}
//             {mode === "balanced" && "⚖️ Stay Balanced"}
//             {mode === "push" && "🚀 Push Hard"}
//           </strong>

//           {isBest && (
//             <span style={{ marginLeft: "10px", color: "#00ff99" }}>
//               ⭐ BEST
//             </span>
//           )}
//         </div>

//         <div style={{
//           color: isBest ? "#00ff99" : "#cbd5e1",
//           fontWeight: "600"
//         }}>
//           {score.toFixed(1)}%
//         </div>
//       </div>
//     );
//   })}

//   {confidence !== null && (
//     <p style={{ color: "#38bdf8", marginTop: "10px" }}>
//   Confidence: {confidence.toFixed(0)}%
// </p>
//   )}
// </div>
// <div className="card" style={{ marginTop: "20px", position: "relative" }}>
//   <h2>🔮 Burnout Forecast (4 Weeks)</h2>
//   {aiExplain && (
//   <div style={{
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "rgba(30,41,59,0.9)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     padding: "12px 16px",
//     borderRadius: "12px",
//     maxWidth: "260px",
//     fontSize: "13px",
//     lineHeight: "1.5",
//     color: "#e2e8f0",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
//     zIndex: 10
//   }}>
//     🤖 <strong>AI Insight</strong>
//     <br />
//     {aiExplain}
//   </div>
// )}
//   <ResponsiveContainer width="100%" height={250}>
//    <LineChart data={simulatedData || futureBurnoutTrend}>
//       <CartesianGrid stroke="#333" strokeDasharray="3 3" />
//       <XAxis dataKey="week" />
//       <YAxis domain={[0, 100]} />
//       <Tooltip />
//       <Line 
//         type="monotone" 
//         dataKey="burnout" 
//         stroke="#f97316" 
//         strokeWidth={3} 
//         dot={{ r: 5 }} 
//         activeDot={{ r: 7 }} 
//       />
//     </LineChart>
//   </ResponsiveContainer>
// </div>

//         {/* 🔥 Focus Score */}

//   <Card title="Focus Score" value={focusScore} color="#38bdf8" icon="⚡" />


// {/* 📖 Burnout Timeline */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>📖 Burnout Timeline Story</h2>
//   <p style={{ whiteSpace: "pre-line", color: "#cbd5e1" }}>
//     {generateTimelineStory()}
//   </p>
// </div>

// {/* 🚨 Alerts */}
// <div className="card" style={{ borderLeft: "4px solid #facc15" }}>
//   <h2>🚨 Smart Alerts</h2>

//   {alerts.length === 0 ? (
//     <p style={{ color: "#00ff99" }}>All good 👍</p>
//   ) : (
//     <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//       {alerts.map((a, i) => (
//         <div
//           key={i}
//           style={{
//             background: "rgba(250,204,21,0.1)",
//             border: "1px solid rgba(250,204,21,0.3)",
//             padding: "12px",
//             borderRadius: "10px",
//             cursor: "pointer",
//             transition: "0.2s"
//           }}
//           onClick={() => explainBurnout()}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.02)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           ⚠️ {a}
//         </div>
//       ))}
//     </div>
//   )}

//   {alerts.length > 0 && (
//     <button
//       onClick={explainBurnout}
//       style={{
//         marginTop: "15px",
//         padding: "10px 20px",
//         borderRadius: "10px",
//         border: "none",
//         background: "linear-gradient(135deg, #00ff99, #00bfff)",
//         color: "#022c22",
//         fontWeight: "600",
//         cursor: "pointer"
//       }}
//     >
//       ⚡ Fix with AI
//     </button>
//   )}
// </div>

// {/* 🎯 Weekly Goal */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>🎯 Weekly Goal</h2>
//  <h3 style={{
//   color: "#38bdf8",
//   background: "rgba(56,189,248,0.1)",
//   padding: "10px 15px",
//   borderRadius: "10px",
//   display: "inline-block"
// }}>
//   {getWeeklyGoal()}
// </h3>
// </div>

// {/* 🧑‍💻 Comparison */}
// <div className="card" style={{ marginTop: "20px" }}>
//   <h2>🧑‍💻 You vs Ideal Developer</h2>

//   <p>Late Night: {featureBreakdown.late_night_intensity}% (Ideal: &lt;20%)</p>
//   <p>Weekend Work: {featureBreakdown.weekend_ratio}% (Ideal: &lt;15%)</p>
//   <p>
//   Stability: {featureBreakdown.volatility_index?.toFixed(1)}% (Ideal: &lt;30%)
// </p>
// </div>
//       </div>
//     </div>
//     {decoded &&(<AIChat
//         burnoutScore={decoded.burnout_score}
//         burnoutStatus={decoded.burnout_status} />)}
//         {showModal && (
//   <div style={{
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.7)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999
//   }}>
//     <div style={{
//       background: "#1e293b",
//       padding: "30px",
//       borderRadius: "15px",
//       maxWidth: "600px",
//       color: "white",
//       boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
//     }}>
//       <h2 style={{ marginBottom: "15px" }}> AI Explanation</h2>

//       <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
//         {aiExplain}
//       </p>

//       <button
//         onClick={() => setShowModal(false)}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "10px",
//           background: "#FF8C00",
//           color: "white",
//           cursor: "pointer"
//         }}
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}

// {showTip && (
//   <div style={{
//     position: "fixed",
//     top: "20px",
//     right: "20px",
//     background: "linear-gradient(135deg, #00ff99, #00bfff)",
//     color: "#022c22",
//     padding: "18px 22px",
//     borderRadius: "15px",
//     boxShadow: "0 10px 30px rgba(0,255,150,0.4)",
//     zIndex: 1000,
//     animation: "slideIn 0.5s ease"
//   }}>
//     <strong>💡 Daily Insight</strong>
//     <p style={{ marginTop: "5px", fontSize: "14px" }}>
//       {latestBurnout > 40
//         ? "Take a lighter day today — your pattern shows rising fatigue."
//         : "You're in a great rhythm — keep it consistent!"}
//     </p>

//     <button
//       onClick={() => setShowTip(false)}
//       style={{
//         marginTop: "10px",
//         border: "none",
//         background: "#022c22",
//         color: "white",
//         padding: "5px 10px",
//         borderRadius: "8px",
//         cursor: "pointer"
//       }}
//     >
//       Close
//     </button>
//   </div>
// )}
// </>

//   );
  
// }

// // 🔥 Modern Card Component
// const Card = ({ title, value, color, icon, small }) => (
//   <div className="card hover">
//     <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>

//     <h4 style={{ opacity: 0.7 }}>{title}</h4>

//     <h1
//       style={{
//         color,
//         fontSize: small ? "20px" : "32px",
//         wordBreak: "break-word",
//       }}
//     >
//       {value}
//     </h1>
//   </div>
// );

// export default Dashboard;





import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import AIChat from "../components/AIChat";
import Card from "../components/Card";
import AICoach from "../components/AICoach";
import Sidebar from "../components/Sidebar";
import BurnoutTimeline from "../components/BurnoutTimeline";
import DigitalTwin from "../components/DigitalTwin";
import "./heatmap.css";
import LiveRadar from "../components/LiveRadar";
import ReflectionPanel from "../components/ReflectionPanel";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ user }) {
  console.log(user);
  const [showTip, setShowTip] = useState(false);
  const location = useLocation();
  const [reflections, setReflections] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("data");

  if (!dataParam) return <h2 style={{ color: "white" }}>No Data Found</h2>;

  const decoded = JSON.parse(decodeURIComponent(dataParam));
  const [aiExplain, setAiExplain] = useState("");
const [showModal, setShowModal] = useState(false);
const [hasRecommended, setHasRecommended] = useState(false);
//   const explainBurnout = async () => {
//   const res = await fetch("http://127.0.0.1:8000/ai-chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       message: "Explain why my burnout score is like this",
//       burnout_score: decoded.burnout_score,
//       burnout_status: decoded.burnout_status,
//       features: decoded.feature_breakdown
//     })
//   });

//   const data = await res.json();
//   alert(data.reply); // or show modal
// };
const [autoAction, setAutoAction] = useState(null);
const [bestMode, setBestMode] = useState(null);
const [recommendationText, setRecommendationText] = useState("");
const [decisionScores, setDecisionScores] = useState(null);
const [confidence, setConfidence] = useState(null);


const explainBurnout = async () => {
  const res = await fetch("http://127.0.0.1:8000/ai-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Explain why my burnout score is like this",
      burnout_score: decoded.burnout_score,
      burnout_status: decoded.burnout_status,
      features: decoded.feature_breakdown
    })
  });

  const data = await res.json();
  setAiExplain(data.reply);
  setShowModal(true);
};
//   const [typedText, setTypedText] = useState("");
// const fullText = decoded.ai_coach || "Analyzing your behavior...";

// useEffect(() => {
//   let index = 0;
//   setTypedText("");

//   const interval = setInterval(() => {
//     setTypedText((prev) => prev + fullText.charAt(index));
//     index++;

//     if (index >= fullText.length) {
//       clearInterval(interval);
//     }
//   }, 20);

//   return () => clearInterval(interval);
// }, [fullText]);
const [typedText, setTypedText] = useState("");

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  if (!decoded.ai_coach) return;

  let index = 0;
  const text = decoded.ai_coach;

  const interval = setInterval(() => {
    index++;
    setTypedText(text.slice(0, index)); // ✅ SAFE method

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 20);

  return () => clearInterval(interval);
}, [decoded.ai_coach]);
// eslint-disable-next-line react-hooks/rules-of-hooks
const loadReflections = () => {
  fetch("http://127.0.0.1:8000/reflections")
    .then((res) => res.json())
    .then((data) => {
      setReflections(data.reflections || []);
    })
    .catch((err) => console.error(err));
};
useEffect(() => {
  loadReflections();
}, []);
useEffect(() => {
  setTimeout(() => {
    setShowTip(true);
  }, 800); // smooth delay like reward popup
}, []);

  const featureBreakdown = decoded.feature_breakdown || {};
  const burnoutScores =
    decoded.weekly_burnout_scores || [decoded.burnout_score];
  const latestBurnout = burnoutScores[burnoutScores.length - 1];
const getAIPersonality = () => {
  if (latestBurnout < 30) return "chill";
  if (latestBurnout < 60) return "supportive";
  return "strict";
};
const aiPersonality = getAIPersonality();
  const healthIndex = (100 - latestBurnout).toFixed(1);
  let predictedBurnout = decoded.predicted_burnout ?? latestBurnout;

  // Pattern detection
  let pattern = "Balanced Developer";
  if (featureBreakdown.weekend_ratio > 50) pattern = "Weekend Warrior";
  else if (featureBreakdown.late_night_intensity > 40)
    pattern = "Night Owl";
  else if (featureBreakdown.volatility_index > 50)
    pattern = "Burst Worker";

  // Commit data
  const weeklyActivity = decoded.weekly_commit_activity || {};
  const rawCommits = Object.values(weeklyActivity);

  const n = rawCommits.length;
  const x = rawCommits.map((_, i) => i + 1);
  const y = rawCommits;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
  const b = (sumY - m * sumX) / (n || 1);

  const predictedCommits = Number((m * (n + 1) + b).toFixed(2));

  const commitData = rawCommits.map((val, i) => ({
    week: `W${i + 1}`,
    commits: val,
  }));

  commitData.push({
    week: `W${n + 1}`,
    predicted: predictedCommits,
  });
  const getRiskLevel = () => {
  if (latestBurnout < 30) return "SAFE";
  if (latestBurnout < 60) return "WARNING";
  return "DANGER";
};

const riskLevel = getRiskLevel();
const getProtectionMessage = () => {
  if (riskLevel === "SAFE") {
    return "🟢 You are in a healthy zone. Maintain your rhythm.";
  }
  if (riskLevel === "WARNING") {
    return "🟡 Early signs of burnout detected. Adjust workload.";
  }
  return "🔴 High burnout risk. Immediate intervention required.";
};
  const generateIntervention = () => {
  const actions = [];

  if (featureBreakdown.late_night_intensity > 30) {
    actions.push("🌙 Avoid coding after 11 PM for next 3 days");
  }

  if (featureBreakdown.weekend_ratio > 20) {
    actions.push("📅 Take at least 1 full day off this weekend");
  }

  if (featureBreakdown.volatility_index > 40) {
    actions.push("📊 Stabilize your work schedule (avoid bursts)");
  }

  if (latestBurnout > 60) {
    actions.push("🛑 Reduce workload by 30% immediately");
  }

  if (actions.length === 0) {
    actions.push("✅ Keep following your current routine");
  }

  return actions;
};

const interventions = generateIntervention();
const simulateFuture = (mode) => {
  let last = latestBurnout;

  return futureBurnoutTrend.map((p, i) => {
    const next = calculateBurnoutImpact(
      mode,
      last + Math.random() * 5,
      featureBreakdown
    );

    last = next;

    return {
      week: p.week,
      burnout: Number(next.toFixed(1)),
    };
  });
};
const [simulatedData, setSimulatedData] = useState(null);
const [view, setView] = useState("dashboard");
  // 🔮 Clean Future Burnout Forecast
// const futureBurnoutTrend = [];

// const recentScores = burnoutScores.slice(-4); // last 4 weeks
// const weights = [0.1, 0.2, 0.3, 0.4];

// // compute trend
// let trend = 0;
// for (let i = 1; i < recentScores.length; i++) {
//   trend += (recentScores[i] - recentScores[i - 1]) * weights[i - 1];
// }

// // generate 4-week forecast
// for (let i = 1; i <= 4; i++) {
//   const decay = Math.pow(0.85, i); // optional decreasing trend
//   const noise = (Math.random() - 0.5) * 2; // small ±1 burnout points
//   const adjustment =
//     (featureBreakdown.late_night_intensity || 0) * 0.03 +
//     (featureBreakdown.weekend_ratio || 0) * 0.02 +
//     (featureBreakdown.volatility_index || 0) * 0.04;

//   let next = latestBurnout + i * trend * decay + noise + adjustment;
//   next = Math.max(0, Math.min(100, next)); // clamp 0-100

//   futureBurnoutTrend.push({ week: `+${i}`, burnout: Number(next.toFixed(1)) });
// }
// 🔮 Improved Future Burnout Forecast (Dynamic & Realistic)

// 🔮 Realistic Human-like Burnout Forecast

// const futureBurnoutTrend = [];

// let lastValue = latestBurnout;

// // detect recent direction (important)
// const direction =
//   burnoutScores.length > 1
//     ? burnoutScores[burnoutScores.length - 1] -
//       burnoutScores[burnoutScores.length - 2]
//     : 0;

// // behavior factors
// const fatiguePressure =
//   (featureBreakdown.late_night_intensity || 0) * 0.04 +
//   (featureBreakdown.weekend_ratio || 0) * 0.03;

// const recoveryChance = latestBurnout < 50 ? 0.6 : 0.3;

// for (let i = 1; i <= 4; i++) {
//   // strong random fluctuation
//  let randomSwing = (Math.random() - 0.5) * 10;

// // add occasional spike/drop
// if (Math.random() < 0.3) {
//   randomSwing += (Math.random() - 0.5) * 10;
// }

//   // recovery behavior
//   if (Math.random() < recoveryChance) {
//     randomSwing -= Math.random() * 8;
//   }

//   // gradual fatigue push
//   let drift = fatiguePressure * (Math.random() * 2);

//   let next =
//     lastValue +
//     randomSwing +
//     drift +
//     direction * 0.3; // trend influence

//   // clamp 0–100
//   next = Math.max(0, Math.min(100, next));

//   futureBurnoutTrend.push({
//     week: `+${i}`,
//     burnout: Number(next.toFixed(1)),
//   });

//   lastValue = next; // 🔥 makes curve natural
// }
// const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);

// useEffect(() => {
//   fetch("http://127.0.0.1:8000/predict-burnout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       burnout_history: burnoutScores,
//       features: featureBreakdown,
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       const formatted = data.prediction.map((val, i) => ({
//         week: `+${i + 1}`,
//         burnout: val,
//       }));
//       setFutureBurnoutTrend(formatted);
//     })
//     .catch(err => console.error(err));
// }, [burnoutScores]);
const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);
const [isFlatPrediction, setIsFlatPrediction] = useState(false);
const [selectedMode, setSelectedMode] = useState(null);
useEffect(() => {
  fetch("http://127.0.0.1:8000/predict-burnout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      burnout_history: burnoutScores,
      features: featureBreakdown,
    }),
  })
    .then(res => res.json())
    .then(data => {
      const formatted = data.prediction.map((val, i) => ({
        week: `+${i + 1}`,
        burnout: val,
      }));

      setFutureBurnoutTrend(formatted);

      // 🔥 detect flat prediction
      const flat = formatted.every(
        (p, i, arr) =>
          i === 0 || Math.abs(p.burnout - arr[0].burnout) < 0.3
      );

      setIsFlatPrediction(flat);
    })
    .catch(err => console.error(err));
}, [burnoutScores, featureBreakdown]);
useEffect(() => {
  if (!futureBurnoutTrend.length) return;

  const avgFuture =
    futureBurnoutTrend.reduce((sum, x) => sum + x.burnout, 0) /
    futureBurnoutTrend.length;

  let action = null;

  if (avgFuture > 65) action = "FORCE_REST";
  else if (avgFuture > 45) action = "SUGGEST_BALANCE";
  else action = "SAFE_MODE";

  setAutoAction(action);
}, [futureBurnoutTrend]);
useEffect(() => {
  if (!autoAction) return;

  if (autoAction === "FORCE_REST") {
    setSimulatedData(simulateFuture("rest"));
    setSelectedMode("rest");
  }

  if (autoAction === "SUGGEST_BALANCE") {
    setSimulatedData(simulateFuture("balanced"));
    setSelectedMode("balanced");
  }
}, [autoAction]);

useEffect(() => {
  if (!futureBurnoutTrend.length || hasRecommended) return;

  const rest = simulateFuture("rest");
  const balanced = simulateFuture("balanced");
  const push = simulateFuture("push");

  const avg = (arr) =>
    arr.reduce((sum, x) => sum + x.burnout, 0) / arr.length;

  // const scores = {
  //   rest: avg(rest),
  //   balanced: avg(balanced),
  //   push: avg(push),
  // };
const riskPenalty = (mode) => {
  if (mode === "push" && latestBurnout > 60) return 15;
  if (mode === "balanced" && latestBurnout > 70) return 5;
  return 0;
};

const scores = {
  rest: avg(rest) + riskPenalty("rest"),
  balanced: avg(balanced) + riskPenalty("balanced"),
  push: avg(push) + riskPenalty("push"),
};
  // ✅ store all scores
  setDecisionScores(scores);

  // ✅ find best
  const best = Object.keys(scores).reduce((a, b) =>
    scores[a] < scores[b] ? a : b
  );

  setBestMode(best);
  setHasRecommended(true);

  // ✅ confidence
  const values = Object.values(scores);
  const spread = Math.max(...values) - Math.min(...values);
  setConfidence(Math.min(100, Math.round(spread * 10)));

  // 🤖 AI explanation
  fetch("http://127.0.0.1:8000/ai-chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      message: `Explain why ${best} is best and others are worse (2 lines)`
    })
  })
    .then(res => res.json())
    .then(data => setRecommendationText(data.reply));

}, [futureBurnoutTrend, hasRecommended]);
useEffect(() => {
  if (!selectedMode || !futureBurnoutTrend.length) return;

  fetch("http://127.0.0.1:8000/ai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `
User selected ${selectedMode} mode.

Explain:
- Why burnout will change in this scenario
- What behavior causes it
- Keep it short (2 lines max, human tone)

Data:
Current burnout: ${latestBurnout}
Late night: ${featureBreakdown.late_night_intensity}
Weekend work: ${featureBreakdown.weekend_ratio}
Volatility: ${featureBreakdown.volatility_index}
      `,
    }),
  })
    .then(res => res.json())
    .then(data => {
      setAiExplain(data.reply);
    })
    .catch(err => console.error(err));
}, [selectedMode]);
useEffect(() => {
  if (!isFlatPrediction) return;

  fetch("http://127.0.0.1:8000/ai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     message: `
Explain the pattern in my burnout prediction trend.

If the trend is flat:
- explain that behavior and inputs are stable

If increasing:
- explain workload pressure

If decreasing:
- explain recovery

Be short, natural, and human-like (2 lines max).
`,
      burnout_score: decoded.burnout_score,
      burnout_status: decoded.burnout_status,
      features: decoded.feature_breakdown,
    }),
  })
    .then(res => res.json())
    .then(data => {
      setAiExplain(data.reply);
    })
    .catch(err => console.error(err));
}, [isFlatPrediction]);

  // Heatmap normalization
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const maxCount = Math.max(
    ...decoded.heatmap.map((d) => d.count || 0)
  );

  const heatmapData = decoded.heatmap.map((d) => ({
    date: d.date,
    count: maxCount === 0 ? 0 : Math.round((d.count / maxCount) * 10),
  }));

  // Colors
  let scoreColor = "#00ff99";
  if (latestBurnout >= 40) scoreColor = "#facc15";
  if (latestBurnout >= 60) scoreColor = "#f97316";
  if (latestBurnout >= 80) scoreColor = "#ef4444";
// 🔥 ADD BELOW YOUR EXISTING LOGIC (after calculations)
<button
  onClick={() => setView("timeline")}
  style={{
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "white",
    border: "none",
    cursor: "pointer"
  }}
>
  🎬 Timeline
</button>
if (view === "simulation") {
  return (
    <div style={{ display: "flex", color: "white" }}>
      <Sidebar setView={setView} />

      <div style={{ flex: 1, padding: "40px" }}>
        

       <DigitalTwin 
  latestBurnout={latestBurnout}
  features={featureBreakdown}
/>

      </div>
    </div>
  );
}
const generateTimelineStory = () => {
  const scores = decoded.weekly_burnout_scores || [];

  if (scores.length < 2) {
    return "Tracking will improve as more weekly data is collected 📊";
  }

  let story = "";

  for (let i = 1; i < scores.length; i++) {
    const diff = scores[i] - scores[i - 1];

    if (diff > 5) {
      story += `⚠️ Week ${i + 1}: Stress increased\n`;
    } else if (diff < -5) {
      story += `✅ Week ${i + 1}: Recovery phase\n`;
    } else {
      story += `➖ Week ${i + 1}: Stable\n`;
    }
  }

  return story;
};
const getTheme = () => {
  if (latestBurnout < 30) {
    return {
      primary: "#00ff99",
      glow: "rgba(0,255,150,0.4)"
    };
  }
  if (latestBurnout < 60) {
    return {
      primary: "#facc15",
      glow: "rgba(250,204,21,0.4)"
    };
  }
  return {
    primary: "#ef4444",
    glow: "rgba(239,68,68,0.5)"
  };
};

const theme = getTheme();
const getAlerts = () => {
  let alerts = [];

  if ((featureBreakdown.late_night_intensity || 0) > 30)
    alerts.push("🌙 Late-night work detected");

  if ((featureBreakdown.weekend_ratio || 0) > 20)
    alerts.push("📅 Weekend work is higher than ideal");

  if ((featureBreakdown.volatility_index || 0) > 35)
    alerts.push("📊 Work pattern is unstable");

  if (latestBurnout > 50)
    alerts.push("🔥 Burnout risk rising");

  return alerts;
};
const calculateBurnoutImpact = (mode, base, features) => {
  let score = base;

  const late = features.late_night_intensity || 0;
  const weekend = features.weekend_ratio || 0;
  const volatility = features.volatility_index || 0;

  if (mode === "rest") {
    score -= 0.4 * late;
    score -= 0.3 * weekend;
    score -= 0.2 * volatility;
  }

  if (mode === "balanced") {
    score -= 0.2 * late;
    score -= 0.15 * weekend;
    score -= 0.1 * volatility;
  }

  if (mode === "push") {
    score += 0.5 * late;
    score += 0.4 * weekend;
    score += 0.3 * volatility;
  }

  return Math.max(0, Math.min(100, score));
};
const getWeeklyGoal = () => {
  if (latestBurnout < 30) return "Maintain your current rhythm ✅";
  if (latestBurnout < 60) return "Reduce 1–2 work sessions this week ⚖️";
  return "Take 2 days off + reduce workload 🔴";
};
const getReasonTag = () => {
  if (featureBreakdown.late_night_intensity > 40)
    return "High late-night activity detected";
  if (featureBreakdown.weekend_ratio > 30)
    return "Excessive weekend workload";
  if (featureBreakdown.volatility_index > 40)
    return "Unstable work pattern";
  return "Stable performance pattern";
};
const focusScore = (
  100 -
  (featureBreakdown.volatility_index || 0) -
  (featureBreakdown.late_night_intensity || 0) / 2
).toFixed(1);

const alerts = getAlerts();


const getRiskTimeline = () => {
  if (!futureBurnoutTrend || futureBurnoutTrend.length === 0) return null;

  for (let i = 0; i < futureBurnoutTrend.length; i++) {
    if (futureBurnoutTrend[i].burnout >= 60) {
      return {
        week: futureBurnoutTrend[i].week,
        index: i + 1,
        level: "HIGH"
      };
    }
  }

  return null; // no danger
};

const riskTimeline = getRiskTimeline();

  return (
    <>
      {/* Sidebar */}
      {/* <div
        style={{
          width: "220px",
         background: "rgba(17,24,39,0.6)",
backdropFilter: "blur(10px)",
          padding: "30px",
          position: "fixed",
          height: "100vh",
          textAlign: "center",
        }}
      > */}
        {/* <img src={logo} alt="logo" style={{ width: "80px" }} />
        <h2>
          Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
        </h2>
<button
  onClick={() => setView("timeline")}
  style={{
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "white",
    border: "none",
    cursor: "pointer"
  }}
>
  🎬 Timeline
</button>
        
      </div> */}

      {/* Main */}
      <div
  style={{
    display: "flex",
   background: "transparent",
    color: "white",
    minHeight: "100vh",
  }}
>
  {/* <Sidebar /> */}
  <Sidebar setView={setView} />

  <div
    style={{
      flex: 1,
      background: "transparent",
      padding: "40px",
      boxSizing: "border-box",
      marginLeft:"220px"
    }}
  >
        {/* <h1>Welcome, {decoded.username}</h1> */}
      <h1 style={{ marginBottom: "20px" }}>
  Welcome, {decoded.username}
</h1>

{view === "timeline" ? (
  <BurnoutTimeline data={futureBurnoutTrend} />
) : view === "reflection" ? (
  <ReflectionPanel />
) : (
  <>
        {/* AI Coach */}
        {/* <div className="card" style={{ marginTop: "30px" }}>
      <h2>🧠 AI Burnout Coach</h2>
     <p style={{
whiteSpace: "pre-line",
lineHeight: "1.6",
color: "#cbd5e1",
fontFamily: "monospace"
}}>
{typedText}
<span className="cursor">|</span>
</p>

    </div> */}
      
<AICoach typedText={typedText} />
<LiveRadar 
  burnout={latestBurnout}
  features={featureBreakdown}
/>
        {/* Cards */}
        <div className="grid">
          <Card title="Burnout Score" value={latestBurnout} color={scoreColor} icon="🔥"  />
          <Card title="Health Index" value={healthIndex} color="#00ff99" icon="💚" />
          <Card title="Next Week Commits" value={predictedCommits} color="#00bfff" icon="📈" />
          <Card title="Burnout Risk" value={`${predictedBurnout}%`} color="#facc15" icon="⚠️" />
          <Card title="Pattern" value={pattern} color="#a78bfa" icon="🧠" small />
        </div>

        {/* Why */}
        
          {/* <h3>⚡ Why this score?</h3>
          <ul>
            {featureBreakdown.late_night_intensity > 30 && <li>Late night work</li>}
            {featureBreakdown.work_streak_index > 50 && <li>Long streak</li>}
            {featureBreakdown.volatility_index > 40 && <li>Irregular workload</li>}
            {featureBreakdown.weekend_ratio > 40 && <li>Weekend work</li>}
          </ul> */}
          {/* <button onClick={explainBurnout} className="button-w">
  Why this score?
</button> */}

<div style={{
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px"
}}>
  <button
    onClick={explainBurnout}
    style={{
      padding: "14px 28px",
      borderRadius: "30px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      color: "white",
//       background: "linear-gradient(135deg, #00ff99, #00bfff)",
// boxShadow: "0 0 20px rgba(0,255,150,0.4)",
background: "linear-gradient(135deg, #3d4a5f, #1a2425)",
boxShadow: "0 0 20px rgba(59,130,246,0.4)",
      // background: "linear-gradient(135deg, #00ff99, #00bfff)",
      // boxShadow: "0 10px 25px rgba(0,255,150,0.3)",
      transition: "0.3s"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.5)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,255,150,0.3)";
    }}
  >
    ⚡ Why this score?
  </button>
</div>
        

        {/* Heatmap */}
        <div className="card">
          <h2>Contribution Heatmap</h2>
          <CalendarHeatmap
            startDate={oneYearAgo}
            endDate={today}
            values={heatmapData}
            gutterSize={4}
            showMonthLabels
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count < 3) return "color-scale-1";
              if (value.count < 6) return "color-scale-2";
              if (value.count < 10) return "color-scale-3";
              return "color-scale-4";
            } } />
        </div>
<div className="card card-wide" style={{
  marginTop: "20px",
   boxShadow: `0 10px 30px ${theme.glow}`,
  borderLeft: riskLevel === "DANGER" ? "4px solid #ef4444"
    : riskLevel === "WARNING" ? "4px solid #facc15"
    : "4px solid #00ff99"
}}>
  <h2>🛡️ AI Protection System</h2>

  <h3 style={{
    color:
      riskLevel === "DANGER" ? "#ef4444"
      : riskLevel === "WARNING" ? "#facc15"
      : "#00ff99"
  }}>
    {riskLevel}
  </h3>

  <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
    {getProtectionMessage()}
  </p>
</div>
<div className="card" style={{ marginTop: "20px" ,marginBottom:"20px"}}>
  <h2>🚨 AI Actions</h2>

  <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
    {interventions.map((action, i) => (
      <div
        key={i}
        style={{
          background: "rgba(56,189,248,0.1)",
          border: "1px solid rgba(56,189,248,0.3)",
          padding: "12px",
          borderRadius: "10px",
          fontSize: "14px"
        }}
      >
        {action}
      </div>
    ))}
  </div>
</div>
        {/* Chart */}
        <div className="card card-wide">
          <h2>Commits Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={commitData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line dataKey="commits" stroke="#00ff99" />
              <Line dataKey="predicted" stroke="#00bfff" />
            </LineChart>
          </ResponsiveContainer>
        </div>

<div className="card card-wide" style={{
  marginTop: "20px",
  borderLeft: "4px solid #00ff99",
   boxShadow: `0 10px 30px ${theme.glow}`
}}>
  <h2>🧠 AI Recommendation</h2>

  {bestMode && (
    <h3 style={{ color: "#00ff99" }}>
      Recommended: {
        bestMode === "rest" ? "🧘 Take Break" :
        bestMode === "balanced" ? "⚖️ Stay Balanced" :
        "🚀 Push Hard"
      }
    </h3>
  )}

  <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
    {recommendationText}
  </p>
  {/* <p style={{ color: "#94a3b8", fontSize: "13px" }}>
  Reason: {getReasonTag()}
</p> */}
<p style={{
  marginTop: "8px",
  fontSize: "13px",
  color: "#94a3b8",
  background: "rgba(148,163,184,0.08)",
  padding: "6px 10px",
  borderRadius: "8px",
  display: "inline-block"
}}>
  💡 {getReasonTag()}
</p>
</div>
<div className="card card-wide" style={{ marginTop: "20px" }}>
  <h2>⚖️ Decision Comparison</h2>

  {decisionScores && Object.entries(decisionScores).map(([mode, score]) => {
    const isBest = mode === bestMode;

    return (
      <div
        key={mode}
        style={{
          marginTop: "12px",
          padding: "14px",
          borderRadius: "12px",
          background: isBest
            ? "rgba(0,255,150,0.1)"
            : "rgba(255,255,255,0.05)",
          border: isBest
            ? "1px solid rgba(0,255,150,0.5)"
            : "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <strong>
            {mode === "rest" && "🧘 Take Break"}
            {mode === "balanced" && "⚖️ Stay Balanced"}
            {mode === "push" && "🚀 Push Hard"}
          </strong>

          {isBest && (
            <span style={{ marginLeft: "10px", color: "#00ff99" }}>
              ⭐ BEST
            </span>
          )}
        </div>

        <div style={{
          color: isBest ? "#00ff99" : "#cbd5e1",
          fontWeight: "600"
        }}>
          {score.toFixed(1)}%
        </div>
      </div>
    );
  })}

  {/* {confidence !== null && (
    <p style={{ color: "#38bdf8", marginTop: "10px" }}>
  Confidence: {confidence.toFixed(0)}%
</p>
  )} */}
  <div style={{
  marginTop: "8px",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "10px",
  overflow: "hidden",
  height: "8px"
}}>
  <div style={{
    width: `${confidence}%`,
    background: confidence > 60 ? "#00ff99" : "#facc15",
    height: "100%",
    transition: "0.4s"
  }} />
</div>
</div>
<div className="card card-wide" style={{
  marginTop: "20px",
  borderLeft:
    autoAction === "FORCE_REST"
      ? "4px solid #ef4444"
      : autoAction === "SUGGEST_BALANCE"
      ? "4px solid #facc15"
      : "4px solid #00ff99"
}}>
  <h2>🤖 AI Auto Intervention</h2>

  {autoAction === "FORCE_REST" && (
    <p style={{ color: "#ef4444" }}>
      🔴 AI detected high burnout risk → Forced recovery mode activated
    </p>
  )}

  {autoAction === "SUGGEST_BALANCE" && (
    <p style={{ color: "#facc15" }}>
      🟡 AI suggests balancing workload to prevent escalation
    </p>
  )}

  {autoAction === "SAFE_MODE" && (
    <p style={{ color: "#00ff99" }}>
      🟢 You are stable → No intervention needed
    </p>
  )}
</div>
<div style={{
  display: "flex",
  gap: "30px",
  marginTop:"20px",
  marginBottom: "15px",
justifyContent:"center"
}}>
  <button onClick={() => {
  setSimulatedData(simulateFuture("rest"));
  setSelectedMode("rest");
}}>
  🧘 Take Break
</button>

<button onClick={() => {
  setSimulatedData(simulateFuture("balanced"));
  setSelectedMode("balanced");
}}>
  ⚖️ Stay Balanced
</button>

<button onClick={() => {
  setSimulatedData(simulateFuture("push"));
  setSelectedMode("push");
}}>
  🚀 Push Hard
</button>
</div>
<div className="card card-wide" style={{ marginTop: "20px", position: "relative" }}>
  <h2>🔮 Burnout Forecast (4 Weeks)</h2>
  {aiExplain && (
  <div style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(30,41,59,0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "12px 16px",
    borderRadius: "12px",
    maxWidth: "260px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#e2e8f0",
    boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
    zIndex: 10
  }}>
    🤖 <strong>AI Insight</strong>
    <br />
    {aiExplain}
  </div>
)}
  <ResponsiveContainer width="100%" height={250}>
   <LineChart data={simulatedData || futureBurnoutTrend}>
      <CartesianGrid stroke="#333" strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey="burnout" 
        stroke="#f97316" 
        strokeWidth={3} 
        dot={{ r: 5 }} 
        activeDot={{ r: 7 }} 
      />
    </LineChart>
  </ResponsiveContainer>
</div>
<div className="card card-wide" style={{
  marginTop: "20px",
  marginBottom:"20px",
  borderLeft: riskTimeline ? "4px solid #ef4444" : "4px solid #00ff99",
   boxShadow: `0 10px 30px ${theme.glow}`
}}>
  <h2>⏳ Burnout Risk Timeline</h2>

  {riskTimeline ? (
    <>
      <h3 style={{ color: "#ef4444" }}>
        ⚠️ Risk in {riskTimeline.index} week(s)
      </h3>

      <p style={{ color: "#cbd5e1" }}>
        You may reach high burnout by week {riskTimeline.week}
      </p>

      <p style={{
        marginTop: "10px",
        fontSize: "13px",
        color: "#94a3b8"
      }}>
        AI suggests reducing workload before this point
      </p>
    </>
  ) : (
    <p style={{ color: "#00ff99" }}>
       No burnout risk detected in next 4 weeks
    </p>
  )}
</div>

       




{/* 🚨 Alerts */}
<div className="card card-wide" style={{ borderLeft: "4px solid #facc15" }}>
  <h2>🚨 Smart Alerts</h2>

  {alerts.length === 0 ? (
    <p style={{ color: "#00ff99" }}>All good 👍</p>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            background: "rgba(250,204,21,0.1)",
            border: "1px solid rgba(250,204,21,0.3)",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.2s"
          }}
          onClick={() => explainBurnout()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ⚠️ {a}
        </div>
      ))}
    </div>
  )}

  {alerts.length > 0 && (
    <button
      onClick={explainBurnout}
      style={{
        marginTop: "15px",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg, #00ff99, #00bfff)",
        color: "#022c22",
        fontWeight: "600",
        cursor: "pointer"
      }}
    >
      ⚡ Fix with AI
    </button>
  )}
</div>

{/* 🎯 Weekly Goal */}
<div className="card card-wide" style={{ marginTop: "20px" }}>
  <h2>🎯 Weekly Goal</h2>
 <h3 style={{
  color: "#38bdf8",
  background: "rgba(56,189,248,0.1)",
  padding: "10px 15px",
  borderRadius: "10px",
  display: "inline-block"
}}>
  {getWeeklyGoal()}
</h3>
</div>
<ReflectionPanel onSave={loadReflections} />
{/* <div className="card card-wide" style={{ marginTop: "20px" }}>
  <h2>🕒 Reflection Timeline</h2>

  {reflections.length === 0 ? (
    <p style={{ color: "#94a3b8" }}>
      No reflections yet
    </p>
  ) : (
    reflections.map((item, i) => (
      <div
        key={i}
        style={{
          marginTop: "12px",
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <p style={{ color: "#e2e8f0" }}>
          {item.text}
        </p>

        <small style={{ color: "#94a3b8" }}>
          {new Date(item.created_at).toLocaleString()}
        </small>
      </div>
    ))
  )}
</div> */}
{/* 🧑‍💻 Comparison */}
<div className="card card-wide" style={{ marginTop: "20px" }}>
  <h2>🧑‍💻 You vs Ideal Developer</h2>

  <p>Late Night: {featureBreakdown.late_night_intensity}% (Ideal: &lt;20%)</p>
  <p>Weekend Work: {featureBreakdown.weekend_ratio}% (Ideal: &lt;15%)</p>
  <p>
  Stability: {featureBreakdown.volatility_index?.toFixed(1)}% (Ideal: &lt;30%)
</p>
</div>
        </>
)}
      </div>

    </div>
    {decoded &&(<AIChat
        burnoutScore={decoded.burnout_score}
        burnoutStatus={decoded.burnout_status} />)}
        {showModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "#1e293b",
      padding: "30px",
      borderRadius: "15px",
      maxWidth: "600px",
      color: "white",
      boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
    }}>
      <h2 style={{ marginBottom: "15px" }}> AI Explanation</h2>

      <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
        {aiExplain}
      </p>

      <button
        onClick={() => setShowModal(false)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "10px",
          background: "#FF8C00",
          color: "white",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

{showTip && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "linear-gradient(135deg, #00ff99, #00bfff)",
    color: "#022c22",
    padding: "18px 22px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,255,150,0.4)",
    zIndex: 1000,
    animation: "slideIn 0.5s ease"
  }}>
    <strong>💡 Daily Insight</strong>
    <p style={{ marginTop: "5px", fontSize: "14px" }}>
      {latestBurnout > 40
        ? "Take a lighter day today — your pattern shows rising fatigue."
        : "You're in a great rhythm — keep it consistent!"}
    </p>

    <button
      onClick={() => setShowTip(false)}
      style={{
        marginTop: "10px",
        border: "none",
        background: "#022c22",
        color: "white",
        padding: "5px 10px",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Close
    </button>
  </div>
)}
</>

  );
  
}

// 🔥 Modern Card Component


export default Dashboard;