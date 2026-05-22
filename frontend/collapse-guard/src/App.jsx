// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Settings from "./pages/Settings";
// function Home() {
//   const loginWithGithub = () => {
//     window.location.href = "http://127.0.0.1:8000/login";
//   };

//   return (
//     <div style={{ padding: "100px", color: "white" }}>
//       <h1>CollapseGuard </h1>
//       <button onClick={loginWithGithub}>
//         Login with GitHub
//       </button>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/settings" element={<Settings />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;












// import logo from "./assets/logo.png"; // put your logo inside src/assets/logo.png

// function Home() {
//   const loginWithGithub = () => {
//     window.location.href = "http://127.0.0.1:8000/login";
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <img src={logo} alt="CollapseGuard Logo" style={styles.logo} />

//         <h1 style={styles.title}>
//           Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
//         </h1>

//         <p style={styles.subtitle}>
//           AI-powered Founder Burnout Detection Platform
//         </p>

//         <button style={styles.button} onClick={loginWithGithub}>
//           🚀 Login with GitHub
//         </button>

//         <p style={styles.footer}>
//           Protect your vision. Prevent founder collapse.
//         </p>
//       </div>
//     </div>
//   );
// }
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/settings" element={<Settings />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//     fontFamily: "Segoe UI, sans-serif",
//   },
//   card: {
//     textAlign: "center",
//     padding: "50px",
//     backgroundColor: "rgba(255,255,255,0.05)",
//     borderRadius: "20px",
//     backdropFilter: "blur(10px)",
//     boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//     width: "400px",
//   },
//   logo: {
//     width: "120px",
//     marginBottom: "20px",
//   },
//   title: {
//     fontSize: "36px",
//     color: "white",
//     marginBottom: "10px",
//   },
//   subtitle: {
//     color: "#ccc",
//     marginBottom: "30px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "14px 30px",
//     fontSize: "16px",
//     borderRadius: "30px",
//     border: "none",
//     cursor: "pointer",
//     background: "linear-gradient(45deg, #FF8C00, #FFA500)",
//     color: "white",
//     fontWeight: "bold",
//     transition: "0.3s",
//   },
//   footer: {
//     marginTop: "25px",
//     fontSize: "12px",
//     color: "#aaa",
//   },
// };
// export default App;


// // };

// // export default App;













import logo from "./assets/logo.png";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AIChat from "./components/AIChat";
import { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
function Home() {
  const loginWithGithub = () => {
    window.location.href = "http://127.0.0.1:8000/login";
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="CollapseGuard Logo" style={styles.logo} />

        <h1 style={styles.title}>
          Collapse<span style={{ color: "#FF8C00" }}>Guard</span>
        </h1>

        <p style={styles.subtitle}>
          AI-powered Founder Burnout Detection Platform
        </p>

        <button style={styles.button} onClick={loginWithGithub}>
           Login with GitHub
        </button>

        <p style={styles.footer}>
          Protect your vision. Prevent founder collapse.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const logout = async () => {
  await signOut(auth);
};
const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);
  useEffect(() => {
  const vortex = document.querySelector(".vortex-bg");

  const handleMouseMove = (e) => {
    if (!vortex) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

vortex.style.transform =
  `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
  return (
   <div className="app-wrapper">
   
<div className="vortex-bg">
  <div className="vortex-core"></div>
  <div className="vortex-ring ring1"></div>
  <div className="vortex-ring ring2"></div>
  <div className="vortex-ring ring3"></div>
</div>

    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/dashboard"
  element={
    <>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          background: "#ff4d4d",
          color: "white",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Logout
      </button>

      <Dashboard />
    </>
  }
/>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
    <AIChat /> 
   </div>
  );
}


const styles = {
  // container: {
  //   height: "100vh",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  //   fontFamily: "Segoe UI, sans-serif",
  // },
container: {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background: "transparent",

  fontFamily: "Segoe UI, sans-serif",

  overflow: "hidden",

  position: "relative",
  zIndex: 2,
},
  card: {
  textAlign: "center",
  padding: "50px",

  background: "rgba(10,15,35,0.45)",

  border: "1px solid rgba(0,255,255,0.15)",

  borderRadius: "24px",

  backdropFilter: "blur(12px)",

  boxShadow:
    "0 0 60px rgba(0,255,255,0.15), 0 20px 50px rgba(0,0,0,0.5)",

  width: "400px",

  position: "relative",
  zIndex: 5,
},
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "36px",
    color: "white",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#ccc",
    marginBottom: "30px",
    fontSize: "16px",
  },
  button: {
    padding: "14px 30px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(45deg, #FF8C00, #FFA500)",
    color: "white",
    fontWeight: "bold",
    transition: "0.3s",
  },
  footer: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#aaa",
  },
};
export default App;


// };

// export default App;
