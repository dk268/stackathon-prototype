import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    switch (this.props.formName) {
      case addCharacter: {
        this.state = initialAddCharacterState;
        break;
      }
      case addCheckpoint: {
        this.state = initialAddCheckpointState;
        break;
      }
      case addItem: {
        this.state = initialAddItemState;
        break;
      }
      case addRaid: {
        this.state = initialAddRaidState;
        break;
      }
      default:
        this.state = {};
    }
  }
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

  render = () => <CharacterForm props={props} />;
}
const CharacterForm = props => {
  return (
    <form onSubmit={this.handleSubmit}>
      Character Name: <br />
      <input
        type="text"
        name="characterName"
        onChange={props.handleChange}
        value={props.state.characterName}
      />
      <br />
      DKP: <br />
      <input
        type="number"
        name="dkp"
        onChange={props.handleChange}
        value={props.state.dkp}
      />
      <br />
      Main or Alt?{" "}
      <fieldset id="is-alt">
        <input
          type="radio"
          value={false}
          name="is-alt"
          onChange={props.handleChange}>
          Main
        </input>
        <input
          type="radio"
          value={true}
          name="is-alt"
          onChange={props.handleChange}>
          Alt
        </input>
      </fieldset>
      Unapproved alt?{" "}
      <fieldset id="is-alt">
        <input
          type="radio"
          value={false}
          name="is-alt"
          onChange={props.handleChange}>
          Main or Approved Alt
        </input>
        <input
          type="radio"
          value={true}
          name="is-alt"
          onChange={props.handleChange}>
          Unapproved Alt
        </input>
      </fieldset>
      Character Class: <br />
      <input
        type="text"
        name="class"
        onChange={props.handleChange}
        value={props.state.class}
      />{" "}
      <br />
      totalDKPSpent: <br />
      <input
        type="text"
        name="totalDKPSpent"
        onChange={props.handleChange}
        value={props.state.totalDKPSpent}
      />{" "}
      <br />
      totalDKPEarned:<br />
      <input
        type="text"
        name="totalDKPEarned"
        onChange={props.handleChange}
        value={props.state.totalDKPEarned}
      />
      <br />
      <ul>
        {" "}
        Character belongs to the following raids:
        {props.state.raids.map(raid => (
          <li key={raid.id} className="add-raid-to-character-belongs-to-div">
            <Link to={`/raids/${raid.id}`}>{raid.raidName}</Link>
            <button
              className="remove-from"
              type="button"
              onClick={(e, raid) => props.handleRemoveFromCharacter(e, raid)}>
              Remove
            </button>
          </li>
        ))}
      </ul>{" "}
      <br />
      <ul>
        Add raids to this character:
        {props.raids
          .filter(raid => !props.state.raids.includes(raid.id))
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
                  onClick={(e, raid) => props.handleAddToCharacter(e, raid)}>
                  Add
                </button>
              </li>
            );
          })}
      </ul>{" "}
      <br />
      <ul>
        Add items to this character:
        {props.items
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
                  onClick={(e, item) => props.handleAddToCharacter(e, item)}>
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
        {props.state.items.map(item => (
          <li key={item.id} className="add-item-to-character-belongs-to-div">
            <Link to={`/items/${item.id}`}>{item.itemName}</Link>
            <button
              className="remove-from"
              type="button"
              onClick={(e, item) => props.handleRemoveFromCharacter(e, item)}>
              Remove
            </button>
          </li>
        ))}
      </ul>{" "}
      <br />
      <ul>
        Add checkpoints to this character (does not update dkp):
        {props.checkpoints
          .filter(
            checkpoint => !props.state.checkpoints.includes(checkpoint.id)
          )
          .map(item => {
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
                  onClick={(e, checkpoint) =>
                    props.handleAddToCharacter(e, checkpoint)
                  }>
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
        {props.state.checkpoints.map(checkpoint => (
          <li
            key={checkpoint.id}
            className="add-checkpoint-to-character-belongs-to-div">
            <Link to={`/checkpoints/${checkpoint.id}`}>
              {checkpoint.checkpointName}
            </Link>
            <button
              className="remove-from"
              type="button"
              onClick={(e, checkpoint) =>
                props.handleRemoveFromCharacter(e, checkpoint)
              }>
              Remove
            </button>
          </li>
        ))}
      </ul>{" "}
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
)(Form);
