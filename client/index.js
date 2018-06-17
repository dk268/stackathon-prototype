import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "../public/index.css";
import store from "./store.js";
import Root from "./components/root.jsx";
import "typeface-roboto";
import { LOGGED_IN_AUTH, ADMIN_AUTH } from "./reducers/auth";

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);

export const isAdmin = () =>
  store.getState().auth.status === LOGGED_IN_AUTH ||
  store.getState().auth.status === ADMIN_AUTH;
