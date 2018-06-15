import React, { Component } from "react";
import { getRaids, addRaid } from "../reducers/allRaids";
import { getCharacters, addCharacter } from "../reducers/allCharacters";
import { getCheckpoints, addCheckpoint } from "../reducers/allCheckpoints";
import { getItems, addItem } from "../reducers/allItems";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADED, aCC } from "../reducers";
import Loading from "./Loading";
import Error from "./Error";
import { FormCharacter } from "./FormCharacter";
import { FormCheckpoint } from "./FormCheckpoint";
import {
  initialAddCharacterState,
  initialAddCheckpointState,
  initialAddItemState,
  initialAddRaidState,
} from "./aux/initialStates";
import { FormItem } from "./FormItem";
import { FormRaid } from "./FormRaid";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    switch (this.props.formName) {
      case `addCharacter`: {
        this.state = initialAddCharacterState;
        break;
      }
      case `addCheckpoint`: {
        this.state = initialAddCheckpointState;
        break;
      }
      case `addItem`: {
        this.state = initialAddItemState;
        break;
      }
      case `addRaid`: {
        this.state = initialAddRaidState;
        break;
      }
      default:
        this.state = {};
    }
  }
  componentDidMount = () => {
    this.setState({
      ...initialAddCharacterState,
      ...initialAddCheckpointState,
      ...initialAddItemState,
      ...initialAddRaidState,
    });
    if (this.props.allCharacters.status != LOADED) this.props.getCharacters();
    if (this.props.allCheckpoints.status != LOADED) this.props.getCheckpoints();
    if (this.props.allItems.status != LOADED) this.props.getItems();
    if (this.props.allRaids.status != LOADED) this.props.getRaids();
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleAddToCharacter = (e, payload) => {
    if (payload.raidName)
      this.setState({
        raids: [...this.state.raids, payload],
      });
    else if (payload.itemName)
      this.setState({
        items: [...this.state.items, payload],
      });
    else if (payload.checkpointName)
      this.setState({
        checkpoints: [...this.state.checkpoints, payload],
      });
    else console.log("something is wrong");
  };

  handleRemoveFromCharacter = (e, payload) => {
    if (payload.raidName)
      this.setState({
        raids: this.state.raids.filter(raid => raid.id !== payload.id),
      });
    if (payload.itemName)
      this.setState({
        items: this.state.items.filter(item => item.id !== payload.id),
      });
    if (payload.checkpointName)
      this.setState({
        checkpoints: this.state.checkpoints.filter(
          checkpoint => checkpoint.id !== payload.id
        ),
      });
  };

  handleAddToCheckpoint = (e, payload) => {
    if (payload.raidName) {
      this.setState({
        raid: payload,
      });
    }
    if (payload.characterName) {
      this.setState({
        characters: [...this.state.characters, payload],
      });
    }
  };

  handleRemoveFromCheckpoint = (e, payload) => {
    if (payload.raidName) {
      this.setState({
        raid: {},
      });
    }
    if (payload.characterName) {
      this.setState({
        characters: this.state.characters.filter(c => c.id !== payload.id),
      });
    }
  };

  handleAddToItem = (e, payload) => {
    if (payload.characterName) {
      this.setState({
        character: payload,
      });
    }
    if (payload.raidName) {
      this.setState({
        RaidAcquired: payload,
      });
    }
  };

  handleRemoveFromItem = (e, payload) => {
    if (payload.characterName) {
      this.setState({
        character: {},
      });
    }
    if (payload.raidName) {
      this.setState({ raid: {} });
    }
  };
  handleAddToRaid = (e, payload) => {
    if (payload.itemName) {
      this.setState({
        items: [...this.state.items, payload],
      });
    }
    if (payload.checkpointName) {
      this.setState({
        checkpoints: [...this.state.checkpoints, payload],
      });
    }
  };
  handleRemoveFromRaid = (e, payload) => {
    if (payload.itemName)
      this.setState({
        items: this.state.items.filter(item => item.id !== payload.id),
      });
    if (payload.checkpointName)
      this.setState({
        checkpoints: this.state.checkpoints.filter(
          checkpoint => checkpoint.id !== payload.id
        ),
      });
  };

  handleSubmitCharacter = async e => {
    e.preventDefault();
    const newChar = await this.props.addCharacter(this.state);
    this.props.getCharacters();
    this.props.history.push(`/characters/${newChar.id}`);
  };
  handleSubmitCheckpoint = async e => {
    e.preventDefault();
    const newCheckpoint = await this.props.addCheckpoint(this.state);
    this.props.getCheckpoints();
    this.props.history.push(`/checkpoints/${newCheckpoint.id}`);
  };
  handleSubmitItem = async e => {
    e.preventDefault();
    const newItem = await this.props.addItem(this.state);
    this.props.getItems();
    this.props.history.push(`/items/${newItem.id}`);
  };
  handleSubmitRaid = async e => {
    e.preventDefault();
    const newRaid = await this.props.addRaid(this.state);
    this.props.getRaids();
    this.props.history.push(`/raids/${newRaid.id}`);
  };

  render = () => {
    if (
      this.props.allItems.status === LOADED &&
      this.props.allCharacters.status === LOADED &&
      this.props.allRaids.status === LOADED &&
      this.props.allCheckpoints.status === LOADED
    )
      switch (this.props.formName) {
        case "addCharacter":
          return (
            <FormCharacter
              props={this.props}
              state={this.state}
              handleChange={this.handleChange}
              handleAddToCharacter={this.handleAddToCharacter}
              handleRemoveFromCharacter={this.handleRemoveFromCharacter}
              handleSubmit={this.handleSubmitCharacter}
            />
          );
        case "addCheckpoint":
          return (
            <FormCheckpoint
              props={this.props}
              state={this.state}
              handleChange={this.handleChange}
              handleAddToCheckpoint={this.handleAddToCheckpoint}
              handleRemoveFromCheckpoint={this.handleRemoveFromCheckpoint}
              handleSubmit={this.handleSubmitCheckpoint}
            />
          );
        case "addItem":
          return (
            <FormItem
              props={this.props}
              state={this.state}
              handleChange={this.handleChange}
              handleAddToItem={this.handleAddToItem}
              handleRemoveFromItem={this.handleRemoveFromItem}
              handleSubmit={this.handleSubmitItem}
            />
          );
        case "addRaid":
          return (
            <FormRaid
              props={this.props}
              state={this.state}
              handleChange={this.handleChange}
              handleAddToRaid={this.handleAddToRaid}
              handleRemoveFromRaid={this.handleRemoveFromRaid}
              handleSubmit={this.handleSubmitRaid}
            />
          );
        default:
          return <Error />;
      }
    else return <Loading name="Form" />;
  };
}

const mapStateToProps = state => ({
  raids: state.allRaids.collection,
  allRaids: state.allRaids,
  characters: state.allCharacters.collection,
  allCharacters: state.allCharacters,
  items: state.allItems.collection,
  allItems: state.allItems,
  checkpoints: state.allCheckpoints.collection,
  allCheckpoints: state.allCheckpoints,
});

const mapDispatchToProps = {
  getRaids,
  getCharacters,
  getCheckpoints,
  getItems,
  addCharacter,
  addItem,
  addRaid,
  addCheckpoint,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
);
