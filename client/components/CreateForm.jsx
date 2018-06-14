import React, { Component } from "react";
import { connect } from "react-redux";
import { aCC } from "../reducers";
import { stat } from "fs";
import { getRaids } from "../reducers/allRaids";
import { getCharacters } from "../reducers/allCharacters";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { getItems } from "../reducers/allItems";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

const mapStateToProps = state => ({
  raids: state.allRaids.collection,
  characters: state.allCharacters.collection,
  items: state.allItems.collection,
  checkpoints: state.allCheckpoints.collection,
});

const mapDispatchToProps = {
  getRaids,
  getCharacters,
  getCheckpoints,
  getItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);
