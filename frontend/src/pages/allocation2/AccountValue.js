import React, { useState, useEffect, useRef } from "react";
import GridToolbar from "../../components/GridToolbar";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function AccountValue() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();
  const fetchData = () => {
    fetch("http://127.0.0.1:8541/account_value")
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
      { name: "NAV", type: "number" },
      { name: "Flows", type: "number" },
      { name: "Net NAV", type: "number" },
      { name: "Over/Under", type: "number" },
      { name: "Over/Under.1", type: "string" },
      { name: "Cmdty", type: "number" },
      { name: "Cmdty.1", type: "string" },
      { name: "Equity", type: "string" },
      { name: "Equity.1", type: "string" },
    ],
  };

  const dataAdapter = new window.jqx.dataAdapter(source);

  const columns = [
    { text: "Client", datafield: "Client", width: 100},
    { text: "NAV", datafield: "NAV", width: 120, cellsalign: "right", cellsformat: "c0"},
    { text: "Flows", datafield: "Flows", width: 100, cellsalign: "right", cellsformat: "c0"},
    { text: "Net NAV", datafield: "Net NAV", width: 120, cellsalign: "right", cellsformat: "c0"},
    { text: "Over/Under %", datafield: "Over/Under", width: 100, cellsalign: "right", cellsformat: "p0" },
    { text: "Over/Under Value", datafield: "Over/Under.1", width: 130, cellsalign: "right" },
    { text: "Cmdty %", datafield: "Cmdty", width: 70, cellsalign: "right", cellsformat: "p0" },
    { text: "Cmdty Value", datafield: "Cmdty.1", width: 120, cellsalign: "right" },
    { text: "Equity %", datafield: "Equity", width: 70, cellsalign: "right" },
    { text: "Equity Value", datafield: "Equity.1", width: 120, cellsalign: "right" },
  ];

  return (
    <div
    
    >
    <GridToolbar
      onFetch={fetchData}
      onExport={exportToExcel}
    />

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

export default AccountValue;