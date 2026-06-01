import React, { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Allocation2 from "./pages/Allocation2";
import Requirements1 from "./pages/Requirements1";
import Positions from "./pages/Positions";
import Weights from "./pages/Weights";
import Settings from "./pages/Settings";

import bgImage from "./commodities3.jpg";

function App() {
  const [activeMenu, setActiveMenu] = useState("Allocation2");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Header />

      <Navbar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div style={{ padding: "20px" }}>
        {activeMenu === "Requirements_1" && <Requirements1 />}

        {activeMenu === "Allocation2" && <Allocation2 />}

        {activeMenu === "Positions" && <Positions />}

        {activeMenu === "Weights" && <Weights />}

        {activeMenu === "Settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;