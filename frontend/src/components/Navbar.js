import React, { useState } from "react";

function Navbar({ activeMenu, setActiveMenu }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menus = [
    {
      title: "Requirements",
      items: ["Commodity Index","Requirements History"]
    },
    {
      title: "Allocation",
      items: ["Account Value", "Cash", "Fixed Income", "Sectors (%)"],
    },
    {
      title: "Positions",
      items: ["Positions"],
    },
    {
      title: "Weights",
      items: ["Weights"],
    },
    {
      title: "Settings",
      items: ["Settings"],
    },
  ];

  return (
    <div
      style={{
        height: "50px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #dcdcdc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "35px",
      }}
    >
      {menus.map((menu, index) => (
        <div
          key={menu.title}
          onMouseEnter={() => setHoveredMenu(index)}
          onMouseLeave={() => setHoveredMenu(null)}
          onClick={() => setOpenMenu(openMenu === index ? null : index)}
          style={{
            position: "relative",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "12px",

              fontWeight:
                menu.items.includes(activeMenu)
                  ? "700"
                  : "600",

              textTransform: "uppercase",

              letterSpacing: "0.8px",

              color:
                menu.items.includes(activeMenu)
                  ? "#2e7d32"
                  : "#555",

              borderBottom:
                menu.items.includes(activeMenu)
                  ? "3px solid #2e7d32"
                  : hoveredMenu === index
                  ? "3px solid #615f5f"
                  : "3px solid transparent",

              paddingBottom: "12px",
            }}

          >
            {menu.title} ▼
          </span>

          {openMenu === index && (
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #dcdcdc",
                minWidth: "180px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
              }}
            >
              {menu.items.map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveMenu(item)}
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.replace("_", " ")}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Navbar;