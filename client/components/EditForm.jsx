import React, { Component } from "react";
import { getRaids } from "../reducers/allRaids";
import { getCharacters } from "../reducers/allCharacters";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { getItems } from "../reducers/allItems";
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
import {
  getSingleCheckpoint,
  editCheckpoint,
} from "../reducers/singleCheckpoint";
import { getSingleItem, editItem } from "../reducers/singleItem";
import { getSingleRaid, editRaid } from "../reducers/singleRaid";
import { getSingleCharacter, editCharacter } from "../reducers/singleCharacter";

class EditForm extends Component {
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
    switch (this.props.formName) {
      case `editCharacter`: {
        this.props.getSingleCharacter(this.props.params.match.charId);
        this.setState(this.props.singleCharacter.collection);
        break;
      }
      case `editCheckpoint`: {
        this.props.getSingleCheckpoint(this.props.params.match.checkpointId);
        this.setState(this.props.singleCheckpoint.collection);
        break;
      }
      case `editItem`: {
        this.props.getSingleItem(this.props.params.match.itemId);
        this.setState(this.props.singleItem.collection);
        break;
      }
      case `editRaid`: {
        this.props.getSingleRaid(this.props.params.match.raidId);
        this.setState(this.props.singleRaid.collection);
        break;
      }
      default:
        this.state = {};
    }
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
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
    const editedChar = await this.props.editCharacter(this.state);
    this.props.getSingleCharacter(this.props.match.params.charId);
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
    this.props.getSingleRaid(this.props.match.params.raidId);
    this.props.history.push(`/raids/${editedRaid.id}`);
  };
  render = () => {
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
  getSingleCharacter,
  getSingleCheckpoint,
  getSingleItem,
  getSingleRaid,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditForm)
);
