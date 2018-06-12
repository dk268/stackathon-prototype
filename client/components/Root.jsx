import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import AllCharacters from "./AllCharacters.jsx";
import Navbar from "./Navbar";
import AllItems from "./AllItems";
import AllRaids from "./AllRaids";
import SingleCharacter from "./SingleCharacter";

class Root extends Component {
  render() {
    return (
      <div id="root-component-div">
        <h2 id="hello-world">Hi there from redux!!</h2>
        <Router>
          <div id="body-root">
            <Navbar />
            <Switch>
              <Route exact path="/characters" component={AllCharacters} />
              <Route exact path="/items" component={AllItems} />
              <Route exact path="/raids" component={AllRaids} />
              <Route
                exact
                path="/characters/:charId"
                component={SingleCharacter}
              />
              {/*<Route exact path="/items/:itemId" component={SingleItem} />
          <Route exact path="/raids/:raidId" component={SingleRaid} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Root);
