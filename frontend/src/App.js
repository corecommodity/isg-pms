import React, { useEffect, useState } from "react";
import logo from "./logo.png";


function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error connecting to FastAPI");
      });
  }, []);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "200px", marginBottom: "20px" }}
        />
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;