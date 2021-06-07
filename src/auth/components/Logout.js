import axios from "axios";
import React from "react";
import { useAuthContext } from "../../context-api/auth-context";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
function Logout() {
  const { dispatch } = useAuthContext();

  const logoutUser = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      dispatch({ type: "SHOW_LOADER" });
    }
    try {
      const response = await axios.get("http://localhost:8080/signout");
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div
      className="navigation-item--link pointer-cursor"
      onClick={() => logoutUser()}
    >
      <ExitToAppIcon />
      <p>Log out</p>
    </div>
  );
}

export default Logout;
