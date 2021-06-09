import React from "react";
import { useAuthContext } from "../../context-api/auth-context";
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
  width: "2.5em",
  height: "2.5em",
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

function ContentLoader() {
  return (
    <div className="content-loader">
      <div style={customStyleThree} className="lds-dual-ring"></div>
    </div>
  );
}

function LoaderBig() {
  const { closeLoader, loader } = useAuthContext();
  if (loader) {
    console.log("loader is on");
    setTimeout(() => closeLoader(), 1250);
  }
  return (
    <div className="loader-page">
      <div style={customStyleTwo} className="lds-dual-ring"></div>
    </div>
  );
}

export { Loader, LoaderBig, ContentLoader };
