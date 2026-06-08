import React from "react";
import { FaFileExcel } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

function GridToolbar({ onFetch, onExport }) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #d9d9d9",
        padding: "4px",
        display: "flex",
        gap: "5px",
      }}
    >
      <button
        onClick={onFetch}
        style={{
          border: "1px solid #bfbfbf",
          fontSize: "12px",
          height: "24px",
          padding: "0 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <MdRefresh size={18} color="#2e7d32" />
        Fetch
      </button>

      <button
        onClick={onExport}
        style={{
          border: "1px solid #bfbfbf",
          fontSize: "12px",
          height: "24px",
          padding: "0 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <FaFileExcel size={14} color="#2e7d32" />
        Export
      </button>
    </div>
  );
}

export default GridToolbar;