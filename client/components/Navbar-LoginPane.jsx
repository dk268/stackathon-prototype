import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, signup } from "../reducers/auth";
import { withRouter } from "react-router-dom";
import {
  WRITE_LOGIN_EMAIL,
  WRITE_LOGIN_PASSWORD,
  WRITE_SIGNUP_EMAIL,
  WRITE_SIGNUP_PASSWORD,
  CLEAR_AUTH_FIELDS,
  SWAP_TYPE,
} from "../reducers/forms";
import { aCC } from "../reducers";

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {
    name,
    displayName,
    handleSubmit,
    handleChange,
    error,
    emailValue,
    passwordValue,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            value={emailValue}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            value={passwordValue}
          />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    emailValue: state.forms.loginEmail,
    passwordValue: state.forms.loginPassword,
    error: state.auth.error,
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    emailValue: state.forms.signupEmail,
    passwordValue: state.forms.signupPassword,
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(aCC(CLEAR_AUTH_FIELDS));
      dispatch(login({ email, password }, formName));
    },
    handleChange: e => {
      console.log("called", ownProps.name);
      console.dir(e.target);
      if (ownProps.name === "login") {
        if (e.target.name === "email")
          dispatch(aCC(WRITE_LOGIN_EMAIL, e.target.value));
        if (e.target.name === "password")
          dispatch(aCC(WRITE_LOGIN_PASSWORD, e.target.value));
      }
      if (ownProps.name === "signup") {
        if (e.target.name === "email")
          dispatch(aCC(WRITE_SIGNUP_EMAIL, e.target.value));
        if (e.target.name === "password")
          dispatch(aCC(WRITE_SIGNUP_PASSWORD, e.target.value));
      }
    },
    swapType: () => dispatch(aCC(SWAP_TYPE)),
  };
};
export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);

export const Signup = withRouter(
  connect(
    mapSignup,
    mapDispatch
  )(AuthForm)
);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
