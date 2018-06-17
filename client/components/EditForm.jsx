import React, { Component } from "react";
import { getRaids, deleteRaid } from "../reducers/allRaids";
import { getCharacters, deleteCharacter } from "../reducers/allCharacters";
import { getCheckpoints, deleteCheckpoint } from "../reducers/allCheckpoints";
import { getItems, deleteItem } from "../reducers/allItems";
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
} from "./helpers/initialStates";
import { FormItem } from "./FormItem";
import { FormRaid } from "./FormRaid";
import {
  getSingleCheckpoint,
  editCheckpoint,
} from "../reducers/singleCheckpoint";
import { getSingleItem, editItem } from "../reducers/singleItem";
import { getSingleRaid, editRaid } from "../reducers/singleRaid";
import { getSingleCharacter, editCharacter } from "../reducers/singleCharacter";
import DeleteField from "./aux/DeleteField";
import Axios from "axios";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    switch (this.props.formName) {
      case `editCharacter`: {
        this.state = initialAddCharacterState;
        break;
      }
      case `editCheckpoint`: {
        this.state = initialAddCheckpointState;
        break;
      }
      case `editItem`: {
        this.state = initialAddItemState;
        break;
      }
      case `editRaid`: {
        this.state = initialAddRaidState;
        break;
      }
      default:
        this.state = {};
    }
  }

  componentDidMount = async () => {
    switch (this.props.formName) {
      case `editCharacter`: {
        this.setState(
          await this.props.getSingleCharacter(this.props.match.params.charId)
        );
        break;
      }
      case `editCheckpoint`: {
        this.setState(
          await this.props.getSingleCheckpoint(
            this.props.match.params.checkpointId
          )
        );
        break;
      }
      case `editItem`: {
        this.setState(
          await this.props.getSingleItem(this.props.match.params.itemId)
        );
        break;
      }
      case `editRaid`: {
        this.setState(
          await this.props.getSingleRaid(this.props.match.params.raidId)
        );
        break;
      }
      default:
        this.state = {};
    }
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
    console.log("called", payload);
    if (payload.characterName) {
      this.setState({
        character: {},
      });
    }
    if (payload.raidName) {
      console.log(payload.raidName);
      this.setState({ RaidAcquired: {} });
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
    const editedChar = await this.props.editCharacter(this.state);
    this.props.getSingleCharacter(this.props.match.params.charId);
    console.log(editedChar);
    this.props.history.push(`/characters/${editedChar.id}`);
  };
  handleSubmitCheckpoint = async e => {
    e.preventDefault();
    const editedCheckpoint = await this.props.editCheckpoint(this.state);
    this.props.getSingleCheckpoint(this.props.match.params.checkpointId);
    this.props.history.push(`/checkpoints/${editedCheckpoint.id}`);
  };
  handleSubmitItem = async e => {
    e.preventDefault();
    const editedItem = await this.props.editItem(this.state);
    this.props.getSingleItem(this.props.match.params.itemId);
    this.props.history.push(`/items/${editedItem.id}`);
  };
  handleSubmitRaid = async e => {
    e.preventDefault();
    const editedRaid = await this.props.editRaid(this.state);
    console.log(editedRaid);
    this.props.getSingleRaid(this.props.match.params.raidId);
    this.props.history.push(`/raids/${editedRaid.id}`);
  };
  handleDelete = () => {
    console.log("THISPROPS", this.props);
    switch (this.props.formName) {
      case "editCharacter": {
        this.props.deleteCharacter(this.props.match.params.charId);
        this.props.history.push(`/characters`);
        this.props.getCharacters();
        break;
      }
      case "editCheckpoint": {
        this.props.deleteCheckpoint(this.props.match.params.checkpointId);
        this.props.history.push(`/checkpoints`);
        this.props.getCheckpoints();
        break;
      }
      case "editItem": {
        this.props.deleteItem(this.props.match.params.itemId);
        this.props.history.push(`/items`);
        this.props.getItems();
        break;
      }
      case "editRaid": {
        this.props.deleteRaid(this.props.match.params.raidId);
        this.props.history.push(`/raids`);
        this.props.getRaids();
        break;
      }
    }
  };
  pickForm = () => {
    switch (this.props.formName) {
      case "editCharacter":
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
      case "editCheckpoint":
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
      case "editItem":
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
      case "editRaid":
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
  };
  render = () => {
    return (
      <div id="form-return-div">
        {this.pickForm()}
        <DeleteField
          formName={this.props.formName}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  };
}
const mapStateToProps = state => ({
  raids: state.allRaids.collection,
  allRaids: state.allRaids,
  singleRaid: state.singleRaid,
  characters: state.allCharacters.collection,
  allCharacters: state.allCharacters,
  singleCharacter: state.singleCharacter,
  items: state.allItems.collection,
  allItems: state.allItems,
  singleItem: state.singleItem,
  checkpoints: state.allCheckpoints.collection,
  allCheckpoints: state.allCheckpoints,
  singleCheckpoint: state.singleCheckpoint,
});

const mapDispatchToProps = {
  getRaids,
  getCharacters,
  getCheckpoints,
  getItems,
  getSingleCharacter,
  getSingleCheckpoint,
  getSingleItem,
  getSingleRaid,
  editCharacter,
  editCheckpoint,
  editItem,
  editRaid,
  deleteCharacter,
  deleteCheckpoint,
  deleteItem,
  deleteRaid,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditForm)
);
