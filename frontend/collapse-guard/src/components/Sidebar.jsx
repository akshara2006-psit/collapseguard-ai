// import logo from "../assets/logo.png";
// import AIChat from "../components/AIChat";
// export default function Sidebar({ setView }) {
//   return (
//     <div
//       style={{
//         width: "240px",
//         background: "rgba(17,24,39,0.7)",
//         backdropFilter: "blur(15px)",
//         borderRight: "1px solid rgba(255,255,255,0.08)",
//         padding: "30px 20px",
//         height: "100vh",
//         position: "sticky",
//         top: 0,
//       }}
//     >
//       <div style={{ textAlign: "center" }}>
//         <img src={logo} alt="logo" style={{ width: "70px" }} />

//         <h2 style={{ marginTop: "10px" }}>
//           Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
//         </h2>
//         {/* <button
//   onClick={() => setView("timeline")}
//   style={{
//     marginTop: "15px",
//     padding: "10px",
//     borderRadius: "10px",
//     background: "#1e293b",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     width: "100%"
//   }}
// >
//   🎬 Timeline
// </button> */}
// <button
//   onClick={() => setView("dashboard")}
//   style={{
//     marginTop: "10px",
//     padding: "10px",
//     borderRadius: "10px",
//        background: "#2d3542",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     width: "100%"
//   }}
// >
//    Dashboard
// </button>
// <button
//   onClick={() => setView("simulation")}
//   style={{
//     marginTop: "10px",
//     padding: "10px",
//     borderRadius: "10px",
//     background: "#2d3542",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     width: "100%"
//   }}
// >
//   YOUR'S DIGITAL TWIN
// </button>
// <div style={{ marginTop: "30px" }}>
//   {/* <AIChat /> */}
// </div>
//       </div>
//     </div>
//   );
// }

import logo from "../assets/logo.png";
import ReflectionPanel from "../components/ReflectionPanel";
export default function Sidebar({ setView }) {
  return (
    <div
      style={{
        width: "240px",
        padding: "30px 20px",
        height: "100vh",
        position: "sticky",
        top: 0,

        /* REMOVE SIDEBAR BOX */
        background: "transparent",
        borderRight: "none",
        backdropFilter: "none",

        /* ALIGN CONTENT */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* LOGO */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: "75px",
          marginBottom: "15px",
        }}
      />

      {/* TITLE */}
      <h2
        style={{
          color: "white",
          marginBottom: "35px",
          fontWeight: "700",
        }}
      >
        Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
      </h2>

      {/* DASHBOARD BUTTON */}
      <button
        onClick={() => setView("dashboard")}
        style={buttonStyle}
      >
        Dashboard
      </button>

      {/* DIGITAL TWIN BUTTON */}
      <button
        onClick={() => setView("simulation")}
        style={buttonStyle}
      >
        YOUR DIGITAL TWIN
      </button>
      <button
  onClick={() => setView("reflection")}
 style={buttonStyle}
>
  Founder Reflection
</button>
    </div>
  );
}

/* BUTTON STYLE */
const buttonStyle = {
  marginTop: "12px",
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
  width: "100%",
  fontWeight: "600",
  fontSize: "15px",
  backdropFilter: "blur(10px)",
  transition: "0.3s ease",
};