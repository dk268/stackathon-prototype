import React from "react";
import { Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, login as signup } from "../reducers/auth";

// const LoginPane = props => (
//   <form
// )

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
    <Link to="/checkpoints" className="navbar-link">
      All Checkpoints
    </Link>
  </div>
);

const mapStateToProps = state => ({
  loginStatus: state.auth.status,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
