import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import Avatar from "../../assets/avatar.jpg";
import HomeIcon from "@material-ui/icons/Home";
import Logout from "../../auth/components/Logout";
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
          <NavLink end to="/">
            <HomeIcon />
            <p>Home</p>
          </NavLink>
          <NavLink to="/users">
            <GroupIcon />
            <p>Users</p>
          </NavLink>
          <NavLink
            to={`/${userInfo().user.name}/${userInfo().user._id}`}
            activeStyle={{
              fontWeight: "500",
              color: "black",
            }}
          >
            <img src={Avatar} alt="avatar" />
            <p>{userInfo().user.name.split(" ")[0]}</p>
          </NavLink>
          <Logout />
        </div>
      )}
    </section>
  );
}

export default Navbar;
