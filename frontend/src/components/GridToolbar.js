import React, { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

function GridToolbar({ onFetch, onExport }) {
  const [fetchHover, setFetchHover] = useState(false);
  const [fetchPressed, setFetchPressed] = useState(false);

  const [exportHover, setExportHover] = useState(false);
  const [exportPressed, setExportPressed] = useState(false);

  const getButtonStyle = (hover, pressed) => ({
    border: "1px solid #c5c2c2",
    background: pressed
      ? "linear-gradient(to bottom, #d0d0d0 0%, #f5f5f5 100%)"
      : hover
      ? "linear-gradient(to bottom, #d0cdcd 0%, #dcdcdc 100%)"
      : "linear-gradient(to bottom, #ffffff 0%, #e6e6e6 100%)",
    fontSize: "11px",
    height: "24px",
    padding: "0 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    borderRadius: "2px",
    boxShadow: pressed
      ? "inset 1px 1px 3px rgba(0,0,0,0.2)"
      : "inset 0 1px 0 #ffffff",
    transform: pressed ? "translateY(1px)" : "translateY(0)",
    transition: "all 0.1s ease",
  });

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%)",

        padding: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <button
        onClick={onFetch}
        style={getButtonStyle(fetchHover, fetchPressed)}
        onMouseEnter={() => setFetchHover(true)}
        onMouseLeave={() => {
          setFetchHover(false);
          setFetchPressed(false);
        }}
        onMouseDown={() => setFetchPressed(true)}
        onMouseUp={() => setFetchPressed(false)}
      >
        <MdRefresh size={18} color="#2e7d32" />
        Fetch
      </button>

      <button
        onClick={onExport}
        style={getButtonStyle(exportHover, exportPressed)}
        onMouseEnter={() => setExportHover(true)}
        onMouseLeave={() => {
          setExportHover(false);
          setExportPressed(false);
        }}
        onMouseDown={() => setExportPressed(true)}
        onMouseUp={() => setExportPressed(false)}
      >
        <FaFileExcel size={14} color="#2e7d32" />
        Export
      </button>
    </div>
  );
}

export default GridToolbar;