import React from "react";
import { useAuthContext } from "../../context-api/auth-context";
import { logoutUser } from "../index";
function Logout() {
  const { dispatch } = useAuthContext();
  return (
    <div className="pointer-cursor" onClick={() => logoutUser(dispatch)}>
      <p className="navigation-item--logout">Logout</p>
    </div>
  );
}

export default Logout;
