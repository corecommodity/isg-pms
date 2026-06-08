import React, { useState, useEffect, useRef } from "react";
import GridToolbar from "../../components/GridToolbar";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function Cash() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/cash")
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
    <div>
      <div style={{ marginBottom: "5px" }}>
        <GridToolbar
          onFetch={fetchData}
          onExport={exportToExcel}
        />
      </div>

      <JqxGrid
        ref={gridRef}
        width={"90%"}
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

export default Cash;