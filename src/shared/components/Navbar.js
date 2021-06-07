import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated } from "../../utils/authrelated";
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
        style={{ cursor: !toggle && "default" }}
      >
        Socialize
      </NavLink>
      {toggle && (
        <div className="navigation-item">
          <NavLink end to="/">
            Home
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <Logout />
        </div>
      )}
    </section>
  );
}

export default Navbar;
