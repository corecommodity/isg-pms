import React, { useState, useRef } from "react";

function Navbar({ activeMenu, setActiveMenu }) {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimeout = useRef(null);
  const menus = [
    {
      title: "Requirements",
      items: ["Commodity Index", "Requirements History"],
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
        height: "40px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #d0d0d0",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "100px",
        gap: "25px"
      }}
    >
      {menus.map((menu, index) => (
        <div
          key={menu.title}
          style={{
            position: "relative"
          }}
          onMouseEnter={() => {
            if (closeTimeout.current) {
              clearTimeout(closeTimeout.current);
            }
            setOpenMenu(index);
          }}
          onMouseLeave={() => {
            closeTimeout.current = setTimeout(() => {
              setOpenMenu(null);
            }, 300);
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color:
                menu.items.includes(activeMenu)
                  ? "#2e7d32"
                  : "#222",
              cursor: "pointer",
              padding: "8px 4px",
              borderBottom:
                menu.items.includes(activeMenu)
                  ? "2px solid #2e7d32"
                  : openMenu === index
                  ? "2px solid #666"
                  : "2px solid transparent",
            }}
          >
            {menu.title}
          </div>

          {openMenu === index && (
            <div
              style={{
                position: "absolute",
                top: "38px",
                left: 0,
                backgroundColor: "#ffffff",
                border: "1px solid #cfcfcf",
                minWidth: "180px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                zIndex: 1000,
              }}
            >
              {menu.items.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setActiveMenu(item);
                    setOpenMenu(null);
                  }}
                  style={{
                    padding: "8px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eeeeee",
                    backgroundColor:
                      activeMenu === item
                        ? "#f5f5f5"
                        : "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      activeMenu === item
                        ? "#f5f5f5"
                        : "#ffffff";
                  }}
                >
                  {item}
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