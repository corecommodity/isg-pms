import React, { useState, useEffect, useRef } from "react";
import { FaFileExcel } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function Allocation2() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();
  const fetchData = () => {
    fetch("http://127.0.0.1:8000/allocation2")
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    gridRef.current.exportdata("xlsx", "account_value");
  };

  const source = {
    datatype: "array",
    localdata: tableData,

    datafields: [
      { name: "Client", type: "string" },
      { name: "NAV", type: "string" },
      { name: "Flows", type: "string" },
      { name: "Net NAV", type: "string" },
      { name: "Over/Under", type: "string" },
      { name: "Over/Under.1", type: "string" },
      { name: "Cmdty", type: "string" },
      { name: "Cmdty.1", type: "string" },
      { name: "Equity", type: "string" },
      { name: "Equity.1", type: "string" },
    ],
  };

  const dataAdapter = new window.jqx.dataAdapter(source);

  const columns = [
    { text: "Client", datafield: "Client", width: 100 },
    { text: "NAV", datafield: "NAV", width: 120, cellsalign: "right" },
    { text: "Flows", datafield: "Flows", width: 100, cellsalign: "right" },
    { text: "Net NAV", datafield: "Net NAV", width: 120, cellsalign: "right" },
    { text: "Over/Under %", datafield: "Over/Under", width: 100, cellsalign: "right" },
    { text: "Over/Under Value", datafield: "Over/Under.1", width: 130, cellsalign: "right" },
    { text: "Cmdty %", datafield: "Cmdty", width: 70, cellsalign: "right" },
    { text: "Cmdty Value", datafield: "Cmdty.1", width: 120, cellsalign: "right" },
    { text: "Equity %", datafield: "Equity", width: 70, cellsalign: "right" },
    { text: "Equity Value", datafield: "Equity.1", width: 120, cellsalign: "right" },
  ];

  return (
    <div
    
    >
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
        onClick={fetchData}
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
        <MdRefresh size={18} color="#2e7d32"/>
        Fetch
      </button>

      <button
        onClick={exportToExcel}
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
        <FaFileExcel size={14} color="2e7d32" />
        Export
      </button>
    </div>

      <JqxGrid
      ref={gridRef}
      width={"85%"}
      height={260}
      source={dataAdapter}
      columns={columns}
      pageable={true}
      sortable={true}
      filterable={true}
      columnsresize={true}
      rowsheight={24}
      columnsheight={28}
      altrows={true}
    />
    </div>
  );
}

export default Allocation2;