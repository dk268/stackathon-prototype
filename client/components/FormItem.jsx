import React from "react";
import { Link } from "react-router-dom";

export const FormItem = ownProps => {
  console.log(ownProps);
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
        name="itemStatBlockUrl"
        onChange={ownProps.handleChange}
        value={ownProps.state.itemStatBlockUrl}
      />
      <br />
      <ul>
        {" "}
        Item belongs to the following character:
        {!ownProps.state.character.id ? (
          "Item belongs to no character, yet"
        ) : (
          <li className="add-item-to-character-div">
            <Link to={`/characters/${ownProps.state.character.id}`}>
              {ownProps.state.character.characterName}
            </Link>
            <button
              className="remove-from"
              type="button"
              onClick={e =>
                ownProps.handleRemoveFromItem(e, ownProps.state.character)
              }>
              Remove
            </button>
          </li>
        )}
      </ul>{" "}
      <br />
      <ul>
        Set the character for this item:
        {ownProps.state.character.id
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
                    onClick={e => ownProps.handleAddToItem(e, character)}>
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
        {!ownProps.state.RaidAcquired.id ? (
          "\nItem not yet set a raid acquired"
        ) : (
          <li
            key={ownProps.state.RaidAcquired.id}
            className="add-raid-to-item-belongs-to-div">
            <Link to={`/raids/${ownProps.state.RaidAcquired.id}`}>
              {ownProps.state.RaidAcquired.raidName}
            </Link>
            <button
              className="remove-from"
              type="button"
              onClick={e =>
                ownProps.handleRemoveFromItem(e, ownProps.state.RaidAcquired)
              }>
              Remove
            </button>
          </li>
        )}
      </ul>{" "}
      <ul>
        Set raid acquired for this item:
        {ownProps.state.RaidAcquired.id
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
