import React from "react";
import logo from "../corecommlogo.jpg";

function Header() {
  return (
    <div
      style={{
        height: "80px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        paddingLeft: "20px",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: "70px",
        }}
      />
    </div>
  );
}

export default Header;