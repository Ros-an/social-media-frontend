import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GeneralTaskProvider } from "./context-api/GeneralTaskProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GeneralTaskProvider>
        <App />
      </GeneralTaskProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
