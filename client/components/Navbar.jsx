import React from "react";
import { Router, Link } from "react-router-dom";

const Navbar = props => (
  <div id="navbar-links-div">
    <Link to="/characters" className="navbar-link">
      All Characters
    </Link>
    <Link to="/items" className="navbar-link">
      All Items
    </Link>
    <Link to="/raids" className="navbar-link">
      All Raids
    </Link>
  </div>
);

export default Navbar;
