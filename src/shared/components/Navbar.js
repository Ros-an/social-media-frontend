import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import Logout from "../../auth/components/Logout";
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
          <NavLink to="/profile">
            <PersonIcon />
            <p>{userInfo().user.name}</p>
          </NavLink>
          <Logout />
        </div>
      )}
    </section>
  );
}

export default Navbar;
