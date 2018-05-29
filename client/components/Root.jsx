import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

class Root extends Component {
  render() {
    return <h2>Hi there from redux!!</h2>;
  }
}

export default connect(null, null)(Root);
