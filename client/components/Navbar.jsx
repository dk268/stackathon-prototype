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
  ERROR_AUTH,
} from "../reducers/auth";
import Loading from "./Loading";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { Toolbar, Button } from "@material-ui/core";
import { AppBar, IconButton } from "material-ui";

const styles = {
  // root: {
  //   flexGrow: 1,
  // },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navbar = props => {
  let { isLogin, swapType, classes } = props;
  switch (props.loginStatus) {
    case LOADING_AUTH:
      return (
        <AppBar
          id={`${props.loginStatus}-switch-AppBar`}
          className="navbar-appbar"
        >
          <Toolbar className="toolbar">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <h1 className="navbar-title">AODKP</h1>
            </Link>
            <MainLinks props={props} />
            <Loading name="navbar" />
            <button className="login-button" color="inherit">
              Login
            </button>
          </Toolbar>
        </AppBar>
      );
    case NO_LOGIN_AUTH:
      return (
        <AppBar id={`${props.loginStatus}-switch-AppBar`}>
          <MainLinks props={props} />
          <LoginPane props={props} isLogin={isLogin} swapType={swapType} />
        </AppBar>
      );
    case LOGGED_IN_AUTH:
      return (
        <AppBar
          id={`${props.loginStatus}-switch-AppBar`}
          className="navbar-appbar"
          position="static"
        >
          <Toolbar className="toolbar">
            <Link to="/">
              <h1 className="navbar-title">AODKP</h1>
            </Link>
          </Toolbar>
          <MainLinks props={props} className={classes.flex} />
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <Link to={`/users/logout`} onClick={props.logout}>
            <button className="login-button">log out:/</button>
          </Link>
        </AppBar>
      );
    case ADMIN_AUTH:
      return (
        <Link to={`/users/logout`} onClick={props.logout}>
          <small>You're an admin!! Log out?</small>
        </Link>
      );
    case ERROR_AUTH:
      return (
        <AppBar id={`${props.loginStatus}-switch-AppBar`}>
          <MainLinks props={props} />
          <LoginPane props={props} isLogin={isLogin} swapType={swapType} />
        </AppBar>
      );
    default:
      return <MainLinks props={props} />;
  }
};
const MainLinks = props => (
  <div id="navbar-links-div">
    <Link to="/characters" className="navbar-link">
      <button className="navbar-link-button">All Characters</button>
    </Link>
    <Link to="/items" className="navbar-link">
      <button className="navbar-link-button">All Items</button>
    </Link>
    <Link to="/raids" className="navbar-link">
      <button className="navbar-link-button">All Raids</button>
    </Link>
    <Link to="/checkpoints" className="navbar-link">
      <button className="navbar-link-button">All Checkpoints</button>
    </Link>
    <br />
    <Link to="/add/character" className="navbar-link">
      {" "}
      <button className="navbar-link-button">Add a character </button>
    </Link>
    <Link to="/add/checkpoint" className="navbar-link">
      {" "}
      <button className="navbar-link-button">Add a checkpoint </button>
    </Link>
    <Link to="/add/item" className="navbar-link">
      {" "}
      <button className="navbar-link-button">Add an item </button>
    </Link>
    <Link to="/add/raid" className="navbar-link">
      {" "}
      <button className="navbar-link-button">Add a raid </button>
    </Link>
    <br />
    <Link to="/edit/" className="navbar-link">
      {" "}
      <button className="navbar-link-button"> EDIT THE THINGS </button>
    </Link>
  </div>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LoginPane = props => (
  <div id="login-signup-form-div">
    {props.isLogin ? `Log in!` : `Sign up!`}
    <button
      type="button"
      id="login-signup-swap-button"
      onClick={props.swapType}
    >
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

const mapDispatchToProps = (dispatch, props) => ({
  swapType: () => dispatch(aCC(SWAP_TYPE)),
  logout: () => {
    // props.history.push("/");
    dispatch(logout());
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
