import React from "react";
import { useGeneralContext } from "../../context-api/GeneralTaskProvider";
import "./Loader.css";

const customStyleOne = {
  background: "transparent",
  display: "inline-block",
  width: "1.25em",
  height: "1.25em",
};
const customStyleTwo = {
  background: "transparent",
  display: "inline-block",
  width: "2.5rem",
  height: "2.5rem",
  transition: "all 1.2s linear",
};
const customStyleThree = {
  background: "transparent",
  display: "inline-block",
  width: "1.5em",
  height: "1.5em",
  transition: "all 1.2s linear",
};
function Loader() {
  return <div style={customStyleOne} className="lds-dual-ring"></div>;
}

function LoaderBig() {
  const { closeLoader, loader } = useGeneralContext();
  if (loader) {
    setTimeout(() => closeLoader(), 1250);
  }
  return (
    <div className="loader-page">
      <div style={customStyleTwo} className="lds-dual-ring"></div>
    </div>
  );
}

function ContentLoader() {
  return (
    <div className="content-loader">
      <div style={customStyleThree} className="lds-dual-ring"></div>
    </div>
  );
}

export { Loader, LoaderBig, ContentLoader };
