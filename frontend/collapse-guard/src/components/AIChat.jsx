import { useState } from "react";

function AIChat({ burnoutScore, burnoutStatus }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I'm your AI assistant. Ask anything!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input ,
         burnout_score: burnoutScore,
  burnout_status: burnoutStatus
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "ai", text: data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "⚠️ Error talking to AI" }
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {/* <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          //background: "#00ff99",
          //padding: "15px",
          //borderRadius: "50%",
          //cursor: "pointer",
          //boxShadow: "0 0 20px rgba(0,255,150,0.5)",
          zIndex: 999
        }}
      >
        🤖
      </div> */}
      {/* <div
  onClick={() => setOpen(!open)}
  style={{
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "linear-gradient(135deg, #00ff99, #00bfff)",
    color: "black",
    padding: "14px 18px",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,255,150,0.4)",
    zIndex: 1000,
    fontWeight: "600",
    transition: "0.3s",
    animation: "pulse 2s infinite"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,150,0.7)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,255,150,0.4)";
  }}
>
  🤖 <span>AI Assistant</span>
</div> */}
<div
onClick={() => setOpen(!open)}
  style={{
    position: "fixed",
    bottom: "30px",
    // right: "30px",
  
right: "30px", // 👈 important (avoid sidebar overlap)
left: "auto",
zIndex: 9999,
    padding: "14px 22px",
    borderRadius: "50px",
    // background: "linear-gradient(135deg, #00ff99, #00bfff)",
    color: "black",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    // boxShadow: "0 0 25px rgba(0,255,150,0.6)",
    background: "linear-gradient(135deg, #393f46, #3e646c)",
boxShadow: "0 0 20px rgba(59,130,246,0.5)",
   
    fontSize: "16px"
  }}
>
  🤖 AI Assistant
</div>

      {/* Chat Box */}
      {open && (
        <div 
        // style={{
        //   position: "fixed",
        //   bottom: "90px",
        //   left: "240px",
        //   width: "320px",
        //   height: "420px",
        //   background: "#40537e",
        //   borderRadius: "15px",
        //   display: "flex",
        //   flexDirection: "column",
        //   overflow: "hidden",
        //   boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        //   zIndex: 9999
        // }}
        style={{
  position: "fixed",
  right: "30px",
  left:"auto",
  bottom: "90px",
  width: "320px",
  height: "420px",

  background: "rgba(15, 23, 42, 0.7)",   // dark glass
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",

  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",

  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  color: "white",

  display: "flex",
  flexDirection: "column",
  overflow: "hidden",

  zIndex: 99999
}}
        >
          
          {/* Header */}
          <div
          //  style={{
          //   padding: "10px",
          //   background: "#1e293b",
          //   textAlign: "center"
          // }}
          style={{
  padding: "14px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "600",
  color: "#38bdf8"
}}
          >
            AI Assistant
          </div>

          {/* Messages */}
          <div 
          // style={{
          //   flex: 1,
          //   padding: "10px",
          //   overflowY: "auto"
          // }}
          style={{
  background: "rgba(255,255,255,0.05)",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#e2e8f0",
  maxWidth: "85%",
  flex:1,
  overflowY:"auto",
 
}}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "10px"
              }}>
                <span style={{
                  background: msg.role === "user" ? "#386e76" : "#334155",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  display: "inline-block"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div 
          // style={{ display: "flex" }}
          style={{
  borderTop: "1px solid rgba(255,255,255,0.08)",
  padding: "10px",
  display: "flex",
  gap: "8px"
}}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // style={{ flex: 1, padding: "10px", border: "none" }}
              style={{
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.05)",
  color: "white"
}}
              placeholder="Ask anything..."
            />
            <button onClick={sendMessage} style={{
              padding: "10px",
              background: "#212a31",
              border: "none",
              cursor: "pointer"
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;