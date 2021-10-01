import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import Avatar from "../../assets/avatar.jpg";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HomeIcon from "@material-ui/icons/Home";
import DropDown from "./DropDown";
import GroupIcon from "@material-ui/icons/Group";
function Navbar() {
  let toggle = false;
  if (isAuthenticated()) {
    toggle = true;
  }
  return (
    <section className="navigation">
      <NavLink
        className="logo"
        to={toggle ? "/" : "/authenticate"}
        style={{ cursor: !toggle && "auto" }}
      >
        Socialize
      </NavLink>
      {toggle && (
        <div className="navigation-item">
          <NavLink className="link" end to="/">
            <HomeIcon />
            <p>Home</p>
          </NavLink>
          <NavLink className="link" to="/users">
            <GroupIcon />
            <p>Users</p>
          </NavLink>
          <NavLink className="link" to="/notification">
            <NotificationsIcon />
            <p>Notifications</p>
          </NavLink>
          <div className="navigation-item--user">
            <img
              src={`${process.env.REACT_APP_API_URL}/user/photo/${
                userInfo().user._id
              }`}
              onError={(i) => (i.target.src = `${Avatar}`)}
              alt="avatar"
            />
            <div className="account">
              <span>Me</span>
              <DropDown />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Navbar;
