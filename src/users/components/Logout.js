import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context-api/auth-context";

function Logout() {
  const { dispatch } = useAuthContext();
  const [redirect, setRedirect] = useState(false);

  const logoutUser = async (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      dispatch({ type: "SHOW_LOADER" });
      next();
    }
    try {
      const response = await axios.get("http://localhost:8080/signout");
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
  if (redirect) {
    console.log("should be logout");
    return <Navigate to="/authenticate" />;
  }
  return (
    <div
      className="navigation-item--link pointer-cursor"
      onClick={() =>
        logoutUser(() => {
          setRedirect(true);
        })
      }
    >
      Logout
    </div>
  );
}

export default Logout;
