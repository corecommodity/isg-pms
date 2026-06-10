import React, { useState, useEffect, useRef } from "react";
import GridToolbar from "../../components/GridToolbar";
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JSZip from "jszip";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/jqxdata.export";
import "jqwidgets-scripts/jqwidgets/jqxexport";

window.JSZip = JSZip;

function CommodityIndex() {
  const [tableData, setTableData] = useState([]);
  const gridRef = useRef();

  const fetchData = () => {
    fetch("http://127.0.0.1:8541/commodity_index")
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    gridRef.current.exportdata("xlsx", "commodity_index");
  };

  const source = {
    datatype: "array",
    localdata: tableData,
    datafields: [
      { name: "tradedate", type: "string" },
      { name: "runId", type: "number" },
      { name: "indexId", type: "number" },
      { name: "componentId", type: "number" },
      { name: "bbsettlments", type: "number" },
      { name: "security", type: "string" },
      { name: "indexreturn", type: "number" },
      { name: "value", type: "number" },
      { name: "subindexValue", type: "number" },
      { name: "indexname", type: "string" },
      { name: "id", type: "number" },
      { name: "mcode1", type: "string" },
      { name: "mcode2", type: "string" },
      { name: "mcode3", type: "string" },
      { name: "mcode4", type: "string" },
      { name: "nextdaymcode1", type: "string" },
      { name: "nextdaymcode2", type: "string" },
      { name: "nextdaymcode3", type: "string" },
      { name: "nextdaymcode4", type: "string" },
      { name: "weight1", type: "number" },
      { name: "weight2", type: "number" },
      { name: "weight3", type: "number" },
      { name: "weight4", type: "number" },
      { name: "position1", type: "number" },
      { name: "position2", type: "number" },
      { name: "position3", type: "number" },
      { name: "position4", type: "number" },
      { name: "nextdayposition1", type: "number" },
      { name: "nextdayposition2", type: "number" },
      { name: "nextdayposition3", type: "number" },
      { name: "nextdayposition4", type: "number" },
      { name: "nextdayweight1", type: "number" },
      { name: "nextdayweight2", type: "number" },
      { name: "nextdayweight3", type: "number" },
      { name: "nextdayweight4", type: "number" },
      { name: "roll1", type: "number" },
      { name: "roll2", type: "number" },
      { name: "roll3", type: "number" },
      { name: "roll4", type: "number" },
      { name: "settlm1", type: "number" },
      { name: "settlm2", type: "number" },
      { name: "settlm3", type: "number" },
      { name: "settlm4", type: "number" },
      { name: "multiplyer", type: "number" },
      { name: "nextdayroll1", type: "number" },
      { name: "nextdayroll2", type: "number" },
      { name: "nextdayroll3", type: "number" },
      { name: "nextdayroll4", type: "number" },
      { name: "indexnameref", type: "string" },
      { name: "indexname", type: "string" },
      { name: "id", type: "number" }
    ]
  };

  const dataAdapter = new window.jqx.dataAdapter(source);

  const columns = [
    { text: "Trade Date", datafield: "tradedate", width: 120 },
    { text: "Run ID", datafield: "runId", width: 140 },
    { text: "Index ID", datafield: "indexId", width: 90 },
    { text: "Component ID", datafield: "componentId", width: 110 },
    { text: "BB Settlements", datafield: "bbsettlments", width: 120 },
    { text: "Security", datafield: "security", width: 120 },
    { text: "Index Return", datafield: "indexreturn", width: 100 },
    { text: "Value", datafield: "value", width: 100 },
    { text: "Sub Index Value", datafield: "subindexValue", width: 120 },

    { text: "MCode1", datafield: "mcode1", width: 90 },
    { text: "MCode2", datafield: "mcode2", width: 90 },
    { text: "MCode3", datafield: "mcode3", width: 90 },
    { text: "MCode4", datafield: "mcode4", width: 90 },

    { text: "Next MCode1", datafield: "nextdaymcode1", width: 110 },
    { text: "Next MCode2", datafield: "nextdaymcode2", width: 110 },
    { text: "Next MCode3", datafield: "nextdaymcode3", width: 110 },
    { text: "Next MCode4", datafield: "nextdaymcode4", width: 110 },

    { text: "Weight1", datafield: "weight1", width: 90 },
    { text: "Weight2", datafield: "weight2", width: 90 },
    { text: "Weight3", datafield: "weight3", width: 90 },
    { text: "Weight4", datafield: "weight4", width: 90 },

    { text: "Position1", datafield: "position1", width: 120 },
    { text: "Position2", datafield: "position2", width: 120 },
    { text: "Position3", datafield: "position3", width: 120 },
    { text: "Position4", datafield: "position4", width: 120 },

    { text: "Next Position1", datafield: "nextdayposition1", width: 120 },
    { text: "Next Position2", datafield: "nextdayposition2", width: 120 },
    { text: "Next Position3", datafield: "nextdayposition3", width: 120 },
    { text: "Next Position4", datafield: "nextdayposition4", width: 120 },

    { text: "Next Weight1", datafield: "nextdayweight1", width: 100 },
    { text: "Next Weight2", datafield: "nextdayweight2", width: 100 },
    { text: "Next Weight3", datafield: "nextdayweight3", width: 100 },
    { text: "Next Weight4", datafield: "nextdayweight4", width: 100 },

    { text: "Roll1", datafield: "roll1", width: 70 },
    { text: "Roll2", datafield: "roll2", width: 70 },
    { text: "Roll3", datafield: "roll3", width: 70 },
    { text: "Roll4", datafield: "roll4", width: 70 },

    { text: "Settlm1", datafield: "settlm1", width: 100 },
    { text: "Settlm2", datafield: "settlm2", width: 100 },
    { text: "Settlm3", datafield: "settlm3", width: 100 },
    { text: "Settlm4", datafield: "settlm4", width: 100 },

    { text: "Multiplier", datafield: "multiplyer", width: 120 },

    { text: "Next Roll1", datafield: "nextdayroll1", width: 90 },
    { text: "Next Roll2", datafield: "nextdayroll2", width: 90 },
    { text: "Next Roll3", datafield: "nextdayroll3", width: 90 },
    { text: "Next Roll4", datafield: "nextdayroll4", width: 90 },

    { text: "Index Ref", datafield: "indexnameref", width: 100 },
    { text: "Index Name", datafield: "indexname", width: 100 },
    { text: "ID", datafield: "id", width: 70 }
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
      width={"100%"}
      height={450}
      source={dataAdapter}
      columns={columns}
      pageable={true}
      sortable={true}
      filterable={true}
      columnsresize={true}
      altrows={true}
    />
    </div>
  );
}

export default CommodityIndex;