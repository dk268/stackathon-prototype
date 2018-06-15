import React from "react";
import { Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Login, Signup } from "./Navbar-LoginPane";
import { aCC } from "../reducers";
import { SWAP_TYPE } from "../reducers/forms";
import {
  NO_LOGIN_AUTH,
  LOADING_AUTH,
  LOGGED_IN_AUTH,
  ADMIN_AUTH,
  logout,
} from "../reducers/auth";
import Loading from "./Loading";

const Navbar = props => {
  let { isLogin, swapType } = props;
  switch (props.loginStatus) {
    case LOADING_AUTH:
      return (
        <div id={`${props.loginStatus}-switch-div`}>
          <MainLinks props={props} />
          <Loading name="navbar" />
        </div>
      );
    case NO_LOGIN_AUTH:
      return (
        <div id={`${props.loginStatus}-switch-div`}>
          <MainLinks props={props} />
          <LoginPane props={props} isLogin={isLogin} swapType={swapType} />
        </div>
      );
    case LOGGED_IN_AUTH:
      return (
        <div id={`${props.loginStatus}-switch-div`}>
          <MainLinks props={props} />
          <Link to={`/`} onClick={props.logout}>
            <small>log out:/</small>
          </Link>
        </div>
      );
    case ADMIN_AUTH:
      return <p>You're an admin!</p>;
    default:
      return <MainLinks props={props} />;
  }
};
const MainLinks = props => (
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
    <Link to="/charactersadd"> Add a character </Link>
  </div>
);

const LoginPane = props => (
  <div id="login-signup-form-div">
    {props.isLogin ? `Log in!` : `Sign up!`}
    <button
      type="button"
      id="login-signup-swap-button"
      onClick={props.swapType}>
      {props.isLogin ? `to signup` : `to login`}
    </button>
    {props.isLogin ? (
      <Login name="login" displayName="Log in!" />
    ) : (
      <Signup name="signup" displayName="Sign up!" />
    )}
  </div>
);

const mapStateToProps = state => ({
  loginStatus: state.auth.status,
  isLogin: state.forms.isLogin,
});

const mapDispatchToProps = dispatch => ({
  swapType: () => dispatch(aCC(SWAP_TYPE)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
