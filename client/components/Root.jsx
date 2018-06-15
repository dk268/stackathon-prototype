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
import EditForm from "./EditForm";

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
                path="/add/character"
                render={() => <CreateForm formName="addCharacter" />}
              />
              <Route
                exact
                path="/add/checkpoint"
                render={() => <CreateForm formName="addCheckpoint" />}
              />
              <Route
                exact
                path="/add/item"
                render={() => <CreateForm formName="addItem" />}
              />
              <Route
                exact
                path="/add/raid"
                render={() => <CreateForm formName="addRaid" />}
              />
              <Route
                exact
                path="/characters/edit/character/:charId"
                render={() => <EditForm formName="editCharacter" />}
              />
              <Route
                exact
                path="/checkpoints/edit/checkpoint/:checkpointId"
                render={() => <EditForm formName="editCheckpoint" />}
              />
              <Route
                exact
                path="/items/edit/item/:itemId"
                render={() => <EditForm formName="editItem" />}
              />
              <Route
                exact
                path="/raids/edit/raid/:raidId"
                render={() => <EditForm formName="editRaid" />}
              />
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
