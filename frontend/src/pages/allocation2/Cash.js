import React, { useState, useEffect, useRef } from "react";
import GridToolbar from "../../components/GridToolbar";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";

import "jqwidgets-scripts/jqwidgets/styles/jqx.classic.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function Cash() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchData = () => {
    fetch(`${API_URL}/cash`)
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();

  }, []);

  const exportToExcel = () => {
    gridRef.current.exportdata("xlsx", "cash");
  };

  const source = {
    datatype: "array",
    localdata: tableData,

    datafields: [
      { name: "Client", type: "string" },

      { name: "FundValue", type: "number" },
      { name: "FundPct", type: "string" },

      { name: "CaymanValue", type: "number" },
      { name: "CaymanPct", type: "string" },

      { name: "SwapValue", type: "number" },
      { name: "SwapPct", type: "string" },

      { name: "Total", type: "number" },
      { name: "TotalPct", type: "string" },

      { name: "0.1", type: "number" },
    ],
  };

  const dataAdapter = new window.jqx.dataAdapter(source);

  const columns = [
    {text: "Client", datafield: "Client", width: 100},
    {text: "Fund Value", datafield: "FundValue", width: 120, cellsalign: "right", cellsformat: "c0"},
    {text: "Fund %", datafield: "FundPct", width: 100, cellsalign: "right"},    
    {text: "Cayman Value", datafield: "CaymanValue", width: 120, cellsalign: "right", cellsformat: "c0"},
    {text: "Cayman %", datafield: "CaymanPct", width: 100, cellsalign: "right"},
    {text: "Swap Value", datafield: "SwapValue", width: 120, cellsalign: "right", cellsformat: "c0"},
    {text: "Swap %", datafield: "SwapPct", width: 100, cellsalign: "right"},
    {text: "Total Value", datafield: "Total", width: 120, cellsalign: "right", cellsformat: "c0"},
    {text: "Total %", datafield: "TotalPct", width: 100, cellsalign: "right"},
    {text: "10%", datafield: "0.1", width: 120, cellsalign: "right"}
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: "1100px",
          background: "#f5f5f5",
          border: "1px solid #d0d0d0",
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >
        <div style={{ marginBottom: "5px" }}>
          <GridToolbar
            onFetch={fetchData}
            onExport={exportToExcel}
          />
        </div>

        <JqxGrid
          ref={gridRef}
          width={"100%"}
          height={260}
          source={dataAdapter}
          columns={columns}
          pageable={true}
          sortable={true}
          filterable={true}
          columnsresize={true}
          rowsheight={20}
          columnsheight={22}
          altrows={true}
        />
      </div>
    </div>
  );
}

export default Cash;