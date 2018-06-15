import React, { Component } from "react";
import { getRaids, addRaid } from "../reducers/allRaids";
import { getCharacters, addCharacter } from "../reducers/allCharacters";
import { getCheckpoints, addCheckpoint } from "../reducers/allCheckpoints";
import { getItems, addItem } from "../reducers/allItems";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED } from "../reducers";
import Loading from "./Loading";

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
  handleChange = evt => {
    console.dir(evt.target);
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleAddToCharacter = (e, payload) => {
    console.log(payload);
    console.dir(e.target);
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

  handleSubmit = async e => {
    e.preventDefault();
    const newChar = await this.props.addCharacter(this.state);
    this.props.history.push(`/characters/${newChar.id}`);
  };

  render = () => {
    if (
      this.props.allItems.status === LOADED &&
      this.props.allCharacters.status === LOADED &&
      this.props.allRaids.status === LOADED &&
      this.props.allCheckpoints.status === LOADED
    )
      return (
        <CharacterForm
          props={this.props}
          state={this.state}
          handleChange={this.handleChange}
          handleAddToCharacter={this.handleAddToCharacter}
          handleRemoveFromCharacter={this.handleRemoveFromCharacter}
          handleSubmit={this.handleSubmit}
        />
      );
    else return <Loading name="Form" />;
  };
}
const CharacterForm = ownProps => {
  // console.log(ownProps);
  return (
    <form onSubmit={ownProps.handleSubmit}>
      Character Name: <br />
      <input
        type="text"
        name="characterName"
        onChange={ownProps.handleChange}
        value={ownProps.state.characterName}
      />
      <br />
      DKP: <br />
      <input
        type="number"
        name="dkp"
        onChange={ownProps.handleChange}
        value={ownProps.state.dkp}
      />
      <br />
      Main or Alt?{" "}
      <fieldset id="is-alt">
        <input
          type="radio"
          value={true}
          name="is-alt"
          onChange={ownProps.handleChange}
        />MAIN
        <input
          type="radio"
          value={false}
          name="is-alt"
          onChange={ownProps.handleChange}
        />ALT
      </fieldset>
      Unapproved alt?{" "}
      <fieldset id="is-alt-unapproved">
        <input
          type="radio"
          value={ownProps.state.isAltUnapproved}
          name="is-alt-unapproved"
          onChange={ownProps.handleChange}
        />MAIN OR APPROVED ALT
        <input
          type="radio"
          value={true}
          name="is-alt-unapproved"
          onChange={ownProps.handleChange}
        />UNAPPROVED ALT
      </fieldset>
      Character Class: <br />
      <input
        type="text"
        name="class"
        onChange={ownProps.handleChange}
        value={ownProps.state.class}
      />{" "}
      <br />
      totalDKPSpent: <br />
      <input
        type="text"
        name="totalDKPSpent"
        onChange={ownProps.handleChange}
        value={ownProps.state.totalDKPSpent}
      />{" "}
      <br />
      totalDKPEarned:<br />
      <input
        type="text"
        name="totalDKPEarned"
        onChange={ownProps.handleChange}
        value={ownProps.state.totalDKPEarned}
      />
      <br />
      <ul>
        {" "}
        Character belongs to the following raids:
        {ownProps.state.raids.map(raid => (
          <li key={raid.id} className="add-raid-to-character-belongs-to-div">
            <Link to={`/raids/${raid.id}`}>{raid.raidName}</Link>
            <button
              className="remove-from"
              type="button"
              onClick={e => ownProps.handleRemoveFromCharacter(e, raid)}>
              Remove
            </button>
          </li>
        ))}
      </ul>{" "}
      <br />
      <ul>
        Add raids to this character:
        {!ownProps.props.raids.filter(
          raid => !ownProps.state.raids.map(raid => raid.id).includes(raid.id)
        ).length
          ? "\nNo raids to which this character does not belong!"
          : ownProps.props.raids
              .filter(
                raid =>
                  !ownProps.state.raids.map(raid => raid.id).includes(raid.id)
              )
              .map(raid => {
                return (
                  <li key={raid.id} className="add-raid-to-character-li">
                    <Link
                      className="add-raid-to-character-Link"
                      to={`/raids/${raid.id}`}>
                      {raid.raidName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e => ownProps.handleAddToCharacter(e, raid)}>
                      Add
                    </button>
                  </li>
                );
              })}
      </ul>{" "}
      <br />
      <ul>
        {" "}
        Character has the following items:
        {!ownProps.state.items.length
          ? "\nno items on this character"
          : ownProps.state.items.map(item => (
              <li
                key={item.id}
                className="add-item-to-character-belongs-to-div">
                <Link to={`/items/${item.id}`}>{item.itemName}</Link>
                <button
                  className="remove-from"
                  type="button"
                  onClick={e => ownProps.handleRemoveFromCharacter(e, item)}>
                  Remove
                </button>
              </li>
            ))}
      </ul>{" "}
      <ul>
        Add items to this character:
        {!ownProps.props.items.filter(
          item => !item.character || !item.character.id
        ).length
          ? "\nno unclaimed items"
          : ownProps.props.items
              .filter(item => !item.character || !item.character.id)
              .map(item => {
                return (
                  <li key={item.id} className="add-item-to-character-li">
                    <Link
                      className="add-item-to-character-Link"
                      to={`/items/${item.id}`}>
                      {item.itemName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e => ownProps.handleAddToCharacter(e, item)}>
                      Add
                    </button>
                  </li>
                );
              })}
      </ul>{" "}
      <br />
      <ul>
        {" "}
        Character has the following checkpoints:
        {!ownProps.state.checkpoints.length
          ? "\ncharacter belongs to no checkpoints"
          : ownProps.state.checkpoints.map(checkpoint => (
              <li
                key={checkpoint.id}
                className="add-checkpoint-to-character-belongs-to-div">
                <Link to={`/checkpoints/${checkpoint.id}`}>
                  {checkpoint.checkpointName}
                </Link>
                <button
                  className="remove-from"
                  type="button"
                  onClick={e =>
                    ownProps.handleRemoveFromCharacter(e, checkpoint)
                  }>
                  Remove
                </button>
              </li>
            ))}
      </ul>{" "}
      <br />
      <ul>
        Add checkpoints to this character (does not update dkp):
        {!ownProps.props.checkpoints.filter(
          checkpoint =>
            !ownProps.state.checkpoints.map(cp => cp.id).includes(checkpoint.id)
        )
          ? " No checkpoints not on this character"
          : ownProps.props.checkpoints
              .filter(
                checkpoint =>
                  !ownProps.state.checkpoints
                    .map(cp => cp.id)
                    .includes(checkpoint.id)
              )
              .map(checkpoint => {
                return (
                  <li
                    key={checkpoint.id}
                    className="add-checkpoint-to-character-li">
                    <Link
                      className="add-checkpoint-to-character-Link"
                      to={`/checkpoints/${checkpoint.id}`}>
                      {checkpoint.checkpointName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e =>
                        ownProps.handleAddToCharacter(e, checkpoint)
                      }>
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
      <input type="reset" />
    </form>
  );
};
const CheckpointForm = props => {};
const ItemForm = props => {};
const RaidForm = props => {};

export const initialAddCharacterState = {
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

export const initialAddCheckpointState = {
  checkpointName: "",
  checkpointDKP: 10,
  characters: [],
  items: [],
  raid: {},
};

export const initialAddItemState = {
  itemName: "",
  itemDKPCost: 0,
  itemLinkUrl: "",
  itemSmallImageUrl: "",
  itemStatBlockUrl: "",
  character: {},
  raids: [],
  RaidAcquired: {},
};

export const initialAddRaidState = {
  raidName: "",
  checkpoints: [],
  items: [],
  characters: [],
};

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
