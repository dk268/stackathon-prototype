import React from "react";
import { Link } from "react-router-dom";

export const FormRaid = ownProps => {
  return (
    <form onSubmit={ownProps.handleSubmit}>
      Raid Name: <br />
      <input
        type="text"
        name="raidName"
        onChange={ownProps.handleChange}
        value={ownProps.state.raidName}
      />
      Raid Date: <br />
      <input
        type="date"
        name="raidDate"
        onChange={ownProps.handleChange}
        value={ownProps.state.raidDate}
      />
      Raid has the following items:
      <br />
      <ul>
        {!ownProps.state.items.length
          ? ` no items found on this raid`
          : ownProps.state.items.map(item => (
              <li key={item.id} className="add-raid-add-item-to-raid-li">
                {" "}
                <Link to={`/items/${item.id}`}>{item.itemName}</Link>
                <button
                  className="remove-from"
                  type="button"
                  onClick={e => ownProps.handleRemoveFromRaid(e, item)}>
                  {"Remove"}
                </button>
              </li>
            ))}
      </ul>
      <ul>
        Add items to this raid:
        {!ownProps.props.items.filter(
          item => !item.RaidAcquired || !item.RaidAcquired.id
        ).length
          ? ` no unclaimed items`
          : ownProps.props.items
              .filter(item => !item.RaidAcquired || !item.RaidAcquired.id)
              .map(item => {
                return (
                  <li key={item.id} className="add-item-to-raid-li">
                    <Link
                      className="add-item-to-raid-Link"
                      to={`/items/${item.id}`}>
                      {item.itemName}
                    </Link>
                    <button
                      type="button"
                      className="add-to"
                      onClick={e => ownProps.handleAddToRaid(e, item)}>
                      Add
                    </button>
                  </li>
                );
              })}
      </ul>{" "}
      <ul>
        {" "}
        Raid has the following checkpoints:
        {!ownProps.state.checkpoints.length
          ? " Raid has no checkpoints"
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
                  onClick={e => ownProps.handleRemoveFromRaid(e, checkpoint)}>
                  Remove
                </button>
              </li>
            ))}
      </ul>{" "}
      <ul>
        Add checkpoints to this raid (does not update dkp):
        {!ownProps.props.checkpoints.filter(
          checkpoint =>
            !ownProps.state.checkpoints.map(cp => cp.id).includes(checkpoint.id)
        ).length
          ? " No checkpoints not on this raid"
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
      Note: associated characters will be derived from the checkpoints
      <input type="submit" value="Submit" />
    </form>
  );
};
