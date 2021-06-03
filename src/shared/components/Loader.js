import React from "react";
import "./Loader.css";

const customStyle = {
  background: "transparent",
  display: "inline-block",
  width: "1.25em",
  height: "1.25em",
};
function Loader() {
  return <div style={customStyle} className="lds-dual-ring"></div>;
}

export default Loader;
