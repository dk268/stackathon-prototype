import React from "react";
import { Link } from "react-router-dom";

export const FormItem = ownProps => {
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
