import React from "react";
import { useGeneralContext } from "../../context-api/GeneralTaskProvider";
import { logoutUser } from "../index";
function Logout() {
  const { dispatch } = useGeneralContext();
  return (
    <div className="pointer-cursor" onClick={() => logoutUser(dispatch)}>
      <p className="navigation-item--logout">Logout</p>
    </div>
  );
}

export default Logout;
