import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "../public/index.css";

import store from "./store.js";
import Root from "./components/root.jsx";
// import "typeface-roboto";
import { LOGGED_IN_AUTH, ADMIN_AUTH } from "./reducers/auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme(darkBaseTheme);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <Root />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
