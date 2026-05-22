function AICoach({ typedText }) {
  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        alignItems: "flex-start",
        gap: "15px",
      }}
    >
      {/* 🤖 Avatar */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ff99, #00bfff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          boxShadow: "0 0 20px rgba(0,255,150,0.5)",
        }}
      >
        🤖
      </div>

      {/* 💬 Chat Bubble */}
      <div
        style={{
          background: "rgba(30,41,59,0.6)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "700px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 25px rgba(0,255,150,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.4)";
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>
          AI Burnout Coach
        </h3>

        <div
          style={{
            whiteSpace: "pre-line",
            lineHeight: "1.8",
            color: "#e2e8f0",
            fontFamily: "monospace",
          }}
        >
          {typedText}
          <span className="cursor">|</span>
        </div>
      </div>
    </div>
  );
}

export default AICoach;