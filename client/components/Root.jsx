import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllCharacters from "./AllCharacters.jsx";
import Navbar from "./Navbar";
import AllItems from "./AllItems";
import AllRaids from "./AllRaids";
import SingleCharacter from "./SingleCharacter";
import AllCheckpoints from "./AllCheckpoints";
import SingleItem from "./SingleItem";
import SingleRaid from "./SingleRaid";
import SingleCheckpoint from "./SingleCheckpoint";
import CreateForm from "./CreateForm";

class Root extends Component {
  render() {
    return (
      <div id="root-component-div">
        <Router>
          <div id="body-root">
            <Navbar />
            <Switch>
              <Route exact path="/characters" component={AllCharacters} />
              <Route exact path="/items" component={AllItems} />
              <Route exact path="/raids" component={AllRaids} />
              <Route exact path="/checkpoints" component={AllCheckpoints} />
              <Route
                exact
                path="/characters/:charId"
                component={SingleCharacter}
              />
              <Route exact path="/items/:itemId" component={SingleItem} />
              <Route exact path="/raids/:raidId" component={SingleRaid} />
              <Route
                exact
                path="/checkpoints/:checkpointId"
                component={SingleCheckpoint}
              />
              <Route
                exact
                path="/charactersadd"
                render={() => <CreateForm formName="addCharacter" />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

// Route exact path="/characters/edit/:charId"
// Route exact path="/checkpoints/add"
// Route exact path="/checkpoints/edit/:checkpointId"
// Route exact path="/items/add"
// Route exact path="/items/edit/:itemId"
// Route exact path="/raids/add"
// Route exact path="/raids/edit/:raidId"

export default connect(
  null,
  null
)(Root);
