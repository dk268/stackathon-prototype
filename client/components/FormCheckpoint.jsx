import React from "react";
import { Link } from "react-router-dom";
import DeleteField from "./aux/Delete";

export const FormCheckpoint = ownProps => {
  return (
    <form onSubmit={ownProps.handleSubmit}>
      Checkpoint Name: <br />
      <input
        type="text"
        name="checkpointName"
        onChange={ownProps.handleChange}
        value={ownProps.state.checkpointName}
      />
      <br />
      Checkpoint DKP value: <br />
      <input
        type="number"
        name="checkpointDKP"
        onChange={ownProps.handleChange}
        value={ownProps.state.checkpointDKP}
      />
      <br />
      <br />
      <ul>
        {" "}
        Checkpoint belongs to this raid:
        <li className="add-checkpoint-to-raid-belongs-to-div">
          <Link to={`/raids/${ownProps.state.raid.id}`}>
            {ownProps.state.raid.raidName}
          </Link>
          <button
            className="remove-from"
            type="button"
            onClick={e =>
              ownProps.handleRemoveFromCheckpoint(e, ownProps.state.raid)
            }>
            Remove
          </button>
        </li>
      </ul>{" "}
      <br />
      <ul>
        Add this checkpoint to a raid:
        {ownProps.state.raid.id
          ? "\nCheckpoint already belongs to a raid!"
          : ownProps.props.raids
              .filter(raid => raid.id !== ownProps.state.raid.id)
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
                      onClick={e => ownProps.handleAddToCheckpoint(e, raid)}>
                      Add
                    </button>
                  </li>
                );
              })}
      </ul>{" "}
      <br />
      <ul>
        {" "}
        Checkpoint has the following characters:
        {!ownProps.state.characters.length
          ? "\nno characters on this checkpoint"
          : ownProps.state.characters
              .filter(
                character =>
                  !ownProps.state.characters
                    .map(c => c.id)
                    .includes(character.id)
              )
              .map(character => (
                <li
                  key={character.id}
                  className="add-character-to-character-belongs-to-div">
                  <Link to={`/items/${character.id}`}>
                    {character.itemName}
                  </Link>
                  <button
                    className="remove-from"
                    type="button"
                    onClick={e =>
                      ownProps.handleRemoveFromCheckpoint(e, character)
                    }>
                    Remove
                  </button>
                </li>
              ))}
      </ul>{" "}
      <ul>
        Add characters to this checkpoint:
        {!ownProps.props.characters.filter(character =>
          ownProps.state.characters.map(c => c.id).includes(character.id)
        ).length
          ? "\nno unclaimed items"
          : ownProps.props.characters
              .filter(character =>
                ownProps.state.characters.map(c => c.id).includes(character.id)
              )
              .map(character => {
                return (
                  <li
                    key={character.id}
                    className="add-character-to-checkpoint-li">
                    <Link
                      className="add-character-to-checkpoint-Link"
                      to={`/characters/${character.id}`}>
                      {character.characterName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e =>
                        ownProps.handleAddToCheckpoint(e, character)
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
