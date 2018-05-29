import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "../server/public/index.css";

import store from "./store.js";
import Root from "./components/root.jsx";

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);
