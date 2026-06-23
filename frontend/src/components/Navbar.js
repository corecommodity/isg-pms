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
        height: "55px",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "100px",
        gap: "35px",
      }}
    >
      {menus.map((menu, index) => (
        <div
          key={menu.title}
          style={{
            position: "relative",
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
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              fontWeight: menu.items.includes(activeMenu) ? "700" : "500",
              color: menu.items.includes(activeMenu) ? "#2e7d32" : "#222",
              cursor: "pointer",
              padding: "18px 4px",
              borderBottom:
                menu.items.includes(activeMenu)
                  ? "2px solid #2e7d32"
                  : openMenu === index
                  ? "2px solid #666"
                  : "2px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            {menu.title}
          </div>

          {openMenu === index && (
            <div
              onMouseEnter={() => {
                if (closeTimeout.current) {
                  clearTimeout(closeTimeout.current);
                }
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setOpenMenu(null);
                }, 300);
              }}
              style={{
                position: "absolute",
                top: "55px",
                left: 0,
                backgroundColor: "#ffffff",
                borderRadius: "6px",
                minWidth: "200px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                zIndex: 1000,
                overflow: "hidden",
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
                    padding: "10px 14px",
                    fontSize: "12px",
                    fontFamily: "Poppins, sans-serif",
                    cursor: "pointer",
                    borderBottom: "1px solid #eeeeee",
                    backgroundColor:
                      activeMenu === item
                        ? "#f5f5f5"
                        : "#ffffff",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
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