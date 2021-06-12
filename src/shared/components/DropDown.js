import { Link } from "react-router-dom";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { useState } from "react";
import Logout from "../../auth/components/Logout";
import { userInfo } from "../../utils/authrelated";

import "./DropDown.css";

function DropDown() {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="dropdown">
      <ArrowDropDownRoundedIcon
        onClick={() => setToggle(!toggle)}
        style={{ fontSize: "1rem", cursor: "pointer" }}
      />
      <div
        className={`dropdown-list ${toggle && "hide"}`}
        onClick={() => setToggle(!toggle)}
      >
        <Link to={`/${userInfo().user.name}/${userInfo().user._id}`}>
          Profile
        </Link>
        <Logout />
      </div>
      <div
        className={`background ${toggle && "hide"}`}
        onClick={() => setToggle(!toggle)}
      ></div>
    </div>
  );
}

export default DropDown;
