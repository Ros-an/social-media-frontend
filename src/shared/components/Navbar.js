import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../../context-api/auth-context";

function Navbar() {
  const { authorised } = useAuthContext();
  let toggle = authorised;
  if (authorised) {
    localStorage.setItem("linkAccess", true);
  } else {
    toggle = JSON.parse(localStorage.getItem("linkAccess"));
    console.log("toggle", toggle);
  }
  return (
    <section className="navigation">
      <NavLink to={toggle ? "/" : "/authenticate"} className="logo">
        Socialize
      </NavLink>
      {toggle && (
        <div className="navigation-item">
          <NavLink end to="/">
            Home
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/authenticate">Logout</NavLink>
        </div>
      )}
    </section>
  );
}

export default Navbar;
