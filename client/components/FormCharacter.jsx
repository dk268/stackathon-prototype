import React from "react";
import { Link } from "react-router-dom";

export const FormCharacter = ownProps => {
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
          ? " No raids to which this character does not belong!"
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
        ).length
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
    </form>
  );
};
