import React from "react";
import { Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Login, Signup } from "./Navbar-LoginPane";

const Navbar = props => {
  let isLogin = false;
  return (
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
      <div id="login-signup-form-div">
        <p>{isLogin ? `Log in!` : `Sign up!`}</p>
        <button
          type="button"
          id="login-signup-swap-button"
          onClick={() => (isLogin = !isLogin)}>
          {isLogin ? `to signup` : `to login`}
        </button>
        {isLogin ? (
          <Login name="login" displayName="Log in!" />
        ) : (
          <Signup name="signup" displayName="Sign up!" />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loginStatus: state.auth.status,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
