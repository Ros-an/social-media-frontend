import React from "react";
import { useAuthContext } from "../../context-api/auth-context";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../index";
function Logout() {
  const { dispatch } = useAuthContext();
  return (
    <div
      className="navigation-item--link pointer-cursor"
      onClick={() => logoutUser(dispatch)}
    >
      <ExitToAppIcon />
      <p>Logout</p>
    </div>
  );
}

export default Logout;
