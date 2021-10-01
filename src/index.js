import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GeneralTaskProvider } from "./context-api/GeneralTaskProvider";
import { PostProvider } from "./context-api/PostProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GeneralTaskProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </GeneralTaskProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
