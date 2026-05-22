import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BurnoutTimeline({ data=[] }) {
//   const [currentDay, setCurrentDay] = useState(data.length);
const [currentDay, setCurrentDay] = useState(data.length || 1);

  const visibleData = data.slice(0, currentDay);

  // 🔥 Simple REAL AI logic (no backend needed)
  const getInsight = () => {
    if (visibleData.length === 0) return "";

    const latest = visibleData[visibleData.length - 1].score;

    if (latest > 70)
      return "⚠️ Burnout spike due to continuous high workload.";
    if (latest > 50)
      return "⚡ Workload increasing. Risk building.";
    if (latest > 30)
      return "🟡 Mild burnout forming. Take breaks.";
    return "✅ Stable productivity.";
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h2>🎬 Burnout Timeline Replay</h2>

      {/* 🎚️ Slider */}
      <input
        type="range"
        min="1"
        max={data.length}
        value={currentDay}
        onChange={(e) => setCurrentDay(Number(e.target.value))}
        style={{ width: "100%", margin: "20px 0" }}
      />

      {/* 📈 Chart */}
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={visibleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🤖 AI Insight */}
      <div style={{ marginTop: "15px" }}>
        <strong>AI Insight:</strong>
        <p>{getInsight()}</p>
      </div>
    </div>
  );
}