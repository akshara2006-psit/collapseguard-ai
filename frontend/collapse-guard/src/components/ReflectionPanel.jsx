import { useState, useEffect } from "react";

export default function ReflectionPanel({ burnoutScore = 0 }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [insight, setInsight] = useState("");
  const [history, setHistory] = useState([]);

  // ✅ Load reflections
  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-reflections")
      .then((res) => res.json())
      .then((data) => {
      setHistory(Array.isArray(data) ? data : data.reflections || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Save reflection
  const saveReflection = async () => {
    try {
      await fetch("http://127.0.0.1:8000/save-reflection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mood: mood,
          text: note,
          burnout: burnoutScore,
        }),
      });

      alert("Reflection Saved 🧠");

      // refresh history
      fetch("http://127.0.0.1:8000/get-reflections")
        .then((res) => res.json())
       .then((data) => {
  setHistory(Array.isArray(data) ? data : data.reflections || []);
})

      // clear fields
      setNote("");
      setMood("");

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ AI Insight
  const generateInsight = () => {
    let response = "";

    if (mood === "Exhausted") {
      response =
        "High exhaustion patterns detected. Continuous overload may reduce cognitive performance.";
    } else if (mood === "Overwhelmed") {
      response =
        "Stress accumulation appears elevated. Recovery cycles may be shrinking.";
    } else if (mood === "Focused") {
      response =
        "Healthy engagement patterns detected. Current workload appears sustainable.";
    } else if (mood === "Stressed") {
      response =
        "Sustained stress indicators detected. Consider reducing late-night intensity.";
    } else if (mood === "Motivated") {
      response =
        "Motivation levels look strong. Maintain balance to avoid hidden fatigue.";
    } else {
      response =
        "Behavioral patterns are being monitored for burnout correlation.";
    }

    setInsight(response);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>🧠 Founder Reflection</h2>

      <p style={styles.label}>How are you feeling today?</p>

      {/* Mood Buttons */}
      <div style={styles.moods}>
        {[
          "Focused",
          "Overwhelmed",
          "Exhausted",
          "Motivated",
          "Stressed",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setMood(item)}
            style={{
              ...styles.moodBtn,
              background:
                mood === item
                  ? "rgba(0,255,255,0.2)"
                  : "rgba(255,255,255,0.05)",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Reflection Input */}
      <textarea
        placeholder="Write a quick reflection..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={styles.textarea}
      />

      {/* Generate Insight */}
      <button onClick={generateInsight} style={styles.button}>
        Generate Insight
      </button>

      {/* Save Reflection */}
      <button
        onClick={saveReflection}
        style={{
          marginTop: "10px",
          padding: "10px 18px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: "#00ff99",
          color: "#022c22",
          fontWeight: "600",
        }}
      >
        Save Reflection
      </button>

      {/* AI Insight */}
      {insight && (
        <div style={styles.insightBox}>
          <p>{insight}</p>
        </div>
      )}

      {/* Reflection Timeline */}
      <div style={{ marginTop: "30px" }}>
        <h3>🕒 Reflection Timeline</h3>

        {history.length === 0 && (
          <p style={{ color: "#94a3b8" }}>
            No reflections yet
          </p>
        )}

        {history.map((item, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>
              {item.mood}
            </h4>

            <p
              style={{
                color: "#e2e8f0",
                lineHeight: "1.5",
              }}
            >
              {item.text}
            </p>

            <small
              style={{
                color: "#94a3b8",
              }}
            >
              {item.date}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
  },

  heading: {
    marginBottom: "20px",
  },

  label: {
    marginBottom: "12px",
    color: "#cbd5e1",
  },

  moods: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  moodBtn: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    borderRadius: "12px",
    padding: "15px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    resize: "none",
    marginBottom: "20px",
    outline: "none",
  },

  button: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(45deg,#06b6d4,#3b82f6)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  insightBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(0,255,255,0.08)",
    border: "1px solid rgba(0,255,255,0.15)",
    color: "#dbeafe",
  },
};