import React from "react";
import bgImage from "./commodities3.jpg";
import logo from "./corecommlogo.jpg";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* White Top Strip */}
      <div
        style={{
          height: "80px",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: "80px",
          }}
        />
      </div>
    </div>
  );
}

export default App;