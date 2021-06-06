import React, { useEffect, useState } from "react";
import Authenticate from "./users/pages/Authenticate";
import { isAuthenticated } from "./utils/authrelated";
import { Routes, Route, Navigate } from "react-router-dom";

function Home() {
  const [flowToAuth, setFlowToAuth] = useState(false);
  useEffect(() => {
    const tokenCheck = isAuthenticated();
    if (!tokenCheck) {
      setFlowToAuth(true);
    }
  }, []);
  if (flowToAuth) {
    return <Navigate to="/authenticate" />;
  }
  return <div>roshan</div>;
}
function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default Routing;
