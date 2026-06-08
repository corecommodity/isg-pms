import React, { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import AccountValue from "./pages/allocation2/AccountValue";
import Cash from "./pages/allocation2/Cash";
import FixedIncome from "./pages/allocation2/FixedIncome";
import CommodityIndex from "./pages/requirements1/CommodityIndex";
import Positions from "./pages/Positions";
import Weights from "./pages/Weights";
import Settings from "./pages/Settings";

import bgImage from "./commodities3.jpg";

function App() {
  const [activeMenu, setActiveMenu] = useState("");

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
        {activeMenu && (
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#2e7d32",
            }}
          >
            {activeMenu}
          </div>
        )}
        
        {activeMenu === "Commodity Index" && <CommodityIndex />}

        {/* Allocation */}
        {activeMenu === "Account Value" && <AccountValue />}
        {activeMenu === "Cash" && <Cash />}
        {activeMenu === "Fixed Income" && <FixedIncome />}

        {activeMenu === "Positions" && <Positions />}

        {activeMenu === "Weights" && <Weights />}

        {activeMenu === "Settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;