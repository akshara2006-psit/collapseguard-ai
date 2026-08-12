



// import logo from "../assets/logo.png";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import AIChat from "../components/AIChat";
// import Card from "../components/Card";
// import AICoach from "../components/AICoach";
// import Sidebar from "../components/Sidebar";
// import BurnoutTimeline from "../components/BurnoutTimeline";
// import DigitalTwin from "../components/DigitalTwin";
// import "./heatmap.css";
// import LiveRadar from "../components/LiveRadar";
// import ReflectionPanel from "../components/ReflectionPanel";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function Dashboard({ user }) {
//   console.log(user);
//   const [showTip, setShowTip] = useState(false);
//   const location = useLocation();
//   const [reflections, setReflections] = useState([]);
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
// const [autoAction, setAutoAction] = useState(null);
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
// const loadReflections = () => {
//   fetch("http://127.0.0.1:8000/reflections")
//     .then((res) => res.json())
//     .then((data) => {
//       setReflections(data.reflections || []);
//     })
//     .catch((err) => console.error(err));
// };
// useEffect(() => {
//   loadReflections();
// }, []);
// useEffect(() => {
//   setTimeout(() => {
//     setShowTip(true);
//   }, 800); // smooth delay like reward popup
// }, []);

//   const featureBreakdown = decoded.feature_breakdown || {};
//   const burnoutScores =
//     decoded.weekly_burnout_scores || [decoded.burnout_score];
//   const latestBurnout = burnoutScores[burnoutScores.length - 1];
// const getAIPersonality = () => {
//   if (latestBurnout < 30) return "chill";
//   if (latestBurnout < 60) return "supportive";
//   return "strict";
// };
// const aiPersonality = getAIPersonality();
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
//   let last = latestBurnout;

//   return futureBurnoutTrend.map((p, i) => {
//     const next = calculateBurnoutImpact(
//       mode,
//       last + Math.random() * 5,
//       featureBreakdown
//     );

//     last = next;

//     return {
//       week: p.week,
//       burnout: Number(next.toFixed(1)),
//     };
//   });
// };
// const [simulatedData, setSimulatedData] = useState(null);
// const [view, setView] = useState("dashboard");
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
//   if (!futureBurnoutTrend.length) return;

//   const avgFuture =
//     futureBurnoutTrend.reduce((sum, x) => sum + x.burnout, 0) /
//     futureBurnoutTrend.length;

//   let action = null;

//   if (avgFuture > 65) action = "FORCE_REST";
//   else if (avgFuture > 45) action = "SUGGEST_BALANCE";
//   else action = "SAFE_MODE";

//   setAutoAction(action);
// }, [futureBurnoutTrend]);
// useEffect(() => {
//   if (!autoAction) return;

//   if (autoAction === "FORCE_REST") {
//     setSimulatedData(simulateFuture("rest"));
//     setSelectedMode("rest");
//   }

//   if (autoAction === "SUGGEST_BALANCE") {
//     setSimulatedData(simulateFuture("balanced"));
//     setSelectedMode("balanced");
//   }
// }, [autoAction]);

// useEffect(() => {
//   if (!futureBurnoutTrend.length || hasRecommended) return;

//   const rest = simulateFuture("rest");
//   const balanced = simulateFuture("balanced");
//   const push = simulateFuture("push");

//   const avg = (arr) =>
//     arr.reduce((sum, x) => sum + x.burnout, 0) / arr.length;

//   // const scores = {
//   //   rest: avg(rest),
//   //   balanced: avg(balanced),
//   //   push: avg(push),
//   // };
// const riskPenalty = (mode) => {
//   if (mode === "push" && latestBurnout > 60) return 15;
//   if (mode === "balanced" && latestBurnout > 70) return 5;
//   return 0;
// };

// const scores = {
//   rest: avg(rest) + riskPenalty("rest"),
//   balanced: avg(balanced) + riskPenalty("balanced"),
//   push: avg(push) + riskPenalty("push"),
// };
//   // ✅ store all scores
//   setDecisionScores(scores);

//   // ✅ find best
//   const best = Object.keys(scores).reduce((a, b) =>
//     scores[a] < scores[b] ? a : b
//   );

//   setBestMode(best);
//   setHasRecommended(true);

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

//   // const maxCount = Math.max(
//   //   ...decoded.heatmap.map((d) => d.count || 0)
//   // );

//   // const heatmapData = decoded.heatmap.map((d) => ({
//   //   date: d.date,
//   //   count: maxCount === 0 ? 0 : Math.round((d.count / maxCount) * 10),
//   // }));
//   const heatmap = decoded?.heatmap || [];

// const maxCount =
//   heatmap.length > 0
//     ? Math.max(...heatmap.map((d) => d.count || 0))
//     : 0;

// const heatmapData = heatmap.map((d) => ({
//   date: d.date,
//   count: maxCount === 0 ? 0 : Math.round((d.count / maxCount) * 10),
// }));

//   // Colors
//   let scoreColor = "#00ff99";
//   if (latestBurnout >= 40) scoreColor = "#facc15";
//   if (latestBurnout >= 60) scoreColor = "#f97316";
//   if (latestBurnout >= 80) scoreColor = "#ef4444";
// // 🔥 ADD BELOW YOUR EXISTING LOGIC (after calculations)
// <button
//   onClick={() => setView("timeline")}
//   style={{
//     marginTop: "20px",
//     padding: "10px",
//     borderRadius: "10px",
//     background: "#1e293b",
//     color: "white",
//     border: "none",
//     cursor: "pointer"
//   }}
// >
//   🎬 Timeline
// </button>
// if (view === "simulation") {
//   return (
//     <div style={{ display: "flex", color: "white" }}>
//       <Sidebar setView={setView} />

//       <div style={{ flex: 1, padding: "40px" }}>
        

//        <DigitalTwin 
//   latestBurnout={latestBurnout}
//   features={featureBreakdown}
// />

//       </div>
//     </div>
//   );
// }
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
// const getTheme = () => {
//   if (latestBurnout < 30) {
//     return {
//       primary: "#00ff99",
//       glow: "rgba(0,255,150,0.4)"
//     };
//   }
//   if (latestBurnout < 60) {
//     return {
//       primary: "#facc15",
//       glow: "rgba(250,204,21,0.4)"
//     };
//   }
//   return {
//     primary: "#ef4444",
//     glow: "rgba(239,68,68,0.5)"
//   };
// };

// const theme = getTheme();
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
// const calculateBurnoutImpact = (mode, base, features) => {
//   let score = base;

//   const late = features.late_night_intensity || 0;
//   const weekend = features.weekend_ratio || 0;
//   const volatility = features.volatility_index || 0;

//   if (mode === "rest") {
//     score -= 0.4 * late;
//     score -= 0.3 * weekend;
//     score -= 0.2 * volatility;
//   }

//   if (mode === "balanced") {
//     score -= 0.2 * late;
//     score -= 0.15 * weekend;
//     score -= 0.1 * volatility;
//   }

//   if (mode === "push") {
//     score += 0.5 * late;
//     score += 0.4 * weekend;
//     score += 0.3 * volatility;
//   }

//   return Math.max(0, Math.min(100, score));
// };
// const getWeeklyGoal = () => {
//   if (latestBurnout < 30) return "Maintain your current rhythm ✅";
//   if (latestBurnout < 60) return "Reduce 1–2 work sessions this week ⚖️";
//   return "Take 2 days off + reduce workload 🔴";
// };
// const getReasonTag = () => {
//   if (featureBreakdown.late_night_intensity > 40)
//     return "High late-night activity detected";
//   if (featureBreakdown.weekend_ratio > 30)
//     return "Excessive weekend workload";
//   if (featureBreakdown.volatility_index > 40)
//     return "Unstable work pattern";
//   return "Stable performance pattern";
// };
// const focusScore = (
//   100 -
//   (featureBreakdown.volatility_index || 0) -
//   (featureBreakdown.late_night_intensity || 0) / 2
// ).toFixed(1);

// const alerts = getAlerts();


// const getRiskTimeline = () => {
//   if (!futureBurnoutTrend || futureBurnoutTrend.length === 0) return null;

//   for (let i = 0; i < futureBurnoutTrend.length; i++) {
//     if (futureBurnoutTrend[i].burnout >= 60) {
//       return {
//         week: futureBurnoutTrend[i].week,
//         index: i + 1,
//         level: "HIGH"
//       };
//     }
//   }

//   return null; // no danger
// };

// const riskTimeline = getRiskTimeline();

//   return (
//     <>
//       {/* Sidebar */}
//       {/* <div
//         style={{
//           width: "220px",
//          background: "rgba(17,24,39,0.6)",
// backdropFilter: "blur(10px)",
//           padding: "30px",
//           position: "fixed",
//           height: "100vh",
//           textAlign: "center",
//         }}
//       > */}
//         {/* <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h2>
//           Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
//         </h2>
// <button
//   onClick={() => setView("timeline")}
//   style={{
//     marginTop: "20px",
//     padding: "10px",
//     borderRadius: "10px",
//     background: "#1e293b",
//     color: "white",
//     border: "none",
//     cursor: "pointer"
//   }}
// >
//   🎬 Timeline
// </button>
        
//       </div> */}

//       {/* Main */}
//       <div
//   style={{
//     display: "flex",
//    background: "transparent",
//     color: "white",
//     minHeight: "100vh",
//   }}
// >
//   {/* <Sidebar /> */}
//   <Sidebar setView={setView} />

//   <div
//     style={{
//       flex: 1,
//       background: "transparent",
//       padding: "40px",
//       boxSizing: "border-box",
//       marginLeft:"220px"
//     }}
//   >
//         {/* <h1>Welcome, {decoded.username}</h1> */}
//       <h1 style={{ marginBottom: "20px" }}>
//   Welcome, {decoded.username}
// </h1>

// {view === "timeline" ? (
//   <BurnoutTimeline data={futureBurnoutTrend} />
// ) : view === "reflection" ? (
//   <ReflectionPanel />
// ) : (
//   <>
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
      
// <AICoach typedText={typedText} />
// <LiveRadar 
//   burnout={latestBurnout}
//   features={featureBreakdown}
// />
//         {/* Cards */}
//         <div className="grid">
//           <Card title="Burnout Score" value={latestBurnout} color={scoreColor} icon="🔥"  />
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
//   marginTop: "20px",
//   marginBottom: "20px"
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
// <div className="card card-wide" style={{
//   marginTop: "20px",
//    boxShadow: `0 10px 30px ${theme.glow}`,
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
// <div className="card" style={{ marginTop: "20px" ,marginBottom:"20px"}}>
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
//         <div className="card card-wide">
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

// <div className="card card-wide" style={{
//   marginTop: "20px",
//   borderLeft: "4px solid #00ff99",
//    boxShadow: `0 10px 30px ${theme.glow}`
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
//   {/* <p style={{ color: "#94a3b8", fontSize: "13px" }}>
//   Reason: {getReasonTag()}
// </p> */}
// <p style={{
//   marginTop: "8px",
//   fontSize: "13px",
//   color: "#94a3b8",
//   background: "rgba(148,163,184,0.08)",
//   padding: "6px 10px",
//   borderRadius: "8px",
//   display: "inline-block"
// }}>
//   💡 {getReasonTag()}
// </p>
// </div>
// <div className="card card-wide" style={{ marginTop: "20px" }}>
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

//   {/* {confidence !== null && (
//     <p style={{ color: "#38bdf8", marginTop: "10px" }}>
//   Confidence: {confidence.toFixed(0)}%
// </p>
//   )} */}
//   <div style={{
//   marginTop: "8px",
//   background: "rgba(255,255,255,0.1)",
//   borderRadius: "10px",
//   overflow: "hidden",
//   height: "8px"
// }}>
//   <div style={{
//     width: `${confidence}%`,
//     background: confidence > 60 ? "#00ff99" : "#facc15",
//     height: "100%",
//     transition: "0.4s"
//   }} />
// </div>
// </div>
// <div className="card card-wide" style={{
//   marginTop: "20px",
//   borderLeft:
//     autoAction === "FORCE_REST"
//       ? "4px solid #ef4444"
//       : autoAction === "SUGGEST_BALANCE"
//       ? "4px solid #facc15"
//       : "4px solid #00ff99"
// }}>
//   <h2>🤖 AI Auto Intervention</h2>

//   {autoAction === "FORCE_REST" && (
//     <p style={{ color: "#ef4444" }}>
//       🔴 AI detected high burnout risk → Forced recovery mode activated
//     </p>
//   )}

//   {autoAction === "SUGGEST_BALANCE" && (
//     <p style={{ color: "#facc15" }}>
//       🟡 AI suggests balancing workload to prevent escalation
//     </p>
//   )}

//   {autoAction === "SAFE_MODE" && (
//     <p style={{ color: "#00ff99" }}>
//       🟢 You are stable → No intervention needed
//     </p>
//   )}
// </div>
// <div style={{
//   display: "flex",
//   gap: "30px",
//   marginTop:"20px",
//   marginBottom: "15px",
// justifyContent:"center"
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
// <div className="card card-wide" style={{ marginTop: "20px", position: "relative" }}>
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
// <div className="card card-wide" style={{
//   marginTop: "20px",
//   marginBottom:"20px",
//   borderLeft: riskTimeline ? "4px solid #ef4444" : "4px solid #00ff99",
//    boxShadow: `0 10px 30px ${theme.glow}`
// }}>
//   <h2>⏳ Burnout Risk Timeline</h2>

//   {riskTimeline ? (
//     <>
//       <h3 style={{ color: "#ef4444" }}>
//         ⚠️ Risk in {riskTimeline.index} week(s)
//       </h3>

//       <p style={{ color: "#cbd5e1" }}>
//         You may reach high burnout by week {riskTimeline.week}
//       </p>

//       <p style={{
//         marginTop: "10px",
//         fontSize: "13px",
//         color: "#94a3b8"
//       }}>
//         AI suggests reducing workload before this point
//       </p>
//     </>
//   ) : (
//     <p style={{ color: "#00ff99" }}>
//        No burnout risk detected in next 4 weeks
//     </p>
//   )}
// </div>

       




// {/* 🚨 Alerts */}
// <div className="card card-wide" style={{ borderLeft: "4px solid #facc15" }}>
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
// <div className="card card-wide" style={{ marginTop: "20px" }}>
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
// <ReflectionPanel onSave={loadReflections} />
// {/* <div className="card card-wide" style={{ marginTop: "20px" }}>
//   <h2>🕒 Reflection Timeline</h2>

//   {reflections.length === 0 ? (
//     <p style={{ color: "#94a3b8" }}>
//       No reflections yet
//     </p>
//   ) : (
//     reflections.map((item, i) => (
//       <div
//         key={i}
//         style={{
//           marginTop: "12px",
//           padding: "12px",
//           borderRadius: "10px",
//           background: "rgba(255,255,255,0.05)",
//           border: "1px solid rgba(255,255,255,0.08)"
//         }}
//       >
//         <p style={{ color: "#e2e8f0" }}>
//           {item.text}
//         </p>

//         <small style={{ color: "#94a3b8" }}>
//           {new Date(item.created_at).toLocaleString()}
//         </small>
//       </div>
//     ))
//   )}
// </div> */}
// {/* 🧑‍💻 Comparison */}
// <div className="card card-wide" style={{ marginTop: "20px" }}>
//   <h2>🧑‍💻 You vs Ideal Developer</h2>

//   <p>Late Night: {featureBreakdown.late_night_intensity}% (Ideal: &lt;20%)</p>
//   <p>Weekend Work: {featureBreakdown.weekend_ratio}% (Ideal: &lt;15%)</p>
//   <p>
//   Stability: {featureBreakdown.volatility_index?.toFixed(1)}% (Ideal: &lt;30%)
// </p>
// </div>
//         </>
// )}
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


// export default Dashboard;







// import { useState, useEffect, useMemo, useCallback } from "react";

// import CalendarHeatmap from "react-calendar-heatmap";

// import AIChat from "../components/AIChat";
// import Card from "../components/Card";
// import AICoach from "../components/AICoach";
// import Sidebar from "../components/Sidebar";
// import BurnoutTimeline from "../components/BurnoutTimeline";
// import DigitalTwin from "../components/DigitalTwin";
// import LiveRadar from "../components/LiveRadar";
// import ReflectionPanel from "../components/ReflectionPanel";

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


// const API_URL = "http://localhost:8000";


// function Dashboard({ user }) {

//   // =========================================================
//   // BASIC STATE
//   // =========================================================

//   const [dashboardData, setDashboardData] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   const [view, setView] = useState("dashboard");

//   const [showTip, setShowTip] = useState(false);

//   const [showModal, setShowModal] = useState(false);

//   const [aiExplain, setAiExplain] = useState("");

//   const [typedText, setTypedText] = useState("");

//   const [reflections, setReflections] = useState([]);

//   // =========================================================
//   // AI / SIMULATION STATE
//   // =========================================================

//   const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);

//   const [simulatedData, setSimulatedData] = useState(null);

//   const [selectedMode, setSelectedMode] = useState(null);

//   const [isFlatPrediction, setIsFlatPrediction] = useState(false);

//   const [autoAction, setAutoAction] = useState(null);

//   const [bestMode, setBestMode] = useState(null);

//   const [recommendationText, setRecommendationText] = useState("");

//   const [decisionScores, setDecisionScores] = useState(null);

//   const [confidence, setConfidence] = useState(null);

//   const [hasRecommended, setHasRecommended] = useState(false);


//   // =========================================================
//   // LOAD DASHBOARD DATA
//   //
//   // IMPORTANT:
//   // NO URL DATA
//   // NO decodeURIComponent
//   // NO URLSearchParams
//   // =========================================================

//   const loadDashboardData = useCallback(async () => {

//     try {

//       setLoading(true);

//       setError("");

//       console.log(
//         "Loading CollapseGuard dashboard..."
//       );

//       const response = await fetch(
//         `${API_URL}/dashboard-data`,
//         {
//           method: "GET",

//           credentials: "include",

//           headers: {
//             "Accept": "application/json",
//           },
//         }
//       );


//       // -----------------------------------------------------
//       // SESSION NOT FOUND
//       // -----------------------------------------------------

//       if (response.status === 401) {

//         console.error(
//           "Dashboard session not found."
//         );

//         setError(
//           "Your dashboard session has expired. Please login with GitHub again."
//         );

//         setLoading(false);

//         return;
//       }


//       // -----------------------------------------------------
//       // OTHER BACKEND ERROR
//       // -----------------------------------------------------

//       if (!response.ok) {

//         let message =
//           `Dashboard request failed (${response.status})`;

//         try {

//           const errorData =
//             await response.json();

//           if (errorData?.detail) {
//             message = errorData.detail;
//           }

//           if (errorData?.error) {
//             message = errorData.error;
//           }

//         } catch {
//           // Ignore JSON parsing error
//         }

//         throw new Error(message);
//       }


//       const responseData =
//         await response.json();


//       console.log(
//         "Dashboard response received:",
//         responseData
//       );


//       // =====================================================
//       // SUPPORT BOTH POSSIBLE AUTH.PY RESPONSE FORMATS
//       // =====================================================
//       //
//       // New auth.py:
//       //
//       // {
//       //   success: true,
//       //   username: "...",
//       //   data: {...}
//       // }
//       //
//       // Older server:
//       //
//       // {
//       //   username: "...",
//       //   burnout_score: ...,
//       //   ...
//       // }
//       //
//       // =====================================================

//       let data = null;


//       if (
//         responseData &&
//         responseData.data &&
//         typeof responseData.data === "object"
//       ) {

//         data = responseData.data;

//       } else if (
//         responseData &&
//         (
//           responseData.burnout_score !== undefined ||
//           responseData.heatmap !== undefined ||
//           responseData.feature_breakdown !== undefined
//         )
//       ) {

//         data = responseData;

//       }


//       if (!data) {

//         throw new Error(
//           "Dashboard data is empty."
//         );
//       }


//       // -----------------------------------------------------
//       // NORMALIZE DATA
//       // -----------------------------------------------------

//       const normalizedData = {

//         username:
//           data.username ||
//           responseData.username ||
//           user?.login ||
//           user?.username ||
//           "Developer",

//         burnout_score:
//           Number(data.burnout_score ?? 0),

//         burnout_status:
//           data.burnout_status ||
//           "Unknown",

//         burnout_recommendation:
//           Array.isArray(data.burnout_recommendation)
//             ? data.burnout_recommendation
//             : data.burnout_recommendation
//               ? [data.burnout_recommendation]
//               : [],

//         ai_coach:
//           data.ai_coach ||
//           "Analyzing your development activity...",

//         feature_breakdown:
//           data.feature_breakdown &&
//           typeof data.feature_breakdown === "object"
//             ? data.feature_breakdown
//             : {},

//         total_commits:
//           Number(data.total_commits ?? 0),

//         heatmap:
//           Array.isArray(data.heatmap)
//             ? data.heatmap
//             : [],

//         weekly_commit_activity:
//           data.weekly_commit_activity &&
//           typeof data.weekly_commit_activity === "object"
//             ? data.weekly_commit_activity
//             : {},

//         predicted_next_week_commits:
//           Number(
//             data.predicted_next_week_commits ?? 0
//           ),

//         weekly_burnout_scores:
//           Array.isArray(data.weekly_burnout_scores)
//             ? data.weekly_burnout_scores
//             : [],

//         predicted_burnout:
//           data.predicted_burnout !== undefined
//             ? Number(data.predicted_burnout)
//             : undefined,
//       };


//       console.log(
//         "Normalized dashboard data:",
//         normalizedData
//       );


//       setDashboardData(
//         normalizedData
//       );


//       setLoading(false);

//     } catch (err) {

//       console.error(
//         "Dashboard loading error:",
//         err
//       );

//       setError(
//         err?.message ||
//         "Unable to load your dashboard."
//       );

//       setLoading(false);
//     }

//   }, [user]);


//   // =========================================================
//   // LOAD DATA ONCE
//   // =========================================================

//   useEffect(() => {

//     loadDashboardData();

//   }, [loadDashboardData]);


//   // =========================================================
//   // LOADING SCREEN
//   // =========================================================

//   if (loading) {

//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#020617",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           gap: "20px",
//         }}
//       >

//         <div
//           style={{
//             fontSize: "50px",
//           }}
//         >
//           🧠
//         </div>

//         <h2>
//           Loading CollapseGuard...
//         </h2>

//         <p
//           style={{
//             color: "#94a3b8",
//           }}
//         >
//           Fetching your GitHub wellness intelligence
//         </p>

//       </div>
//     );
//   }


//   // =========================================================
//   // ERROR SCREEN
//   // =========================================================

//   if (error || !dashboardData) {

//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#020617",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           padding: "30px",
//           textAlign: "center",
//         }}
//       >

//         <div
//           style={{
//             fontSize: "55px",
//           }}
//         >
//           ⚠️
//         </div>

//         <h2>
//           Unable to load your dashboard
//         </h2>

//         <p
//           style={{
//             color: "#94a3b8",
//             maxWidth: "600px",
//           }}
//         >
//           {error ||
//             "Dashboard data was not found."}
//         </p>

//         <button
//           onClick={loadDashboardData}
//           style={{
//             marginTop: "20px",
//             padding: "13px 25px",
//             borderRadius: "12px",
//             border: "none",
//             background:
//               "linear-gradient(135deg,#00ff99,#00bfff)",
//             color: "#022c22",
//             fontWeight: "700",
//             cursor: "pointer",
//           }}
//         >
//           🔄 Reload Dashboard
//         </button>

//       </div>
//     );
//   }


//   // =========================================================
//   // MAIN DATA
//   // =========================================================

//   const decoded = dashboardData;


//   const featureBreakdown =
//     decoded.feature_breakdown || {};


//   const burnoutScores =
//     decoded.weekly_burnout_scores?.length
//       ? decoded.weekly_burnout_scores
//       : [decoded.burnout_score];


//   const latestBurnout = Number(
//     burnoutScores[
//       burnoutScores.length - 1
//     ] ?? 0
//   );


//   // =========================================================
//   // HEALTH INDEX
//   // =========================================================

//   const healthIndex =
//     Math.max(
//       0,
//       Math.min(
//         100,
//         100 - latestBurnout
//       )
//     ).toFixed(1);


//   // =========================================================
//   // PREDICTED BURNOUT
//   // =========================================================

//   const predictedBurnout =
//     Number(
//       decoded.predicted_burnout ??
//       latestBurnout
//     );


//   // =========================================================
//   // NEXT WEEK COMMITS
//   // =========================================================

//   const predictedCommits =
//     Number(
//       decoded.predicted_next_week_commits ?? 0
//     );


//   // =========================================================
//   // PATTERN DETECTION
//   // =========================================================

//   let pattern =
//     "Balanced Developer";


//   if (
//     Number(
//       featureBreakdown.weekend_ratio || 0
//     ) > 50
//   ) {

//     pattern =
//       "Weekend Warrior";

//   } else if (
//     Number(
//       featureBreakdown.late_night_intensity || 0
//     ) > 40
//   ) {

//     pattern =
//       "Night Owl";

//   } else if (
//     Number(
//       featureBreakdown.volatility_index || 0
//     ) > 50
//   ) {

//     pattern =
//       "Burst Worker";
//   }


//   // =========================================================
//   // SCORE COLOR
//   // =========================================================

//   let scoreColor =
//     "#00ff99";


//   if (latestBurnout >= 40)
//     scoreColor = "#facc15";


//   if (latestBurnout >= 60)
//     scoreColor = "#f97316";


//   if (latestBurnout >= 80)
//     scoreColor = "#ef4444";


//   // =========================================================
//   // THEME
//   // =========================================================

//   const theme =
//     latestBurnout < 30
//       ? {
//           primary: "#00ff99",
//           glow:
//             "rgba(0,255,150,0.4)",
//         }

//       : latestBurnout < 60
//         ? {
//             primary: "#facc15",
//             glow:
//               "rgba(250,204,21,0.4)",
//           }

//         : {
//             primary: "#ef4444",
//             glow:
//               "rgba(239,68,68,0.5)",
//           };


//   // =========================================================
//   // AI PERSONALITY
//   // =========================================================

//   const aiPersonality =
//     latestBurnout < 30
//       ? "chill"
//       : latestBurnout < 60
//         ? "supportive"
//         : "strict";


//   // =========================================================
//   // WEEKLY ACTIVITY
//   // =========================================================

//   const weeklyActivity =
//     decoded.weekly_commit_activity || {};


//   const weeklyEntries =
//     Object.entries(
//       weeklyActivity
//     ).sort(
//       ([a], [b]) =>
//         a.localeCompare(b)
//     );


//   const rawCommits =
//     weeklyEntries.map(
//       ([, value]) =>
//         Number(value) || 0
//     );


//   // =========================================================
//   // SAFE LINEAR REGRESSION
//   // =========================================================

//   let predictedLinearCommits =
//     predictedCommits;


//   if (rawCommits.length >= 2) {

//     const n =
//       rawCommits.length;


//     const x =
//       rawCommits.map(
//         (_, index) =>
//           index + 1
//       );


//     const y =
//       rawCommits;


//     const sumX =
//       x.reduce(
//         (a, b) => a + b,
//         0
//       );


//     const sumY =
//       y.reduce(
//         (a, b) => a + b,
//         0
//       );


//     const sumXY =
//       x.reduce(
//         (sum, xi, index) =>
//           sum +
//           xi * y[index],
//         0
//       );


//     const sumXX =
//       x.reduce(
//         (sum, xi) =>
//           sum + xi * xi,
//         0
//       );


//     const denominator =
//       n * sumXX -
//       sumX * sumX;


//     if (denominator !== 0) {

//       const m =
//         (n * sumXY -
//           sumX * sumY) /
//         denominator;


//       const b =
//         (sumY -
//           m * sumX) /
//         n;


//       const prediction =
//         m * (n + 1) + b;


//       if (
//         Number.isFinite(
//           prediction
//         )
//       ) {

//         predictedLinearCommits =
//           Math.max(
//             0,
//             Number(
//               prediction.toFixed(2)
//             )
//           );
//       }
//     }
//   }


//   // =========================================================
//   // COMMIT CHART DATA
//   // =========================================================

//   const commitData =
//     rawCommits.map(
//       (value, index) => ({
//         week:
//           weeklyEntries[index]?.[0] ||
//           `W${index + 1}`,

//         commits: value,
//       })
//     );


//   if (rawCommits.length > 0) {

//     commitData.push({

//       week: "Next",

//       predicted:
//         predictedLinearCommits,

//     });
//   }


//   // =========================================================
//   // HEATMAP
//   // =========================================================

//   const heatmap =
//     Array.isArray(
//       decoded.heatmap
//     )
//       ? decoded.heatmap
//       : [];


//   const safeHeatmap =
//     heatmap.filter(
//       item =>
//         item &&
//         typeof item.date ===
//           "string"
//     );


//   const maxCount =
//     safeHeatmap.length > 0
//       ? Math.max(
//           ...safeHeatmap.map(
//             item =>
//               Number(
//                 item.count
//               ) || 0
//           )
//         )
//       : 0;


//   const heatmapData =
//     safeHeatmap.map(
//       item => {

//         const count =
//           Number(
//             item.count
//           ) || 0;


//         return {
//           date: item.date,

//           count:
//             maxCount === 0
//               ? 0
//               : Math.round(
//                   (count /
//                     maxCount) *
//                     10
//                 ),
//         };
//       }
//     );


//   // =========================================================
//   // HEATMAP DATE RANGE
//   // =========================================================

//   const today =
//     new Date();


//   const oneYearAgo =
//     new Date();


//   oneYearAgo.setFullYear(
//     today.getFullYear() - 1
//   );


//   // =========================================================
//   // RISK
//   // =========================================================

//   const riskLevel =
//     latestBurnout < 30
//       ? "SAFE"
//       : latestBurnout < 60
//         ? "WARNING"
//         : "DANGER";


//   const getProtectionMessage =
//     () => {

//       if (
//         riskLevel === "SAFE"
//       ) {

//         return (
//           "🟢 You are in a healthy zone. Maintain your rhythm."
//         );
//       }


//       if (
//         riskLevel === "WARNING"
//       ) {

//         return (
//           "🟡 Early signs of burnout detected. Adjust workload."
//         );
//       }


//       return (
//         "🔴 High burnout risk. Immediate intervention required."
//       );
//     };


//   // =========================================================
//   // ALERTS
//   // =========================================================

//   const alerts =
//     useMemo(() => {

//       const result = [];


//       if (
//         Number(
//           featureBreakdown
//             .late_night_intensity ||
//           0
//         ) > 30
//       ) {

//         result.push(
//           "🌙 Late-night work detected"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .weekend_ratio ||
//           0
//         ) > 20
//       ) {

//         result.push(
//           "📅 Weekend work is higher than ideal"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .volatility_index ||
//           0
//         ) > 35
//       ) {

//         result.push(
//           "📊 Work pattern is unstable"
//         );
//       }


//       if (
//         latestBurnout > 50
//       ) {

//         result.push(
//           "🔥 Burnout risk rising"
//         );
//       }


//       return result;

//     }, [
//       featureBreakdown,
//       latestBurnout,
//     ]);


//   // =========================================================
//   // WEEKLY GOAL
//   // =========================================================

//   const getWeeklyGoal =
//     () => {

//       if (
//         latestBurnout < 30
//       ) {

//         return (
//           "Maintain your current rhythm ✅"
//         );
//       }


//       if (
//         latestBurnout < 60
//       ) {

//         return (
//           "Reduce 1–2 work sessions this week ⚖️"
//         );
//       }


//       return (
//         "Take 2 days off + reduce workload 🔴"
//       );
//     };


//   // =========================================================
//   // REASON TAG
//   // =========================================================

//   const getReasonTag =
//     () => {

//       if (
//         Number(
//           featureBreakdown
//             .late_night_intensity ||
//           0
//         ) > 40
//       ) {

//         return (
//           "High late-night activity detected"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .weekend_ratio ||
//           0
//         ) > 30
//       ) {

//         return (
//           "Excessive weekend workload"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .volatility_index ||
//           0
//         ) > 40
//       ) {

//         return (
//           "Unstable work pattern"
//         );
//       }


//       return (
//         "Stable performance pattern"
//       );
//     };


//   // =========================================================
//   // FOCUS SCORE
//   // =========================================================

//   const focusScore =
//     (
//       100 -
//       Number(
//         featureBreakdown
//           .volatility_index ||
//         0
//       ) -
//       Number(
//         featureBreakdown
//           .late_night_intensity ||
//         0
//       ) / 2
//     )
//       .toFixed(1);


//   // =========================================================
//   // AI INTERVENTIONS
//   // =========================================================

//   const interventions =
//     useMemo(() => {

//       const actions = [];


//       if (
//         Number(
//           featureBreakdown
//             .late_night_intensity ||
//           0
//         ) > 30
//       ) {

//         actions.push(
//           "🌙 Avoid coding after 11 PM for the next 3 days"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .weekend_ratio ||
//           0
//         ) > 20
//       ) {

//         actions.push(
//           "📅 Take at least 1 full day off this weekend"
//         );
//       }


//       if (
//         Number(
//           featureBreakdown
//             .volatility_index ||
//           0
//         ) > 40
//       ) {

//         actions.push(
//           "📊 Stabilize your work schedule and avoid large bursts"
//         );
//       }


//       if (
//         latestBurnout > 60
//       ) {

//         actions.push(
//           "🛑 Reduce workload by approximately 30%"
//         );
//       }


//       if (
//         actions.length === 0
//       ) {

//         actions.push(
//           "✅ Keep following your current routine"
//         );
//       }


//       return actions;

//     }, [
//       featureBreakdown,
//       latestBurnout,
//     ]);


//   // =========================================================
//   // BURNOUT IMPACT SIMULATION
//   // =========================================================

//   const calculateBurnoutImpact =
//     (
//       mode,
//       base,
//       features
//     ) => {

//       let score =
//         Number(base) || 0;


//       const late =
//         Number(
//           features
//             ?.late_night_intensity ||
//           0
//         );


//       const weekend =
//         Number(
//           features
//             ?.weekend_ratio ||
//           0
//         );


//       const volatility =
//         Number(
//           features
//             ?.volatility_index ||
//           0
//         );


//       if (
//         mode === "rest"
//       ) {

//         score -=
//           0.4 * late;

//         score -=
//           0.3 * weekend;

//         score -=
//           0.2 * volatility;
//       }


//       if (
//         mode === "balanced"
//       ) {

//         score -=
//           0.2 * late;

//         score -=
//           0.15 * weekend;

//         score -=
//           0.1 * volatility;
//       }


//       if (
//         mode === "push"
//       ) {

//         score +=
//           0.5 * late;

//         score +=
//           0.4 * weekend;

//         score +=
//           0.3 * volatility;
//       }


//       return Math.max(
//         0,
//         Math.min(
//           100,
//           score
//         )
//       );
//     };


//   // =========================================================
//   // FALLBACK FORECAST
//   //
//   // Used if /predict-burnout is unavailable.
//   // =========================================================

//   const createFallbackForecast =
//     useCallback(() => {

//       let last =
//         latestBurnout;


//       const result = [];


//       const late =
//         Number(
//           featureBreakdown
//             .late_night_intensity ||
//           0
//         );


//       const weekend =
//         Number(
//           featureBreakdown
//             .weekend_ratio ||
//           0
//         );


//       const volatility =
//         Number(
//           featureBreakdown
//             .volatility_index ||
//           0
//         );


//       const pressure =
//         late * 0.025 +
//         weekend * 0.02 +
//         volatility * 0.03;


//       for (
//         let i = 1;
//         i <= 4;
//         i++
//       ) {

//         const direction =
//           i *
//           (
//             latestBurnout > 60
//               ? 1.2
//               : latestBurnout > 40
//                 ? 0.5
//                 : -0.15
//           );


//         const next =
//           Math.max(
//             0,
//             Math.min(
//               100,
//               last +
//                 direction +
//                 pressure
//             )
//           );


//         result.push({

//           week:
//             `+${i}`,

//           burnout:
//             Number(
//               next.toFixed(1)
//             ),
//         });


//         last = next;
//       }


//       return result;

//     }, [
//       latestBurnout,
//       featureBreakdown,
//     ]);


//   // =========================================================
//   // LOAD BURNOUT FORECAST
//   // =========================================================

//   useEffect(() => {

//     let cancelled =
//       false;


//     const loadForecast =
//       async () => {

//         try {

//           const response =
//             await fetch(
//               `${API_URL}/predict-burnout`,
//               {
//                 method: "POST",
//                 credentials: "include",

//                 headers: {
//                   "Content-Type":
//                     "application/json",
//                 },

//                 body:
//                   JSON.stringify({
//                     burnout_history:
//                       burnoutScores,

//                     features:
//                       featureBreakdown,
//                   }),
//               }
//             );


//           if (
//             !response.ok
//           ) {

//             throw new Error(
//               "Prediction endpoint unavailable"
//             );
//           }


//           const data =
//             await response.json();


//           const prediction =
//             Array.isArray(
//               data?.prediction
//             )
//               ? data.prediction
//               : [];


//           const formatted =
//             prediction
//               .slice(0, 4)
//               .map(
//                 (value, index) => ({
//                   week:
//                     `+${index + 1}`,

//                   burnout:
//                     Number(value) || 0,
//                 })
//               );


//           if (
//             formatted.length === 0
//           ) {

//             throw new Error(
//               "Empty prediction"
//             );
//           }


//           if (
//             !cancelled
//           ) {

//             setFutureBurnoutTrend(
//               formatted
//             );


//             const flat =
//               formatted.every(
//                 (point, index, arr) =>
//                   index === 0 ||
//                   Math.abs(
//                     point.burnout -
//                     arr[0].burnout
//                   ) < 0.3
//               );


//             setIsFlatPrediction(
//               flat
//             );
//           }

//         } catch (err) {

//           console.warn(
//             "Prediction API failed. Using local fallback:",
//             err
//           );


//           if (
//             !cancelled
//           ) {

//             const fallback =
//               createFallbackForecast();


//             setFutureBurnoutTrend(
//               fallback
//             );


//             setIsFlatPrediction(
//               fallback.every(
//                 (point, index, arr) =>
//                   index === 0 ||
//                   Math.abs(
//                     point.burnout -
//                     arr[0].burnout
//                   ) < 0.3
//               )
//             );
//           }
//         }
//       };


//     loadForecast();


//     return () => {
//       cancelled = true;
//     };

//   }, [
//     burnoutScores.join(","),
//     JSON.stringify(
//       featureBreakdown
//     ),
//     createFallbackForecast,
//   ]);


//   // =========================================================
//   // AUTO INTERVENTION
//   // =========================================================

//   useEffect(() => {

//     if (
//       !futureBurnoutTrend.length
//     ) {

//       setAutoAction(null);

//       return;
//     }


//     const average =
//       futureBurnoutTrend.reduce(
//         (
//           sum,
//           point
//         ) =>
//           sum +
//           Number(
//             point.burnout
//           ),

//         0
//       ) /
//       futureBurnoutTrend.length;


//     if (
//       average > 65
//     ) {

//       setAutoAction(
//         "FORCE_REST"
//       );

//     } else if (
//       average > 45
//     ) {

//       setAutoAction(
//         "SUGGEST_BALANCE"
//       );

//     } else {

//       setAutoAction(
//         "SAFE_MODE"
//       );
//     }

//   }, [
//     futureBurnoutTrend,
//   ]);


//   // =========================================================
//   // SIMULATE FUTURE
//   // =========================================================

//   const simulateFuture =
//     useCallback(
//       (mode) => {

//         if (
//           !futureBurnoutTrend.length
//         ) {

//           return [];
//         }


//         let last =
//           latestBurnout;


//         return futureBurnoutTrend.map(
//           (point) => {

//             const next =
//               calculateBurnoutImpact(
//                 mode,
//                 last,
//                 featureBreakdown
//               );


//             last =
//               next;


//             return {

//               week:
//                 point.week,

//               burnout:
//                 Number(
//                   next.toFixed(1)
//                 ),
//             };
//           }
//         );

//       },
//       [
//         futureBurnoutTrend,
//         latestBurnout,
//         featureBreakdown,
//       ]
//     );


//   // =========================================================
//   // AUTO SIMULATION
//   // =========================================================

//   useEffect(() => {

//     if (
//       autoAction ===
//       "FORCE_REST"
//     ) {

//       setSimulatedData(
//         simulateFuture(
//           "rest"
//         )
//       );

//       setSelectedMode(
//         "rest"
//       );

//     } else if (
//       autoAction ===
//       "SUGGEST_BALANCE"
//     ) {

//       setSimulatedData(
//         simulateFuture(
//           "balanced"
//         )
//       );

//       setSelectedMode(
//         "balanced"
//       );

//     } else if (
//       autoAction ===
//       "SAFE_MODE"
//     ) {

//       setSimulatedData(null);

//       setSelectedMode(null);
//     }

//   }, [
//     autoAction,
//     simulateFuture,
//   ]);


//   // =========================================================
//   // AI DECISION ENGINE
//   // =========================================================

//   useEffect(() => {

//     if (
//       !futureBurnoutTrend.length ||
//       hasRecommended
//     ) {

//       return;
//     }


//     const rest =
//       simulateFuture(
//         "rest"
//       );


//     const balanced =
//       simulateFuture(
//         "balanced"
//       );


//     const push =
//       simulateFuture(
//         "push"
//       );


//     const average =
//       (array) => {

//         if (
//           !array.length
//         ) {

//           return latestBurnout;
//         }


//         return (
//           array.reduce(
//             (
//               sum,
//               item
//             ) =>
//               sum +
//               item.burnout,

//             0
//           ) /
//           array.length
//         );
//       };


//     const riskPenalty =
//       (mode) => {

//         if (
//           mode === "push" &&
//           latestBurnout > 60
//         ) {

//           return 15;
//         }


//         if (
//           mode === "balanced" &&
//           latestBurnout > 70
//         ) {

//           return 5;
//         }


//         return 0;
//       };


//     const scores = {

//       rest:
//         average(rest) +
//         riskPenalty("rest"),

//       balanced:
//         average(balanced) +
//         riskPenalty("balanced"),

//       push:
//         average(push) +
//         riskPenalty("push"),
//     };


//     setDecisionScores(
//       scores
//     );


//     const best =
//       Object.keys(
//         scores
//       ).reduce(
//         (a, b) =>
//           scores[a] <
//           scores[b]
//             ? a
//             : b
//       );


//     setBestMode(
//       best
//     );


//     const values =
//       Object.values(
//         scores
//       );


//     const spread =
//       Math.max(
//         ...values
//       ) -
//       Math.min(
//         ...values
//       );


//     setConfidence(
//       Math.min(
//         100,
//         Math.round(
//           spread * 10
//         )
//       )
//     );


//     setHasRecommended(
//       true
//     );


//     // -------------------------------------------------------
//     // AI EXPLANATION
//     // -------------------------------------------------------

//     fetch(
//       `${API_URL}/ai-chat`,
//       {
//         method: "POST",
//         credentials: "include",

//         headers: {
//           "Content-Type":
//             "application/json",
//         },

//         body:
//           JSON.stringify({
//             message:
//               `Explain why ${best} is best and others are worse. Keep it to 2 short lines.`,
//           }),
//       }
//     )
//       .then(
//         response =>
//           response.ok
//             ? response.json()
//             : null
//       )
//       .then(
//         data => {

//           if (
//             data?.reply
//           ) {

//             setRecommendationText(
//               data.reply
//             );
//           }
//         }
//       )
//       .catch(
//         err =>
//           console.warn(
//             "AI recommendation unavailable:",
//             err
//           )
//       );

//   }, [
//     futureBurnoutTrend,
//     hasRecommended,
//     simulateFuture,
//     latestBurnout,
//   ]);


//   // =========================================================
//   // SELECTED SIMULATION AI EXPLANATION
//   // =========================================================

//   useEffect(() => {

//     if (
//       !selectedMode ||
//       !futureBurnoutTrend.length
//     ) {

//       return;
//     }


//     fetch(
//       `${API_URL}/ai-chat`,
//       {
//         method: "POST",
//         credentials: "include",

//         headers: {
//           "Content-Type":
//             "application/json",
//         },

//         body:
//           JSON.stringify({

//             message: `
// User selected ${selectedMode} mode.

// Explain:
// - Why burnout will change in this scenario
// - What behavior causes it
// - Keep it short and human-like
// - Maximum 2 lines

// Data:
// Current burnout: ${latestBurnout}
// Late night: ${
//               featureBreakdown
//                 .late_night_intensity ||
//               0
//             }
// Weekend work: ${
//               featureBreakdown
//                 .weekend_ratio ||
//               0
//             }
// Volatility: ${
//               featureBreakdown
//                 .volatility_index ||
//               0
//             }
//             `,
//           }),
//       }
//     )
//       .then(
//         response =>
//           response.ok
//             ? response.json()
//             : null
//       )
//       .then(
//         data => {

//           if (
//             data?.reply
//           ) {

//             setAiExplain(
//               data.reply
//             );
//           }
//         }
//       )
//       .catch(
//         err =>
//           console.warn(
//             "AI simulation explanation unavailable:",
//             err
//           )
//       );

//   }, [
//     selectedMode,
//     futureBurnoutTrend.length,
//     latestBurnout,
//     featureBreakdown,
//   ]);


//   // =========================================================
//   // FLAT PREDICTION EXPLANATION
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isFlatPrediction
//     ) {

//       return;
//     }


//     fetch(
//       `${API_URL}/ai-chat`,
//       {
//         method: "POST",
//         credentials: "include",

//         headers: {
//           "Content-Type":
//             "application/json",
//         },

//         body:
//           JSON.stringify({

//             message: `
// Explain the pattern in my burnout prediction trend.

// If the trend is flat:
// explain that behavior and inputs are stable.

// If increasing:
// explain workload pressure.

// If decreasing:
// explain recovery.

// Be short, natural and human-like.
// Maximum 2 lines.
//             `,

//             burnout_score:
//               decoded.burnout_score,

//             burnout_status:
//               decoded.burnout_status,

//             features:
//               decoded.feature_breakdown,
//           }),
//       }
//     )
//       .then(
//         response =>
//           response.ok
//             ? response.json()
//             : null
//       )
//       .then(
//         data => {

//           if (
//             data?.reply
//           ) {

//             setAiExplain(
//               data.reply
//             );
//           }
//         }
//       )
//       .catch(
//         err =>
//           console.warn(
//             "AI trend explanation unavailable:",
//             err
//           )
//       );

//   }, [
//     isFlatPrediction,
//     decoded.burnout_score,
//     decoded.burnout_status,
//     decoded.feature_breakdown,
//   ]);


//   // =========================================================
//   // AI COACH TYPING EFFECT
//   // =========================================================

//   useEffect(() => {

//     const text =
//       decoded.ai_coach ||
//       "Analyzing your development behavior...";


//     let index = 0;


//     setTypedText("");


//     const interval =
//       setInterval(
//         () => {

//           index += 1;


//           setTypedText(
//             text.slice(
//               0,
//               index
//             )
//           );


//           if (
//             index >=
//             text.length
//           ) {

//             clearInterval(
//               interval
//             );
//           }

//         },
//         20
//       );


//     return () =>
//       clearInterval(
//         interval
//       );

//   }, [
//     decoded.ai_coach,
//   ]);


//   // =========================================================
//   // REFLECTIONS
//   // =========================================================

//   const loadReflections =
//     useCallback(
//       async () => {

//         try {

//           const response =
//             await fetch(
//               `${API_URL}/reflections`,
//               { credentials: "include" }
//             );


//           if (
//             !response.ok
//           ) {

//             return;
//           }


//           const data =
//             await response.json();


//           setReflections(
//             Array.isArray(
//               data?.reflections
//             )
//               ? data.reflections
//               : []
//           );

//         } catch (err) {

//           console.warn(
//             "Reflection loading unavailable:",
//             err
//           );
//         }

//       },
//       []
//     );


//   useEffect(() => {

//     loadReflections();

//   }, [
//     loadReflections,
//   ]);


//   // =========================================================
//   // DAILY TIP
//   // =========================================================

//   useEffect(() => {

//     const timer =
//       setTimeout(
//         () =>
//           setShowTip(true),
//         800
//       );


//     return () =>
//       clearTimeout(
//         timer
//       );

//   }, []);


//   // =========================================================
//   // EXPLAIN BURNOUT
//   // =========================================================

//   const explainBurnout =
//     async () => {

//       try {

//         const response =
//           await fetch(
//             `${API_URL}/ai-chat`,
//             {
//               method: "POST",
//               credentials: "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },

//               body:
//                 JSON.stringify({

//                   message:
//                     "Explain why my burnout score is like this. Give a concise human explanation.",

//                   burnout_score:
//                     decoded.burnout_score,

//                   burnout_status:
//                     decoded.burnout_status,

//                   features:
//                     decoded.feature_breakdown,
//                 }),
//             }
//           );


//         if (
//           !response.ok
//         ) {

//           throw new Error(
//             "AI explanation failed"
//           );
//         }


//         const data =
//           await response.json();


//         setAiExplain(
//           data?.reply ||
//           "Your burnout score is based on your recent development activity patterns."
//         );


//         setShowModal(
//           true
//         );

//       } catch (err) {

//         console.error(
//           "AI explanation error:",
//           err
//         );


//         setAiExplain(
//           "Your burnout score reflects your recent workload, work timing, weekend activity and workload stability."
//         );


//         setShowModal(
//           true
//         );
//       }
//     };


//   // =========================================================
//   // RISK TIMELINE
//   // =========================================================

//   const riskTimeline =
//     useMemo(() => {

//       if (
//         !futureBurnoutTrend.length
//       ) {

//         return null;
//       }


//       for (
//         let i = 0;
//         i <
//         futureBurnoutTrend.length;
//         i++
//       ) {

//         if (
//           Number(
//             futureBurnoutTrend[i]
//               .burnout
//           ) >= 60
//         ) {

//           return {

//             week:
//               futureBurnoutTrend[i]
//                 .week,

//             index:
//               i + 1,

//             level:
//               "HIGH",
//           };
//         }
//       }


//       return null;

//     }, [
//       futureBurnoutTrend,
//     ]);


//   // =========================================================
//   // VIEW: DIGITAL TWIN / SIMULATION
//   // =========================================================

//   if (
//     view === "simulation"
//   ) {

//     return (
//       <div
//         style={{
//           display: "flex",
//           minHeight: "100vh",
//           color: "white",
//         }}
//       >

//         <Sidebar
//           setView={setView}
//         />


//         <div
//           style={{
//             flex: 1,
//             padding: "40px",
//             marginLeft: "220px",
//           }}
//         >

//           <DigitalTwin
//             latestBurnout={
//               latestBurnout
//             }
//             features={
//               featureBreakdown
//             }
//           />

//         </div>

//       </div>
//     );
//   }


//   // =========================================================
//   // MAIN DASHBOARD
//   // =========================================================

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           background:
//             "transparent",
//           color: "white",
//           minHeight:
//             "100vh",
//         }}
//       >

//         {/* ===================================================
//             SIDEBAR
//         =================================================== */}

//         <Sidebar
//           setView={setView}
//         />


//         {/* ===================================================
//             MAIN CONTENT
//         =================================================== */}

//         <div
//           style={{
//             flex: 1,
//             background:
//               "transparent",
//             padding: "40px",
//             boxSizing:
//               "border-box",
//             marginLeft:
//               "220px",
//           }}
//         >

//           <h1
//             style={{
//               marginBottom:
//                 "20px",
//             }}
//           >
//             Welcome,{" "}
//             {decoded.username}
//           </h1>


//           {/* =================================================
//               TIMELINE VIEW
//           ================================================= */}

//           {view ===
//           "timeline" ? (

//             <BurnoutTimeline
//               data={
//                 futureBurnoutTrend
//               }
//             />

//           ) : view ===
//             "reflection" ? (

//             <ReflectionPanel
//               onSave={
//                 loadReflections
//               }
//             />

//           ) : (

//             <>

//               {/* =============================================
//                   AI COACH
//               ============================================= */}

//               <AICoach
//                 typedText={
//                   typedText
//                 }
//               />


//               {/* =============================================
//                   LIVE RADAR
//               ============================================= */}

//               <LiveRadar
//                 burnout={
//                   latestBurnout
//                 }
//                 features={
//                   featureBreakdown
//                 }
//               />


//               {/* =============================================
//                   MAIN CARDS
//               ============================================= */}

//               <div
//                 className="grid"
//               >

//                 <Card
//                   title="Burnout Score"
//                   value={
//                     latestBurnout
//                   }
//                   color={
//                     scoreColor
//                   }
//                   icon="🔥"
//                 />


//                 <Card
//                   title="Health Index"
//                   value={
//                     healthIndex
//                   }
//                   color="#00ff99"
//                   icon="💚"
//                 />


//                 <Card
//                   title="Next Week Commits"
//                   value={
//                     predictedCommits
//                   }
//                   color="#00bfff"
//                   icon="📈"
//                 />


//                 <Card
//                   title="Burnout Risk"
//                   value={`${predictedBurnout}%`}
//                   color="#facc15"
//                   icon="⚠️"
//                 />


//                 <Card
//                   title="Pattern"
//                   value={
//                     pattern
//                   }
//                   color="#a78bfa"
//                   icon="🧠"
//                   small
//                 />

//               </div>


//               {/* =============================================
//                   WHY THIS SCORE
//               ============================================= */}

//               <div
//                 style={{
//                   display:
//                     "flex",
//                   justifyContent:
//                     "center",
//                   marginTop:
//                     "20px",
//                   marginBottom:
//                     "20px",
//                 }}
//               >

//                 <button
//                   onClick={
//                     explainBurnout
//                   }
//                   style={{
//                     padding:
//                       "14px 28px",
//                     borderRadius:
//                       "30px",
//                     border:
//                       "none",
//                     cursor:
//                       "pointer",
//                     fontWeight:
//                       "600",
//                     fontSize:
//                       "15px",
//                     color:
//                       "white",
//                     background:
//                       "linear-gradient(135deg,#3d4a5f,#1a2425)",
//                     boxShadow:
//                       "0 0 20px rgba(59,130,246,0.4)",
//                     transition:
//                       "0.3s",
//                   }}
//                   onMouseEnter={
//                     e => {
//                       e.currentTarget.style.transform =
//                         "scale(1.05)";
//                     }
//                   }
//                   onMouseLeave={
//                     e => {
//                       e.currentTarget.style.transform =
//                         "scale(1)";
//                     }
//                   }
//                 >
//                   ⚡ Why this score?
//                 </button>

//               </div>


//               {/* =============================================
//                   CONTRIBUTION HEATMAP
//               ============================================= */}

//               <div
//                 className="card"
//               >

//                 <h2>
//                   Contribution Heatmap
//                 </h2>


//                 {heatmapData.length >
//                 0 ? (

//                   <CalendarHeatmap

//                     startDate={
//                       oneYearAgo
//                     }

//                     endDate={
//                       today
//                     }

//                     values={
//                       heatmapData
//                     }

//                     gutterSize={
//                       4
//                     }

//                     showMonthLabels

//                     classForValue={
//                       value => {

//                         if (
//                           !value ||
//                           value.count ===
//                             0
//                         ) {

//                           return "color-empty";
//                         }


//                         if (
//                           value.count <
//                           3
//                         ) {

//                           return "color-scale-1";
//                         }


//                         if (
//                           value.count <
//                           6
//                         ) {

//                           return "color-scale-2";
//                         }


//                         if (
//                           value.count <
//                           10
//                         ) {

//                           return "color-scale-3";
//                         }


//                         return "color-scale-4";
//                       }
//                     }

//                   />

//                 ) : (

//                   <div
//                     style={{
//                       padding:
//                         "30px",
//                       textAlign:
//                         "center",
//                       color:
//                         "#94a3b8",
//                     }}
//                   >
//                     No contribution data available yet.
//                   </div>

//                 )}

//               </div>


//               {/* =============================================
//                   AI PROTECTION SYSTEM
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",

//                   boxShadow:
//                     `0 10px 30px ${theme.glow}`,

//                   borderLeft:
//                     riskLevel ===
//                     "DANGER"
//                       ? "4px solid #ef4444"
//                       : riskLevel ===
//                         "WARNING"
//                         ? "4px solid #facc15"
//                         : "4px solid #00ff99",
//                 }}
//               >

//                 <h2>
//                   🛡️ AI Protection System
//                 </h2>


//                 <h3
//                   style={{
//                     color:
//                       riskLevel ===
//                       "DANGER"
//                         ? "#ef4444"
//                         : riskLevel ===
//                           "WARNING"
//                           ? "#facc15"
//                           : "#00ff99",
//                   }}
//                 >
//                   {riskLevel}
//                 </h3>


//                 <p
//                   style={{
//                     color:
//                       "#cbd5e1",
//                     marginTop:
//                       "10px",
//                   }}
//                 >
//                   {getProtectionMessage()}
//                 </p>

//               </div>


//               {/* =============================================
//                   AI ACTIONS
//               ============================================= */}

//               <div
//                 className="card"
//                 style={{
//                   marginTop:
//                     "20px",
//                   marginBottom:
//                     "20px",
//                 }}
//               >

//                 <h2>
//                   🚨 AI Actions
//                 </h2>


//                 <div
//                   style={{
//                     marginTop:
//                       "10px",
//                     display:
//                       "flex",
//                     flexDirection:
//                       "column",
//                     gap:
//                       "10px",
//                   }}
//                 >

//                   {interventions.map(
//                     (
//                       action,
//                       index
//                     ) => (

//                       <div
//                         key={
//                           index
//                         }
//                         style={{
//                           background:
//                             "rgba(56,189,248,0.1)",
//                           border:
//                             "1px solid rgba(56,189,248,0.3)",
//                           padding:
//                             "12px",
//                           borderRadius:
//                             "10px",
//                           fontSize:
//                             "14px",
//                         }}
//                       >
//                         {action}
//                       </div>

//                     )
//                   )}

//                 </div>

//               </div>


//               {/* =============================================
//                   COMMITS TREND
//               ============================================= */}

//               <div
//                 className="card card-wide"
//               >

//                 <h2>
//                   Commits Trend
//                 </h2>


//                 {commitData.length >
//                 0 ? (

//                   <ResponsiveContainer
//                     width="100%"
//                     height={
//                       300
//                     }
//                   >

//                     <LineChart
//                       data={
//                         commitData
//                       }
//                     >

//                       <CartesianGrid
//                         stroke="#333"
//                       />

//                       <XAxis
//                         dataKey="week"
//                       />

//                       <YAxis />

//                       <Tooltip />


//                       <Line
//                         type="monotone"
//                         dataKey="commits"
//                         stroke="#00ff99"
//                         strokeWidth={
//                           2
//                         }
//                       />


//                       <Line
//                         type="monotone"
//                         dataKey="predicted"
//                         stroke="#00bfff"
//                         strokeWidth={
//                           3
//                         }
//                       />

//                     </LineChart>

//                   </ResponsiveContainer>

//                 ) : (

//                   <p
//                     style={{
//                       color:
//                         "#94a3b8",
//                     }}
//                   >
//                     No weekly commit data available.
//                   </p>

//                 )}

//               </div>


//               {/* =============================================
//                   AI RECOMMENDATION
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",

//                   borderLeft:
//                     "4px solid #00ff99",

//                   boxShadow:
//                     `0 10px 30px ${theme.glow}`,
//                 }}
//               >

//                 <h2>
//                   🧠 AI Recommendation
//                 </h2>


//                 {bestMode && (

//                   <h3
//                     style={{
//                       color:
//                         "#00ff99",
//                     }}
//                   >
//                     Recommended:{" "}

//                     {bestMode ===
//                       "rest"
//                       ? "🧘 Take Break"
//                       : bestMode ===
//                         "balanced"
//                         ? "⚖️ Stay Balanced"
//                         : "🚀 Push Hard"}

//                   </h3>

//                 )}


//                 <p
//                   style={{
//                     color:
//                       "#cbd5e1",
//                     marginTop:
//                       "10px",
//                   }}
//                 >
//                   {recommendationText ||
//                     decoded
//                       .burnout_recommendation
//                       ?.join(" ") ||
//                     "Analyzing your workload pattern..."}
//                 </p>


//                 <p
//                   style={{
//                     marginTop:
//                       "8px",
//                     fontSize:
//                       "13px",
//                     color:
//                       "#94a3b8",
//                     background:
//                       "rgba(148,163,184,0.08)",
//                     padding:
//                       "6px 10px",
//                     borderRadius:
//                       "8px",
//                     display:
//                       "inline-block",
//                   }}
//                 >
//                   💡{" "}
//                   {getReasonTag()}
//                 </p>

//               </div>


//               {/* =============================================
//                   DECISION COMPARISON
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",
//                 }}
//               >

//                 <h2>
//                   ⚖️ Decision Comparison
//                 </h2>


//                 {decisionScores &&

//                   Object.entries(
//                     decisionScores
//                   ).map(
//                     (
//                       [
//                         mode,
//                         score,
//                       ]
//                     ) => {

//                       const isBest =
//                         mode ===
//                         bestMode;


//                       return (

//                         <div
//                           key={
//                             mode
//                           }
//                           style={{
//                             marginTop:
//                               "12px",
//                             padding:
//                               "14px",
//                             borderRadius:
//                               "12px",
//                             background:
//                               isBest
//                                 ? "rgba(0,255,150,0.1)"
//                                 : "rgba(255,255,255,0.05)",
//                             border:
//                               isBest
//                                 ? "1px solid rgba(0,255,150,0.5)"
//                                 : "1px solid rgba(255,255,255,0.1)",
//                             display:
//                               "flex",
//                             justifyContent:
//                               "space-between",
//                             alignItems:
//                               "center",
//                           }}
//                         >

//                           <div>

//                             <strong>

//                               {mode ===
//                                 "rest" &&
//                                 "🧘 Take Break"}

//                               {mode ===
//                                 "balanced" &&
//                                 "⚖️ Stay Balanced"}

//                               {mode ===
//                                 "push" &&
//                                 "🚀 Push Hard"}

//                             </strong>


//                             {isBest && (

//                               <span
//                                 style={{
//                                   marginLeft:
//                                     "10px",
//                                   color:
//                                     "#00ff99",
//                                 }}
//                               >
//                                 ⭐ BEST
//                               </span>

//                             )}

//                           </div>


//                           <div
//                             style={{
//                               color:
//                                 isBest
//                                   ? "#00ff99"
//                                   : "#cbd5e1",
//                               fontWeight:
//                                 "600",
//                             }}
//                           >
//                             {Number(
//                               score
//                             ).toFixed(
//                               1
//                             )}
//                             %
//                           </div>

//                         </div>
//                       );
//                     }
//                   )
//                 }


//                 <div
//                   style={{
//                     marginTop:
//                       "15px",
//                     background:
//                       "rgba(255,255,255,0.1)",
//                     borderRadius:
//                       "10px",
//                     overflow:
//                       "hidden",
//                     height:
//                       "8px",
//                   }}
//                 >

//                   <div
//                     style={{
//                       width:
//                         `${confidence ?? 0}%`,
//                       background:
//                         (confidence ??
//                           0) >
//                         60
//                           ? "#00ff99"
//                           : "#facc15",
//                       height:
//                         "100%",
//                       transition:
//                         "0.4s",
//                     }}
//                   />

//                 </div>

//               </div>


//               {/* =============================================
//                   AUTO INTERVENTION
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",

//                   borderLeft:
//                     autoAction ===
//                     "FORCE_REST"
//                       ? "4px solid #ef4444"
//                       : autoAction ===
//                         "SUGGEST_BALANCE"
//                         ? "4px solid #facc15"
//                         : "4px solid #00ff99",
//                 }}
//               >

//                 <h2>
//                   🤖 AI Auto Intervention
//                 </h2>


//                 {autoAction ===
//                   "FORCE_REST" && (

//                   <p
//                     style={{
//                       color:
//                         "#ef4444",
//                     }}
//                   >
//                     🔴 AI detected high burnout risk → Forced recovery mode activated
//                   </p>

//                 )}


//                 {autoAction ===
//                   "SUGGEST_BALANCE" && (

//                   <p
//                     style={{
//                       color:
//                         "#facc15",
//                     }}
//                   >
//                     🟡 AI suggests balancing workload to prevent escalation
//                   </p>

//                 )}


//                 {autoAction ===
//                   "SAFE_MODE" && (

//                   <p
//                     style={{
//                       color:
//                         "#00ff99",
//                     }}
//                   >
//                     🟢 You are stable → No intervention needed
//                   </p>

//                 )}

//               </div>


//               {/* =============================================
//                   SIMULATION BUTTONS
//               ============================================= */}

//               <div
//                 style={{
//                   display:
//                     "flex",
//                   gap:
//                     "15px",
//                   marginTop:
//                     "20px",
//                   marginBottom:
//                     "15px",
//                   justifyContent:
//                     "center",
//                   flexWrap:
//                     "wrap",
//                 }}
//               >

//                 <button
//                   onClick={() => {

//                     setSimulatedData(
//                       simulateFuture(
//                         "rest"
//                       )
//                     );

//                     setSelectedMode(
//                       "rest"
//                     );

//                   }}
//                   style={{
//                     padding:
//                       "12px 20px",
//                     borderRadius:
//                       "10px",
//                     border:
//                       "none",
//                     cursor:
//                       "pointer",
//                     background:
//                       "#1e293b",
//                     color:
//                       "white",
//                   }}
//                 >
//                   🧘 Take Break
//                 </button>


//                 <button
//                   onClick={() => {

//                     setSimulatedData(
//                       simulateFuture(
//                         "balanced"
//                       )
//                     );

//                     setSelectedMode(
//                       "balanced"
//                     );

//                   }}
//                   style={{
//                     padding:
//                       "12px 20px",
//                     borderRadius:
//                       "10px",
//                     border:
//                       "none",
//                     cursor:
//                       "pointer",
//                     background:
//                       "#1e293b",
//                     color:
//                       "white",
//                   }}
//                 >
//                   ⚖️ Stay Balanced
//                 </button>


//                 <button
//                   onClick={() => {

//                     setSimulatedData(
//                       simulateFuture(
//                         "push"
//                       )
//                     );

//                     setSelectedMode(
//                       "push"
//                     );

//                   }}
//                   style={{
//                     padding:
//                       "12px 20px",
//                     borderRadius:
//                       "10px",
//                     border:
//                       "none",
//                     cursor:
//                       "pointer",
//                     background:
//                       "#1e293b",
//                     color:
//                       "white",
//                   }}
//                 >
//                   🚀 Push Hard
//                 </button>

//               </div>


//               {/* =============================================
//                   BURNOUT FORECAST
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",
//                   position:
//                     "relative",
//                 }}
//               >

//                 <h2>
//                   🔮 Burnout Forecast (4 Weeks)
//                 </h2>


//                 {aiExplain && (

//                   <div
//                     style={{
//                       background:
//                         "rgba(30,41,59,0.9)",
//                       border:
//                         "1px solid rgba(255,255,255,0.1)",
//                       padding:
//                         "12px 16px",
//                       borderRadius:
//                         "12px",
//                       marginBottom:
//                         "15px",
//                       color:
//                         "#e2e8f0",
//                       lineHeight:
//                         "1.5",
//                     }}
//                   >
//                     🤖{" "}
//                     <strong>
//                       AI Insight
//                     </strong>

//                     <br />

//                     {aiExplain}
//                   </div>

//                 )}


//                 {(
//                   simulatedData ||
//                   futureBurnoutTrend
//                 ).length >
//                 0 ? (

//                   <ResponsiveContainer
//                     width="100%"
//                     height={
//                       300
//                     }
//                   >

//                     <LineChart
//                       data={
//                         simulatedData ||
//                         futureBurnoutTrend
//                       }
//                     >

//                       <CartesianGrid
//                         stroke="#333"
//                         strokeDasharray="3 3"
//                       />

//                       <XAxis
//                         dataKey="week"
//                       />

//                       <YAxis
//                         domain={[
//                           0,
//                           100,
//                         ]}
//                       />

//                       <Tooltip />


//                       <Line
//                         type="monotone"
//                         dataKey="burnout"
//                         stroke="#f97316"
//                         strokeWidth={
//                           3
//                         }
//                         dot={{
//                           r: 5,
//                         }}
//                         activeDot={{
//                           r: 7,
//                         }}
//                       />

//                     </LineChart>

//                   </ResponsiveContainer>

//                 ) : (

//                   <p
//                     style={{
//                       color:
//                         "#94a3b8",
//                     }}
//                   >
//                     Forecast is being calculated...
//                   </p>

//                 )}

//               </div>


//               {/* =============================================
//                   RISK TIMELINE
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",
//                   marginBottom:
//                     "20px",

//                   borderLeft:
//                     riskTimeline
//                       ? "4px solid #ef4444"
//                       : "4px solid #00ff99",

//                   boxShadow:
//                     `0 10px 30px ${theme.glow}`,
//                 }}
//               >

//                 <h2>
//                   ⏳ Burnout Risk Timeline
//                 </h2>


//                 {riskTimeline ? (

//                   <>

//                     <h3
//                       style={{
//                         color:
//                           "#ef4444",
//                       }}
//                     >
//                       ⚠️ Risk in{" "}
//                       {
//                         riskTimeline.index
//                       }{" "}
//                       week(s)
//                     </h3>


//                     <p
//                       style={{
//                         color:
//                           "#cbd5e1",
//                       }}
//                     >
//                       You may reach high burnout by{" "}
//                       {
//                         riskTimeline.week
//                       }
//                     </p>


//                     <p
//                       style={{
//                         marginTop:
//                           "10px",
//                         fontSize:
//                           "13px",
//                         color:
//                           "#94a3b8",
//                       }}
//                     >
//                       AI suggests reducing workload before this point.
//                     </p>

//                   </>

//                 ) : (

//                   <p
//                     style={{
//                       color:
//                         "#00ff99",
//                     }}
//                   >
//                     No high burnout risk detected in the next 4 weeks.
//                   </p>

//                 )}

//               </div>


//               {/* =============================================
//                   SMART ALERTS
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   borderLeft:
//                     "4px solid #facc15",
//                 }}
//               >

//                 <h2>
//                   🚨 Smart Alerts
//                 </h2>


//                 {alerts.length ===
//                 0 ? (

//                   <p
//                     style={{
//                       color:
//                         "#00ff99",
//                     }}
//                   >
//                     All good 👍
//                   </p>

//                 ) : (

//                   <div
//                     style={{
//                       display:
//                         "flex",
//                       flexDirection:
//                         "column",
//                       gap:
//                         "10px",
//                     }}
//                   >

//                     {alerts.map(
//                       (
//                         alert,
//                         index
//                       ) => (

//                         <div
//                           key={
//                             index
//                           }
//                           onClick={
//                             explainBurnout
//                           }
//                           style={{
//                             background:
//                               "rgba(250,204,21,0.1)",
//                             border:
//                               "1px solid rgba(250,204,21,0.3)",
//                             padding:
//                               "12px",
//                             borderRadius:
//                               "10px",
//                             cursor:
//                               "pointer",
//                           }}
//                         >
//                           ⚠️{" "}
//                           {alert}
//                         </div>

//                       )
//                     )}

//                   </div>
//                 )}


//                 {alerts.length >
//                   0 && (

//                   <button
//                     onClick={
//                       explainBurnout
//                     }
//                     style={{
//                       marginTop:
//                         "15px",
//                       padding:
//                         "10px 20px",
//                       borderRadius:
//                         "10px",
//                       border:
//                         "none",
//                       background:
//                         "linear-gradient(135deg,#00ff99,#00bfff)",
//                       color:
//                         "#022c22",
//                       fontWeight:
//                         "600",
//                       cursor:
//                         "pointer",
//                     }}
//                   >
//                     ⚡ Fix with AI
//                   </button>

//                 )}

//               </div>


//               {/* =============================================
//                   WEEKLY GOAL
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",
//                 }}
//               >

//                 <h2>
//                   🎯 Weekly Goal
//                 </h2>


//                 <h3
//                   style={{
//                     color:
//                       "#38bdf8",
//                     background:
//                       "rgba(56,189,248,0.1)",
//                     padding:
//                       "10px 15px",
//                     borderRadius:
//                       "10px",
//                     display:
//                       "inline-block",
//                   }}
//                 >
//                   {getWeeklyGoal()}
//                 </h3>

//               </div>


//               {/* =============================================
//                   REFLECTION PANEL
//               ============================================= */}

//               <ReflectionPanel
//                 onSave={
//                   loadReflections
//                 }
//               />


//               {/* =============================================
//                   REFLECTION HISTORY
//               ============================================= */}

//               {reflections.length >
//                 0 && (

//                 <div
//                   className="card card-wide"
//                   style={{
//                     marginTop:
//                       "20px",
//                   }}
//                 >

//                   <h2>
//                     🕒 Reflection Timeline
//                   </h2>


//                   {reflections.map(
//                     (
//                       item,
//                       index
//                     ) => (

//                       <div
//                         key={
//                           index
//                         }
//                         style={{
//                           marginTop:
//                             "12px",
//                           padding:
//                             "12px",
//                           borderRadius:
//                             "10px",
//                           background:
//                             "rgba(255,255,255,0.05)",
//                           border:
//                             "1px solid rgba(255,255,255,0.08)",
//                         }}
//                       >

//                         <p
//                           style={{
//                             color:
//                               "#e2e8f0",
//                           }}
//                         >
//                           {item.text}
//                         </p>


//                         {item.created_at && (

//                           <small
//                             style={{
//                               color:
//                                 "#94a3b8",
//                             }}
//                           >
//                             {new Date(
//                               item.created_at
//                             ).toLocaleString()}
//                           </small>

//                         )}

//                       </div>

//                     )
//                   )}

//                 </div>

//               )}


//               {/* =============================================
//                   YOU VS IDEAL DEVELOPER
//               ============================================= */}

//               <div
//                 className="card card-wide"
//                 style={{
//                   marginTop:
//                     "20px",
//                 }}
//               >

//                 <h2>
//                   🧑‍💻 You vs Ideal Developer
//                 </h2>


//                 <p>
//                   Late Night:{" "}
//                   {Number(
//                     featureBreakdown
//                       .late_night_intensity ||
//                     0
//                   ).toFixed(1)}
//                   %{" "}
//                   (Ideal: &lt;20%)
//                 </p>


//                 <p>
//                   Weekend Work:{" "}
//                   {Number(
//                     featureBreakdown
//                       .weekend_ratio ||
//                     0
//                   ).toFixed(1)}
//                   %{" "}
//                   (Ideal: &lt;15%)
//                 </p>


//                 <p>
//                   Stability:{" "}
//                   {Number(
//                     featureBreakdown
//                       .volatility_index ||
//                     0
//                   ).toFixed(1)}
//                   %{" "}
//                   (Ideal: &lt;30%)
//                 </p>


//                 <p>
//                   Focus Score:{" "}
//                   {focusScore}%
//                 </p>

//               </div>

//             </>
//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           AI CHAT
//       ===================================================== */}

//       {decoded && (

//         <AIChat
//           burnoutScore={
//             decoded.burnout_score
//           }
//           burnoutStatus={
//             decoded.burnout_status
//           }
//         />

//       )}


//       {/* =====================================================
//           AI EXPLANATION MODAL
//       ===================================================== */}

//       {showModal && (

//         <div
//           style={{
//             position:
//               "fixed",
//             top: 0,
//             left: 0,
//             width:
//               "100%",
//             height:
//               "100%",
//             background:
//               "rgba(0,0,0,0.75)",
//             display:
//               "flex",
//             alignItems:
//               "center",
//             justifyContent:
//               "center",
//             zIndex:
//               9999,
//             padding:
//               "20px",
//           }}
//         >

//           <div
//             style={{
//               background:
//                 "#1e293b",
//               padding:
//                 "30px",
//               borderRadius:
//                 "15px",
//               maxWidth:
//                 "600px",
//               width:
//                 "100%",
//               color:
//                 "white",
//               boxShadow:
//                 "0 10px 40px rgba(0,0,0,0.6)",
//             }}
//           >

//             <h2>
//               🧠 AI Explanation
//             </h2>


//             <p
//               style={{
//                 whiteSpace:
//                   "pre-line",
//                 lineHeight:
//                   "1.6",
//                 marginTop:
//                   "15px",
//                 color:
//                   "#cbd5e1",
//               }}
//             >
//               {aiExplain}
//             </p>


//             <button
//               onClick={() =>
//                 setShowModal(
//                   false
//                 )
//               }
//               style={{
//                 marginTop:
//                   "20px",
//                 padding:
//                   "10px 20px",
//                 border:
//                   "none",
//                 borderRadius:
//                   "10px",
//                 background:
//                   "#FF8C00",
//                 color:
//                   "white",
//                 cursor:
//                   "pointer",
//               }}
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}


//       {/* =====================================================
//           DAILY INSIGHT
//       ===================================================== */}

//       {showTip && (

//         <div
//           style={{
//             position:
//               "fixed",
//             top:
//               "20px",
//             right:
//               "20px",
//             background:
//               "linear-gradient(135deg,#00ff99,#00bfff)",
//             color:
//               "#022c22",
//             padding:
//               "18px 22px",
//             borderRadius:
//               "15px",
//             boxShadow:
//               "0 10px 30px rgba(0,255,150,0.4)",
//             zIndex:
//               1000,
//             maxWidth:
//               "350px",
//           }}
//         >

//           <strong>
//             💡 Daily Insight
//           </strong>


//           <p
//             style={{
//               marginTop:
//                 "5px",
//               fontSize:
//                 "14px",
//             }}
//           >
//             {latestBurnout >
//             40
//               ? "Take a lighter day today — your pattern shows rising fatigue."
//               : "You're in a great rhythm — keep it consistent!"}
//           </p>


//           <button
//             onClick={() =>
//               setShowTip(
//                 false
//               )
//             }
//             style={{
//               marginTop:
//                 "10px",
//               border:
//                 "none",
//               background:
//                 "#022c22",
//               color:
//                 "white",
//               padding:
//                 "5px 10px",
//               borderRadius:
//                 "8px",
//               cursor:
//                 "pointer",
//             }}
//           >
//             Close
//           </button>

//         </div>

//       )}

//     </>
//   );
// }


// export default Dashboard;

import { useState, useEffect, useMemo, useCallback } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import AIChat from "../components/AIChat";
import Card from "../components/Card";
import AICoach from "../components/AICoach";
import Sidebar from "../components/Sidebar";
import BurnoutTimeline from "../components/BurnoutTimeline";
import DigitalTwin from "../components/DigitalTwin";
import LiveRadar from "../components/LiveRadar";
import ReflectionPanel from "../components/ReflectionPanel";
import "./heatmap.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:8000";

function Dashboard({ user }) {
  // =========================================================
  // STATE
  // =========================================================
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("dashboard");
  const [showTip, setShowTip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [aiExplain, setAiExplain] = useState("");
  const [typedText, setTypedText] = useState("");
  const [reflections, setReflections] = useState([]);

  const [futureBurnoutTrend, setFutureBurnoutTrend] = useState([]);
  const [simulatedData, setSimulatedData] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [isFlatPrediction, setIsFlatPrediction] = useState(false);
  const [autoAction, setAutoAction] = useState(null);
  const [bestMode, setBestMode] = useState(null);
  const [recommendationText, setRecommendationText] = useState("");
  const [decisionScores, setDecisionScores] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [hasRecommended, setHasRecommended] = useState(false);

  // =========================================================
  // LOAD DASHBOARD DATA
  // IMPORTANT:
  // ALL HOOKS IN THIS COMPONENT ARE DECLARED BEFORE ANY RETURN.
  // This fixes the React "Rendered more/fewer hooks" crash.
  // =========================================================
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/dashboard-data`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        setError(
          "Your dashboard session has expired. Please login with GitHub again."
        );
        return;
      }

      if (!response.ok) {
        let message = `Dashboard request failed (${response.status})`;

        try {
          const errorData = await response.json();
          message = errorData?.detail || errorData?.error || message;
        } catch {
          // Backend did not return JSON.
        }

        throw new Error(message);
      }

      const responseData = await response.json();

      let data = null;

      if (
        responseData?.data &&
        typeof responseData.data === "object" &&
        !Array.isArray(responseData.data)
      ) {
        data = responseData.data;
      } else if (
        responseData &&
        (
          responseData.burnout_score !== undefined ||
          responseData.heatmap !== undefined ||
          responseData.feature_breakdown !== undefined
        )
      ) {
        data = responseData;
      }

      if (!data) {
        throw new Error("Dashboard data is empty.");
      }

      const normalizedData = {
        username:
          data.username ||
          responseData.username ||
          user?.login ||
          user?.username ||
          "Developer",

        burnout_score: Number(data.burnout_score ?? 0),

        burnout_status: data.burnout_status || "Unknown",

        burnout_recommendation: Array.isArray(
          data.burnout_recommendation
        )
          ? data.burnout_recommendation
          : data.burnout_recommendation
            ? [data.burnout_recommendation]
            : [],

        ai_coach:
          data.ai_coach ||
          "Analyzing your development activity...",

        feature_breakdown:
          data.feature_breakdown &&
          typeof data.feature_breakdown === "object"
            ? data.feature_breakdown
            : {},

        total_commits: Number(data.total_commits ?? 0),

        heatmap: Array.isArray(data.heatmap) ? data.heatmap : [],

        weekly_commit_activity:
          data.weekly_commit_activity &&
          typeof data.weekly_commit_activity === "object"
            ? data.weekly_commit_activity
            : {},

        predicted_next_week_commits: Number(
          data.predicted_next_week_commits ?? 0
        ),

        weekly_burnout_scores: Array.isArray(data.weekly_burnout_scores)
          ? data.weekly_burnout_scores
          : [],

        predicted_burnout:
          data.predicted_burnout !== undefined
            ? Number(data.predicted_burnout)
            : undefined,
      };

      setDashboardData(normalizedData);
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError(err?.message || "Unable to load your dashboard.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // =========================================================
  // SAFE DATA
  // These values are safe even during the first loading render.
  // =========================================================
  const decoded = dashboardData || {};

  const featureBreakdown =
    decoded.feature_breakdown &&
    typeof decoded.feature_breakdown === "object"
      ? decoded.feature_breakdown
      : {};

  const burnoutScores =
    Array.isArray(decoded.weekly_burnout_scores) &&
    decoded.weekly_burnout_scores.length > 0
      ? decoded.weekly_burnout_scores
      : [Number(decoded.burnout_score ?? 0)];

  const latestBurnout = Number(
    burnoutScores[burnoutScores.length - 1] ?? 0
  );

  const predictedBurnout = Number(
    decoded.predicted_burnout ?? latestBurnout
  );

  const predictedCommits = Number(
    decoded.predicted_next_week_commits ?? 0
  );

  const weeklyActivity =
    decoded.weekly_commit_activity &&
    typeof decoded.weekly_commit_activity === "object"
      ? decoded.weekly_commit_activity
      : {};

  const weeklyEntries = Object.entries(weeklyActivity).sort(
    ([a], [b]) => String(a).localeCompare(String(b))
  );

  const rawCommits = weeklyEntries.map(([, value]) => Number(value) || 0);

  // =========================================================
  // LINEAR REGRESSION
  // =========================================================
  let predictedLinearCommits = predictedCommits;

  if (rawCommits.length >= 2) {
    const n = rawCommits.length;
    const x = rawCommits.map((_, index) => index + 1);
    const y = rawCommits;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);

    const sumXY = x.reduce(
      (sum, xi, index) => sum + xi * y[index],
      0
    );

    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const denominator = n * sumXX - sumX * sumX;

    if (denominator !== 0) {
      const m = (n * sumXY - sumX * sumY) / denominator;
      const b = (sumY - m * sumX) / n;
      const prediction = m * (n + 1) + b;

      if (Number.isFinite(prediction)) {
        predictedLinearCommits = Math.max(
          0,
          Number(prediction.toFixed(2))
        );
      }
    }
  }

  const commitData = rawCommits.map((value, index) => ({
    week: weeklyEntries[index]?.[0] || `W${index + 1}`,
    commits: value,
  }));

  if (rawCommits.length > 0) {
    commitData.push({
      week: "Next",
      predicted: predictedLinearCommits,
    });
  }

  // =========================================================
  // HEATMAP
  // =========================================================
  const safeHeatmap = (
    Array.isArray(decoded.heatmap) ? decoded.heatmap : []
  ).filter(
    (item) => item && typeof item.date === "string"
  );

  const maxCount =
    safeHeatmap.length > 0
      ? Math.max(
          ...safeHeatmap.map((item) => Number(item.count) || 0)
        )
      : 0;

  const heatmapData = safeHeatmap.map((item) => {
    const count = Number(item.count) || 0;

    return {
      date: item.date,
      count:
        maxCount === 0
          ? 0
          : Math.round((count / maxCount) * 10),
    };
  });

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // =========================================================
  // DERIVED DASHBOARD VALUES
  // =========================================================
  let pattern = "Balanced Developer";

  if (Number(featureBreakdown.weekend_ratio || 0) > 50) {
    pattern = "Weekend Warrior";
  } else if (
    Number(featureBreakdown.late_night_intensity || 0) > 40
  ) {
    pattern = "Night Owl";
  } else if (
    Number(featureBreakdown.volatility_index || 0) > 50
  ) {
    pattern = "Burst Worker";
  }

  let scoreColor = "#00ff99";

  if (latestBurnout >= 40) scoreColor = "#facc15";
  if (latestBurnout >= 60) scoreColor = "#f97316";
  if (latestBurnout >= 80) scoreColor = "#ef4444";

  const theme =
    latestBurnout < 30
      ? {
          primary: "#00ff99",
          glow: "rgba(0,255,150,0.4)",
        }
      : latestBurnout < 60
        ? {
            primary: "#facc15",
            glow: "rgba(250,204,21,0.4)",
          }
        : {
            primary: "#ef4444",
            glow: "rgba(239,68,68,0.5)",
          };

  const healthIndex = Math.max(
    0,
    Math.min(100, 100 - latestBurnout)
  ).toFixed(1);

  const riskLevel =
    latestBurnout < 30
      ? "SAFE"
      : latestBurnout < 60
        ? "WARNING"
        : "DANGER";

  const aiPersonality =
    latestBurnout < 30
      ? "chill"
      : latestBurnout < 60
        ? "supportive"
        : "strict";

  const focusScore = Math.max(
    0,
    100 -
      Number(featureBreakdown.volatility_index || 0) -
      Number(featureBreakdown.late_night_intensity || 0) / 2
  ).toFixed(1);

  // Keep this function for compatibility with the existing UI.
  void aiPersonality;

  const getProtectionMessage = () => {
    if (riskLevel === "SAFE") {
      return "🟢 You are in a healthy zone. Maintain your rhythm.";
    }

    if (riskLevel === "WARNING") {
      return "🟡 Early signs of burnout detected. Adjust workload.";
    }

    return "🔴 High burnout risk. Immediate intervention required.";
  };

  const getWeeklyGoal = () => {
    if (latestBurnout < 30) {
      return "Maintain your current rhythm ✅";
    }

    if (latestBurnout < 60) {
      return "Reduce 1–2 work sessions this week ⚖️";
    }

    return "Take 2 days off + reduce workload 🔴";
  };

  const getReasonTag = () => {
    if (
      Number(featureBreakdown.late_night_intensity || 0) > 40
    ) {
      return "High late-night activity detected";
    }

    if (Number(featureBreakdown.weekend_ratio || 0) > 30) {
      return "Excessive weekend workload";
    }

    if (
      Number(featureBreakdown.volatility_index || 0) > 40
    ) {
      return "Unstable work pattern";
    }

    return "Stable performance pattern";
  };

  // =========================================================
  // ALERTS
  // =========================================================
  const alerts = useMemo(() => {
    const result = [];

    if (
      Number(featureBreakdown.late_night_intensity || 0) > 30
    ) {
      result.push("🌙 Late-night work detected");
    }

    if (Number(featureBreakdown.weekend_ratio || 0) > 20) {
      result.push("📅 Weekend work is higher than ideal");
    }

    if (
      Number(featureBreakdown.volatility_index || 0) > 35
    ) {
      result.push("📊 Work pattern is unstable");
    }

    if (latestBurnout > 50) {
      result.push("🔥 Burnout risk rising");
    }

    return result;
  }, [
    featureBreakdown.late_night_intensity,
    featureBreakdown.weekend_ratio,
    featureBreakdown.volatility_index,
    latestBurnout,
  ]);

  // =========================================================
  // INTERVENTIONS
  // =========================================================
  const interventions = useMemo(() => {
    const actions = [];

    if (
      Number(featureBreakdown.late_night_intensity || 0) > 30
    ) {
      actions.push(
        "🌙 Avoid coding after 11 PM for the next 3 days"
      );
    }

    if (Number(featureBreakdown.weekend_ratio || 0) > 20) {
      actions.push(
        "📅 Take at least 1 full day off this weekend"
      );
    }

    if (
      Number(featureBreakdown.volatility_index || 0) > 40
    ) {
      actions.push(
        "📊 Stabilize your work schedule and avoid large bursts"
      );
    }

    if (latestBurnout > 60) {
      actions.push("🛑 Reduce workload by approximately 30%");
    }

    if (actions.length === 0) {
      actions.push("✅ Keep following your current routine");
    }

    return actions;
  }, [
    featureBreakdown.late_night_intensity,
    featureBreakdown.weekend_ratio,
    featureBreakdown.volatility_index,
    latestBurnout,
  ]);

  // =========================================================
  // BURNOUT IMPACT
  // =========================================================
  const calculateBurnoutImpact = useCallback(
    (mode, base, features) => {
      let score = Number(base) || 0;

      const late = Number(
        features?.late_night_intensity || 0
      );

      const weekend = Number(
        features?.weekend_ratio || 0
      );

      const volatility = Number(
        features?.volatility_index || 0
      );

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
    },
    []
  );

  // =========================================================
  // FALLBACK FORECAST
  // =========================================================
  const createFallbackForecast = useCallback(() => {
    let last = latestBurnout;
    const result = [];

    const late = Number(
      featureBreakdown.late_night_intensity || 0
    );

    const weekend = Number(
      featureBreakdown.weekend_ratio || 0
    );

    const volatility = Number(
      featureBreakdown.volatility_index || 0
    );

    const pressure =
      late * 0.025 +
      weekend * 0.02 +
      volatility * 0.03;

    for (let i = 1; i <= 4; i += 1) {
      const direction =
        i *
        (latestBurnout > 60
          ? 1.2
          : latestBurnout > 40
            ? 0.5
            : -0.15);

      const next = Math.max(
        0,
        Math.min(100, last + direction + pressure)
      );

      result.push({
        week: `+${i}`,
        burnout: Number(next.toFixed(1)),
      });

      last = next;
    }

    return result;
  }, [
    latestBurnout,
    featureBreakdown.late_night_intensity,
    featureBreakdown.weekend_ratio,
    featureBreakdown.volatility_index,
  ]);

  // =========================================================
  // BURNOUT FORECAST
  // =========================================================
  useEffect(() => {
    if (!dashboardData) return;

    let cancelled = false;

    const loadForecast = async () => {
      try {
        const response = await fetch(
          `${API_URL}/predict-burnout`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              burnout_history: burnoutScores,
              features: featureBreakdown,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Prediction endpoint unavailable");
        }

        const data = await response.json();

        const prediction = Array.isArray(data?.prediction)
          ? data.prediction
          : [];

        const formatted = prediction
          .slice(0, 4)
          .map((value, index) => ({
            week: `+${index + 1}`,
            burnout: Math.max(
              0,
              Math.min(100, Number(value) || 0)
            ),
          }));

        if (!formatted.length) {
          throw new Error("Empty prediction");
        }

        if (!cancelled) {
          setFutureBurnoutTrend(formatted);

          const flat = formatted.every(
            (point, index, arr) =>
              index === 0 ||
              Math.abs(point.burnout - arr[0].burnout) < 0.3
          );

          setIsFlatPrediction(flat);
        }
      } catch (err) {
        console.warn(
          "Prediction API failed. Using local fallback:",
          err
        );

        if (!cancelled) {
          const fallback = createFallbackForecast();

          setFutureBurnoutTrend(fallback);

          setIsFlatPrediction(
            fallback.every(
              (point, index, arr) =>
                index === 0 ||
                Math.abs(point.burnout - arr[0].burnout) < 0.3
            )
          );
        }
      }
    };

    loadForecast();

    return () => {
      cancelled = true;
    };
  }, [
    dashboardData,
    burnoutScores.join(","),
    JSON.stringify(featureBreakdown),
    createFallbackForecast,
  ]);

  // =========================================================
  // AUTO INTERVENTION
  // =========================================================
  useEffect(() => {
    if (!futureBurnoutTrend.length) {
      setAutoAction(null);
      return;
    }

    const average =
      futureBurnoutTrend.reduce(
        (sum, point) => sum + Number(point.burnout || 0),
        0
      ) / futureBurnoutTrend.length;

    if (average > 65) {
      setAutoAction("FORCE_REST");
    } else if (average > 45) {
      setAutoAction("SUGGEST_BALANCE");
    } else {
      setAutoAction("SAFE_MODE");
    }
  }, [futureBurnoutTrend]);

  // =========================================================
  // SIMULATION
  // =========================================================
  const simulateFuture = useCallback(
    (mode) => {
      if (!futureBurnoutTrend.length) return [];

      let last = latestBurnout;

      return futureBurnoutTrend.map((point) => {
        const next = calculateBurnoutImpact(
          mode,
          last,
          featureBreakdown
        );

        last = next;

        return {
          week: point.week,
          burnout: Number(next.toFixed(1)),
        };
      });
    },
    [
      futureBurnoutTrend,
      latestBurnout,
      calculateBurnoutImpact,
      featureBreakdown.late_night_intensity,
      featureBreakdown.weekend_ratio,
      featureBreakdown.volatility_index,
    ]
  );

  // =========================================================
  // AUTO SIMULATION
  // =========================================================
  useEffect(() => {
    if (autoAction === "FORCE_REST") {
      setSimulatedData(simulateFuture("rest"));
      setSelectedMode("rest");
    } else if (autoAction === "SUGGEST_BALANCE") {
      setSimulatedData(simulateFuture("balanced"));
      setSelectedMode("balanced");
    } else if (autoAction === "SAFE_MODE") {
      setSimulatedData(null);
      setSelectedMode(null);
    }
  }, [autoAction, simulateFuture]);

  // =========================================================
  // AI DECISION ENGINE
  // =========================================================
  useEffect(() => {
    if (!dashboardData || !futureBurnoutTrend.length) return;

    // Reset when a new dashboard is loaded.
    setHasRecommended(false);
  }, [dashboardData]);

  useEffect(() => {
    if (!futureBurnoutTrend.length || hasRecommended) return;

    const rest = simulateFuture("rest");
    const balanced = simulateFuture("balanced");
    const push = simulateFuture("push");

    const average = (array) => {
      if (!array.length) return latestBurnout;

      return (
        array.reduce(
          (sum, item) => sum + Number(item.burnout || 0),
          0
        ) / array.length
      );
    };

    const riskPenalty = (mode) => {
      if (mode === "push" && latestBurnout > 60) return 15;
      if (mode === "balanced" && latestBurnout > 70) return 5;
      return 0;
    };

    const scores = {
      rest: average(rest) + riskPenalty("rest"),
      balanced:
        average(balanced) + riskPenalty("balanced"),
      push: average(push) + riskPenalty("push"),
    };

    setDecisionScores(scores);

    const best = Object.keys(scores).reduce((a, b) =>
      scores[a] < scores[b] ? a : b
    );

    setBestMode(best);

    const values = Object.values(scores);

    const spread =
      values.length > 0
        ? Math.max(...values) - Math.min(...values)
        : 0;

    setConfidence(
      Math.min(100, Math.max(0, Math.round(spread * 10)))
    );

    setHasRecommended(true);

    let cancelled = false;

    const loadRecommendation = async () => {
      try {
        const response = await fetch(
          `${API_URL}/ai-chat`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Explain why ${best} is best and others are worse. Keep it to 2 short lines.`,
            }),
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!cancelled && data?.reply) {
          setRecommendationText(data.reply);
        }
      } catch (err) {
        console.warn(
          "AI recommendation unavailable:",
          err
        );
      }
    };

    loadRecommendation();

    return () => {
      cancelled = true;
    };
  }, [
    futureBurnoutTrend,
    hasRecommended,
    simulateFuture,
    latestBurnout,
  ]);

  // =========================================================
  // SELECTED SIMULATION EXPLANATION
  // =========================================================
  useEffect(() => {
    if (!selectedMode || !futureBurnoutTrend.length) return;

    let cancelled = false;

    const loadExplanation = async () => {
      try {
        const response = await fetch(
          `${API_URL}/ai-chat`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `
User selected ${selectedMode} mode.

Explain:
- Why burnout will change in this scenario
- What behavior causes it
- Keep it short and human-like
- Maximum 2 lines

Data:
Current burnout: ${latestBurnout}
Late night: ${featureBreakdown.late_night_intensity || 0}
Weekend: ${featureBreakdown.weekend_ratio || 0}
Volatility: ${featureBreakdown.volatility_index || 0}
              `,
            }),
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!cancelled && data?.reply) {
          setAiExplain(data.reply);
        }
      } catch (err) {
        console.warn(
          "AI simulation explanation unavailable:",
          err
        );
      }
    };

    loadExplanation();

    return () => {
      cancelled = true;
    };
  }, [
    selectedMode,
    futureBurnoutTrend.length,
    latestBurnout,
    featureBreakdown.late_night_intensity,
    featureBreakdown.weekend_ratio,
    featureBreakdown.volatility_index,
  ]);

  // =========================================================
  // FLAT PREDICTION EXPLANATION
  // =========================================================
  useEffect(() => {
    if (!isFlatPrediction || !dashboardData) return;

    let cancelled = false;

    const loadFlatExplanation = async () => {
      try {
        const response = await fetch(
          `${API_URL}/ai-chat`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `
Explain the pattern in my burnout prediction trend.

If the trend is flat:
explain that behavior and inputs are stable.

If increasing:
explain workload pressure.

If decreasing:
explain recovery.

Be short, natural and human-like.
Maximum 2 lines.
              `,
              burnout_score: decoded.burnout_score,
              burnout_status: decoded.burnout_status,
              features: decoded.feature_breakdown,
            }),
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!cancelled && data?.reply) {
          setAiExplain(data.reply);
        }
      } catch (err) {
        console.warn(
          "AI trend explanation unavailable:",
          err
        );
      }
    };

    loadFlatExplanation();

    return () => {
      cancelled = true;
    };
  }, [
    isFlatPrediction,
    dashboardData,
    decoded.burnout_score,
    decoded.burnout_status,
    JSON.stringify(decoded.feature_breakdown || {}),
  ]);

  // =========================================================
  // AI COACH TYPING
  // =========================================================
  useEffect(() => {
    if (!dashboardData) return;

    const text =
      decoded.ai_coach ||
      "Analyzing your development behavior...";

    let index = 0;

    setTypedText("");

    const interval = setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [dashboardData, decoded.ai_coach]);

  // =========================================================
  // REFLECTIONS
  // =========================================================
  const loadReflections = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/reflections`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      setReflections(
        Array.isArray(data?.reflections)
          ? data.reflections
          : []
      );
    } catch (err) {
      console.warn(
        "Reflection loading unavailable:",
        err
      );
    }
  }, []);

  useEffect(() => {
    if (!dashboardData) return;
    loadReflections();
  }, [dashboardData, loadReflections]);

  // =========================================================
  // DAILY TIP
  // =========================================================
  useEffect(() => {
    if (!dashboardData) return;

    const timer = setTimeout(
      () => setShowTip(true),
      800
    );

    return () => clearTimeout(timer);
  }, [dashboardData]);

  // =========================================================
  // EXPLAIN BURNOUT
  // =========================================================
  const explainBurnout = async () => {
    try {
      const response = await fetch(
        `${API_URL}/ai-chat`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              "Explain why my burnout score is like this. Give a concise human explanation.",
            burnout_score: decoded.burnout_score,
            burnout_status: decoded.burnout_status,
            features: decoded.feature_breakdown,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI explanation failed");
      }

      const data = await response.json();

      setAiExplain(
        data?.reply ||
          "Your burnout score is based on your recent development activity patterns."
      );

      setShowModal(true);
    } catch (err) {
      console.error("AI explanation error:", err);

      setAiExplain(
        "Your burnout score reflects your recent workload, work timing, weekend activity and workload stability."
      );

      setShowModal(true);
    }
  };

  // =========================================================
  // RISK TIMELINE
  // =========================================================
  const riskTimeline = useMemo(() => {
    if (!futureBurnoutTrend.length) return null;

    for (let i = 0; i < futureBurnoutTrend.length; i += 1) {
      if (Number(futureBurnoutTrend[i]?.burnout || 0) >= 60) {
        return {
          week: futureBurnoutTrend[i].week,
          index: i + 1,
          level: "HIGH",
        };
      }
    }

    return null;
  }, [futureBurnoutTrend]);

  // =========================================================
  // LOADING SCREEN
  // IMPORTANT: THIS RETURN IS AFTER ALL HOOKS.
  // =========================================================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ fontSize: "50px" }}>🧠</div>
        <h2>Loading CollapseGuard...</h2>
        <p style={{ color: "#94a3b8" }}>
          Fetching your GitHub wellness intelligence
        </p>
      </div>
    );
  }

  // =========================================================
  // ERROR SCREEN
  // =========================================================
  if (error || !dashboardData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "55px" }}>⚠️</div>

        <h2>Unable to load your dashboard</h2>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "600px",
          }}
        >
          {error || "Dashboard data was not found."}
        </p>

        <button
          onClick={loadDashboardData}
          style={{
            marginTop: "20px",
            padding: "13px 25px",
            borderRadius: "12px",
            border: "none",
            background:
              "linear-gradient(135deg,#00ff99,#00bfff)",
            color: "#022c22",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          🔄 Reload Dashboard
        </button>
      </div>
    );
  }

  // =========================================================
  // DIGITAL TWIN VIEW
  // =========================================================
  if (view === "simulation") {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Sidebar setView={setView} />

        <div
          style={{
            flex: 1,
            padding: "40px",
            marginLeft: "220px",
          }}
        >
          <DigitalTwin
            latestBurnout={latestBurnout}
            features={featureBreakdown}
          />
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN DASHBOARD
  // =========================================================
  return (
    <>
      <div
        style={{
          display: "flex",
          background: "transparent",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Sidebar setView={setView} />

        <div
          style={{
            flex: 1,
            background: "transparent",
            padding: "40px",
            boxSizing: "border-box",
            marginLeft: "220px",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>
            Welcome, {decoded.username}
          </h1>

          {view === "timeline" ? (
            <BurnoutTimeline data={futureBurnoutTrend} />
          ) : view === "reflection" ? (
            <ReflectionPanel onSave={loadReflections} />
          ) : (
            <>
              <AICoach typedText={typedText} />

              <LiveRadar
                burnout={latestBurnout}
                features={featureBreakdown}
              />

              <div className="grid">
                <Card
                  title="Burnout Score"
                  value={latestBurnout}
                  color={scoreColor}
                  icon="🔥"
                />

                <Card
                  title="Health Index"
                  value={healthIndex}
                  color="#00ff99"
                  icon="💚"
                />

                <Card
                  title="Next Week Commits"
                  value={predictedCommits}
                  color="#00bfff"
                  icon="📈"
                />

                <Card
                  title="Burnout Risk"
                  value={`${predictedBurnout}%`}
                  color="#facc15"
                  icon="⚠️"
                />

                <Card
                  title="Pattern"
                  value={pattern}
                  color="#a78bfa"
                  icon="🧠"
                  small
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
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
                    background:
                      "linear-gradient(135deg,#3d4a5f,#1a2425)",
                    boxShadow:
                      "0 0 20px rgba(59,130,246,0.4)",
                  }}
                >
                  ⚡ Why this score?
                </button>
              </div>

              <div className="card">
                <h2>Contribution Heatmap</h2>

                {heatmapData.length > 0 ? (
                  <CalendarHeatmap
                    startDate={oneYearAgo}
                    endDate={today}
                    values={heatmapData}
                    gutterSize={4}
                    showMonthLabels
                    classForValue={(value) => {
                      if (!value || value.count === 0) {
                        return "color-empty";
                      }

                      if (value.count < 3) {
                        return "color-scale-1";
                      }

                      if (value.count < 6) {
                        return "color-scale-2";
                      }

                      if (value.count < 10) {
                        return "color-scale-3";
                      }

                      return "color-scale-4";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: "30px",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No contribution data available yet.
                  </div>
                )}
              </div>

              <div
                className="card card-wide"
                style={{
                  marginTop: "20px",
                  boxShadow: `0 10px 30px ${theme.glow}`,
                  borderLeft:
                    riskLevel === "DANGER"
                      ? "4px solid #ef4444"
                      : riskLevel === "WARNING"
                        ? "4px solid #facc15"
                        : "4px solid #00ff99",
                }}
              >
                <h2>🛡️ AI Protection System</h2>

                <h3
                  style={{
                    color:
                      riskLevel === "DANGER"
                        ? "#ef4444"
                        : riskLevel === "WARNING"
                          ? "#facc15"
                          : "#00ff99",
                  }}
                >
                  {riskLevel}
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginTop: "10px",
                  }}
                >
                  {getProtectionMessage()}
                </p>
              </div>

              <div
                className="card"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <h2>🚨 AI Actions</h2>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {interventions.map((action, index) => (
                    <div
                      key={index}
                      style={{
                        background:
                          "rgba(56,189,248,0.1)",
                        border:
                          "1px solid rgba(56,189,248,0.3)",
                        padding: "12px",
                        borderRadius: "10px",
                        fontSize: "14px",
                      }}
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card card-wide">
                <h2>Commits Trend</h2>

                {commitData.length > 0 ? (
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <LineChart data={commitData}>
                      <CartesianGrid stroke="#333" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="commits"
                        stroke="#00ff99"
                        strokeWidth={2}
                      />

                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#00bfff"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p style={{ color: "#94a3b8" }}>
                    No weekly commit data available.
                  </p>
                )}
              </div>

              <div
                className="card card-wide"
                style={{
                  marginTop: "20px",
                  borderLeft: "4px solid #00ff99",
                  boxShadow: `0 10px 30px ${theme.glow}`,
                }}
              >
                <h2>🧠 AI Recommendation</h2>

                {bestMode && (
                  <h3 style={{ color: "#00ff99" }}>
                    Recommended:{" "}
                    {bestMode === "rest"
                      ? "🧘 Take Break"
                      : bestMode === "balanced"
                        ? "⚖️ Stay Balanced"
                        : "🚀 Push Hard"}
                  </h3>
                )}

                <p
                  style={{
                    color: "#cbd5e1",
                    marginTop: "10px",
                  }}
                >
                  {recommendationText ||
                    decoded.burnout_recommendation?.join(" ") ||
                    "Analyzing your workload pattern..."}
                </p>

                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "#94a3b8",
                    background:
                      "rgba(148,163,184,0.08)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  💡 {getReasonTag()}
                </p>
              </div>

              <div
                className="card card-wide"
                style={{ marginTop: "20px" }}
              >
                <h2>⚖️ Decision Comparison</h2>

                {decisionScores &&
                  Object.entries(decisionScores).map(
                    ([mode, score]) => {
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
                            justifyContent:
                              "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <strong>
                              {mode === "rest" &&
                                "🧘 Take Break"}
                              {mode === "balanced" &&
                                "⚖️ Stay Balanced"}
                              {mode === "push" &&
                                "🚀 Push Hard"}
                            </strong>

                            {isBest && (
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color: "#00ff99",
                                }}
                              >
                                ⭐ BEST
                              </span>
                            )}
                          </div>

                          <div
                            style={{
                              color: isBest
                                ? "#00ff99"
                                : "#cbd5e1",
                              fontWeight: "600",
                            }}
                          >
                            {Number(score).toFixed(1)}%
                          </div>
                        </div>
                      );
                    }
                  )}

                <div
                  style={{
                    marginTop: "15px",
                    background:
                      "rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "8px",
                  }}
                >
                  <div
                    style={{
                      width: `${confidence ?? 0}%`,
                      background:
                        (confidence ?? 0) > 60
                          ? "#00ff99"
                          : "#facc15",
                      height: "100%",
                      transition: "0.4s",
                    }}
                  />
                </div>
              </div>

              <div
                className="card card-wide"
                style={{
                  marginTop: "20px",
                  borderLeft:
                    autoAction === "FORCE_REST"
                      ? "4px solid #ef4444"
                      : autoAction === "SUGGEST_BALANCE"
                        ? "4px solid #facc15"
                        : "4px solid #00ff99",
                }}
              >
                <h2>🤖 AI Auto Intervention</h2>

                {autoAction === "FORCE_REST" && (
                  <p style={{ color: "#ef4444" }}>
                    🔴 AI detected high burnout risk → Forced
                    recovery mode activated
                  </p>
                )}

                {autoAction === "SUGGEST_BALANCE" && (
                  <p style={{ color: "#facc15" }}>
                    🟡 AI suggests balancing workload to prevent
                    escalation
                  </p>
                )}

                {autoAction === "SAFE_MODE" && (
                  <p style={{ color: "#00ff99" }}>
                    🟢 You are stable → No intervention needed
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "20px",
                  marginBottom: "15px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  ["rest", "🧘 Take Break"],
                  ["balanced", "⚖️ Stay Balanced"],
                  ["push", "🚀 Push Hard"],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSimulatedData(
                        simulateFuture(mode)
                      );
                      setSelectedMode(mode);
                    }}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      background: "#1e293b",
                      color: "white",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div
                className="card card-wide"
                style={{
                  marginTop: "20px",
                  position: "relative",
                }}
              >
                <h2>🔮 Burnout Forecast (4 Weeks)</h2>

                {aiExplain && (
                  <div
                    style={{
                      background:
                        "rgba(30,41,59,0.9)",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      marginBottom: "15px",
                      color: "#e2e8f0",
                      lineHeight: "1.5",
                    }}
                  >
                    🤖 <strong>AI Insight</strong>
                    <br />
                    {aiExplain}
                  </div>
                )}

                {(simulatedData || futureBurnoutTrend).length >
                0 ? (
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <LineChart
                      data={
                        simulatedData ||
                        futureBurnoutTrend
                      }
                    >
                      <CartesianGrid
                        stroke="#333"
                        strokeDasharray="3 3"
                      />
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
                ) : (
                  <p style={{ color: "#94a3b8" }}>
                    Forecast is being calculated...
                  </p>
                )}
              </div>

              <div
                className="card card-wide"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderLeft: riskTimeline
                    ? "4px solid #ef4444"
                    : "4px solid #00ff99",
                  boxShadow: `0 10px 30px ${theme.glow}`,
                }}
              >
                <h2>⏳ Burnout Risk Timeline</h2>

                {riskTimeline ? (
                  <>
                    <h3 style={{ color: "#ef4444" }}>
                      ⚠️ Risk in {riskTimeline.index} week(s)
                    </h3>

                    <p style={{ color: "#cbd5e1" }}>
                      You may reach high burnout by{" "}
                      {riskTimeline.week}
                    </p>

                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "13px",
                        color: "#94a3b8",
                      }}
                    >
                      AI suggests reducing workload before this
                      point.
                    </p>
                  </>
                ) : (
                  <p style={{ color: "#00ff99" }}>
                    No high burnout risk detected in the next 4
                    weeks.
                  </p>
                )}
              </div>

              <div
                className="card card-wide"
                style={{
                  borderLeft: "4px solid #facc15",
                }}
              >
                <h2>🚨 Smart Alerts</h2>

                {alerts.length === 0 ? (
                  <p style={{ color: "#00ff99" }}>
                    All good 👍
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {alerts.map((alert, index) => (
                      <div
                        key={index}
                        onClick={explainBurnout}
                        style={{
                          background:
                            "rgba(250,204,21,0.1)",
                          border:
                            "1px solid rgba(250,204,21,0.3)",
                          padding: "12px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        ⚠️ {alert}
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
                      background:
                        "linear-gradient(135deg,#00ff99,#00bfff)",
                      color: "#022c22",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    ⚡ Fix with AI
                  </button>
                )}
              </div>

              <div
                className="card card-wide"
                style={{ marginTop: "20px" }}
              >
                <h2>🎯 Weekly Goal</h2>

                <h3
                  style={{
                    color: "#38bdf8",
                    background:
                      "rgba(56,189,248,0.1)",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  {getWeeklyGoal()}
                </h3>
              </div>

              <ReflectionPanel onSave={loadReflections} />

              {reflections.length > 0 && (
                <div
                  className="card card-wide"
                  style={{ marginTop: "20px" }}
                >
                  <h2>🕒 Reflection Timeline</h2>

                  {reflections.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        marginTop: "12px",
                        padding: "12px",
                        borderRadius: "10px",
                        background:
                          "rgba(255,255,255,0.05)",
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p style={{ color: "#e2e8f0" }}>
                        {item.text}
                      </p>

                      {item.created_at && (
                        <small
                          style={{
                            color: "#94a3b8",
                          }}
                        >
                          {new Date(
                            item.created_at
                          ).toLocaleString()}
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div
                className="card card-wide"
                style={{ marginTop: "20px" }}
              >
                <h2>🧑‍💻 You vs Ideal Developer</h2>

                <p>
                  Late Night:{" "}
                  {Number(
                    featureBreakdown.late_night_intensity || 0
                  ).toFixed(1)}
                  % (Ideal: &lt;20%)
                </p>

                <p>
                  Weekend Work:{" "}
                  {Number(
                    featureBreakdown.weekend_ratio || 0
                  ).toFixed(1)}
                  % (Ideal: &lt;15%)
                </p>

                <p>
                  Stability:{" "}
                  {Number(
                    featureBreakdown.volatility_index || 0
                  ).toFixed(1)}
                  % (Ideal: &lt;30%)
                </p>

                <p>Focus Score: {focusScore}%</p>
              </div>
            </>
          )}
        </div>
      </div>

      <AIChat
        burnoutScore={decoded.burnout_score}
        burnoutStatus={decoded.burnout_status}
      />

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              maxWidth: "600px",
              width: "100%",
              color: "white",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            <h2>🧠 AI Explanation</h2>

            <p
              style={{
                whiteSpace: "pre-line",
                lineHeight: "1.6",
                marginTop: "15px",
                color: "#cbd5e1",
              }}
            >
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
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTip && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background:
              "linear-gradient(135deg,#00ff99,#00bfff)",
            color: "#022c22",
            padding: "18px 22px",
            borderRadius: "15px",
            boxShadow:
              "0 10px 30px rgba(0,255,150,0.4)",
            zIndex: 1000,
            maxWidth: "350px",
          }}
        >
          <strong>💡 Daily Insight</strong>

          <p
            style={{
              marginTop: "5px",
              fontSize: "14px",
            }}
          >
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
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Dashboard;