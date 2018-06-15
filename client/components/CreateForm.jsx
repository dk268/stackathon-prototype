import React, { Component } from "react";
import { getRaids, addRaid } from "../reducers/allRaids";
import { getCharacters, addCharacter } from "../reducers/allCharacters";
import { getCheckpoints, addCheckpoint } from "../reducers/allCheckpoints";
import { getItems, addItem } from "../reducers/allItems";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED } from "../reducers";
import Loading from "./Loading";
import Error from "./Error";
import { CharacterForm } from "./FormCharacter";
import { CheckpointForm } from "./FormCheckpoint";
import {
  initialAddCharacterState,
  initialAddCheckpointState,
  initialAddItemState,
  initialAddRaidState,
} from "./aux/initialStates";

class Form extends Component {
  constructor(props) {
    super(props);
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
    this.props.getRaids();
    this.props.getCharacters();
    this.props.getCheckpoints();
    this.props.getItems();
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
  handleAddToRaid = (e, payload) => {};
  handleRemoveFromRaid = (e, payload) => {};

  handleSubmitCharacter = async e => {
    e.preventDefault();
    const newChar = await this.props.addCharacter(this.state);
    this.props.history.push(`/characters/${newChar.id}`);
  };
  handleSubmitCheckpoint = async e => {
    e.preventDefault();
    const newCheckpoint = await this.props.addCheckpoint(this.state);
    this.props.history.push(`/checkpoints/${newCheckpoint.data.id}`);
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
            <CharacterForm
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
            <CheckpointForm
              props={this.props}
              state={this.state}
              handleChange={this.handleChange}
              handleAddToCheckpoint={this.handleAddToCheckpoint}
              handleRemoveFromCheckpoint={this.handleRemoveFromCheckpoint}
              handleSubmit={this.handleSubmitCheckpoint}
            />
          );
        default:
          return <Error />;
      }
    else return <Loading name="Form" />;
  };
}

const ItemForm = ownProps => {
  return (
    <form onSubmit={ownProps.handleSubmit}>
      Item Name: <br />
      <input
        type="text"
        name="itemName"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemName}
      />
      <br />
      itemDKPCost: <br />
      <input
        type="number"
        name="itemDKPCost"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemDKPCost}
      />
      <br />
      Item Link URL: <br />
      <input
        type="text"
        name="itemLinkUrl"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemLinkUrl}
      />{" "}
      <br />
      Item tooltip URL: <br />
      <input
        type="text"
        name="itemSmallImageUrl"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemSmallImageUrl}
      />{" "}
      <br />
      Item stat block URL:<br />
      <input
        type="text"
        name="itemStateBlockUrl"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemStateBlockUrl}
      />
      <br />
      <ul>
        {" "}
        Item belongs to the following character:
        {!ownProps.state.character.id ? (
          "Item belongs to no character, yet"
        ) : (
          <li className="add-item-to-character-div">
            <Link to={`/characters/${character.id}`}>
              {character.characterName}
            </Link>
            <button
              className="remove-from"
              type="button"
              onClick={e => ownProps.handleRemoveFromItem(e, item)}>
              Remove
            </button>
          </li>
        )}
      </ul>{" "}
      <br />
      <ul>
        Set the character for this item:
        {!ownprops.state.character.id
          ? " Item already assigned!"
          : ownProps.props.characters.map(character => {
              return (
                <li key={character.id} className="add-character-to-item-li">
                  <Link
                    className="add-character-to-item-Link"
                    to={`/characters/${character.id}`}>
                    {character.characterName}
                  </Link>
                  <button
                    type="button"
                    className="add-to"
                    onClick={e => ownProps.handleAddToItem(e, raid)}>
                    Add
                  </button>
                </li>
              );
            })}
      </ul>{" "}
      <br />
      <ul>
        {" "}
        Item acquired at raid:
        {!ownProps.state.RaidAcquired.id
          ? "\nItem not yet set a raid acquired"
          : ownProps.state.raids.map(raid => (
              <li key={raid.id} className="add-raid-to-item-belongs-to-div">
                <Link to={`/raids/${raid.id}`}>{raid.raidName}</Link>
                <button
                  className="remove-from"
                  type="button"
                  onClick={e => ownProps.handleRemoveFromItem(e, raid)}>
                  Remove
                </button>
              </li>
            ))}
      </ul>{" "}
      <ul>
        Set raid acquired for this item:
        {ownProps.props.raid.id
          ? "\nItem already belongs to a raid!"
          : ownProps.props.raids.map(raid => {
              return (
                <li key={raid.id} className="add-raid-to-item-li">
                  <Link
                    className="add-raid-to-item-Link"
                    to={`/raids/${raid.id}`}>
                    {raid.raidName}
                  </Link>
                  <button
                    type="button"
                    className="add-to"
                    onClick={e => ownProps.handleAddToItem(e, raid)}>
                    Add
                  </button>
                </li>
              );
            })}
      </ul>{" "}
      <br />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
const RaidForm = ownProps => {};

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
