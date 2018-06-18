import React from "react";
import { Link } from "react-router-dom";
import DeleteField from "./helpers/DeleteField";

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
        {!ownProps.state.raid || !ownProps.state.raid.id ? (
          ` checkpoint not yet assigned a raid`
        ) : (
          <li className="add-checkpoint-to-raid-belongs-to-div">
            Checkpoint belongs to this raid:
            <Link to={`/raids/${ownProps.state.raid.id}`}>
              {ownProps.state.raid.raidName}
            </Link>
            <button
              className="remove-from"
              type="button"
              onClick={e =>
                ownProps.handleRemoveFromCheckpoint(e, ownProps.state.raid)
              }
            >
              Remove
            </button>
          </li>
        )}
      </ul>{" "}
      <br />
      <ul>
        Add this checkpoint to a raid:
        {ownProps.state.raid && ownProps.state.raid.id
          ? " Checkpoint already belongs to a raid!"
          : ownProps.props.raids
              .filter(
                raid =>
                  (raid && raid.id !== ownProps.state.raid) ||
                  ownProps.state.raid.id
              )
              .map(raid => {
                return (
                  <li key={raid.id} className="add-raid-to-character-li">
                    <Link
                      className="add-raid-to-character-Link"
                      to={`/raids/${raid.id}`}
                    >
                      {raid.raidName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e => ownProps.handleAddToCheckpoint(e, raid)}
                    >
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
          ? " no characters on this checkpoint"
          : ownProps.state.characters.map(character => (
              <li
                key={character.id}
                className="add-character-to-checkpoint-belongs-to-div"
              >
                <Link to={`/characters/${character.id}`}>
                  {character.characterName}
                </Link>
                <button
                  className="remove-from"
                  type="button"
                  onClick={e =>
                    ownProps.handleRemoveFromCheckpoint(e, character)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
      </ul>{" "}
      <ul>
        Add characters to this checkpoint:
        {!ownProps.props.characters.filter(character =>
          ownProps.props.characters.map(c => c.id).includes(character.id)
        ).length
          ? " no characters that weren't at this checkpoint"
          : ownProps.props.characters
              .filter(
                character =>
                  !ownProps.state.characters
                    .map(c => c.id)
                    .includes(character.id)
              )
              .map(character => {
                return (
                  <li
                    key={character.id}
                    className="add-character-to-checkpoint-li"
                  >
                    <Link
                      className="add-character-to-checkpoint-Link"
                      to={`/characters/${character.id}`}
                    >
                      {character.characterName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e =>
                        ownProps.handleAddToCheckpoint(e, character)
                      }
                    >
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
