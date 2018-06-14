import React, { Component } from "react";
import { connect } from "react-redux";
import { aCC } from "../reducers";
import { stat } from "fs";
import { getRaids } from "../reducers/allRaids";
import { getCharacters } from "../reducers/allCharacters";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { getItems } from "../reducers/allItems";
import Fields from "./Fields";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    switch (this.props.formName) {
      case addCharacter: {
        this.state = initialCharacterState;
        break;
      }
      case addCheckpoint: {
        this.state = initialCheckpointState;
        break;
      }
      case addItem: {
        this.state = initialItemState;
        break;
      }
      case addRaid: {
        this.state = initialRaidState;
        break;
      }
      default:
        this.state = {};
    }
  }
  componentDidMount = () => {
    this.props.getRaids();
    this.props.getCharacters();
    this.props.getCheckpoints();
    this.props.getItems();
  };
  render = () => {
    return <Fields props={this.props} formName={this.props.formName} />;
  };
}

const initialCharacterState = {
  characterName: "",
  dkp: 0,
  isAlt: false,
  isAltUnapproved: false,
  class: "",
  totalDKPSpent: 0,
  totalDKPEarned: 0,
  overflowDKP: 0,
  raids: [],
  checkpoints: [],
  items: [],
};

const initialCheckpointState = {
  checkpointName: "",
  checkpointDKP: 10,
  characters: [],
  items: [],
  raid: {},
};

const initialItemState = {
  itemName: "",
  itemDKPCost: 0,
  itemLinkUrl: "",
  itemSmallImageUrl: "",
  itemStatBlockUrl: "",
  character: {},
  raids: [],
  RaidAcquired: {},
};

const initialRaidState = {
  raidName: "",
  checkpoints: [],
  items: [],
  characters: [],
};

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
