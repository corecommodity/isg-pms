import React, { useState, useEffect, useRef } from "react";
import GridToolbar from "../../components/GridToolbar";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";

import "jqwidgets-scripts/jqwidgets/styles/jqx.classic.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function FixedIncome() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = () => {
    fetch(`${API_URL}/fixed_income`)
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    gridRef.current.exportdata("xlsx", "fixed_income");
  };

  const source = {
    datatype: "array",
    localdata: tableData,

    datafields: [
      { name: "Client", type: "string" },

      { name: "Notes", type: "number" },
      { name: "Notespct", type: "string" },

      { name: "TIPS", type: "number" },
      { name: "TIPSpct", type: "string" },

      { name: "Tbills", type: "number" },
      { name: "Tbillspct", type: "number" },

      { name: "Total", type: "number" },
      { name: "Total(%)", type: "number" },

      { name: "Funding", type: "number" }
    ]
  };

  const dataAdapter = new window.jqx.dataAdapter(source);

  const columns = [
    { text: "Client", datafield: "Client", width: 100 },

    { text: "Notes", datafield: "Notes", width: 120 },
    { text: "Notes %", datafield: "Notespct", width: 70, cellsformat: "p1" },

    { text: "TIPS", datafield: "TIPS", width: 120 },
    { text: "TIPS %", datafield: "TIPSpct", width: 70, cellsformat: "p1" },

    { text: "Tbills", datafield: "Tbills", width: 120 },
    { text: "Tbills %", datafield: "Tbillspct", width: 70, cellsformat: "p1" },

    { text: "Total", datafield: "Total", width: 120 },
    { text: "Total %", datafield: "Total(%)", width: 70, cellsformat: "p1" },

    { text: "Funding", datafield: "Funding", width: 100, cellsformat: "p1" }
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

export default FixedIncome;