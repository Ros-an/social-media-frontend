import React, { useEffect } from "react";
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
  width: "3rem",
  height: "3rem",
};
function Loader() {
  return <div style={customStyleOne} className="lds-dual-ring"></div>;
}

function LoaderBig() {
  const { closeLoader } = useAuthContext();
  console.log("loader is on");
  useEffect(() => {
    setTimeout(() => closeLoader(), 2000);
  });
  return <div style={customStyleTwo} className="lds-dual-ring"></div>;
}

export { Loader, LoaderBig };
