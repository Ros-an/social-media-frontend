import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <section className="navigation">
      <NavLink to="/" className="logo">
        Socialize
      </NavLink>
      <div className="navigation-item">
        <NavLink end to="/">
          Home
        </NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/authenticate">Logout</NavLink>
      </div>
    </section>
  );
}

export default Navbar;
