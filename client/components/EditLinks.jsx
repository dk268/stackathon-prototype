import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCharacters } from "../reducers/allCharacters";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { getRaids } from "../reducers/allRaids";
import { getItems } from "../reducers/allItems";
import Loading from "./Loading";
import { LOADED } from "../reducers";

class EditLinks extends Component {
  componentDidMount() {
    this.props.getCharacters();
    this.props.getRaids();
    this.props.getItems();
    this.props.getCheckpoints();
  }

  render = () => {
    if (
      this.props.allItems.status === LOADED &&
      this.props.allCharacters.status === LOADED &&
      this.props.allRaids.status === LOADED &&
      this.props.allCheckpoints.status === LOADED
    )
      return (
        <div id="edit-master-div">
          <div id="edit-character-div">
            {this.props.characters.map(c => (
              <Link key={c.id} to={`/characters/edit/${c.id}`}>
                {c.characterName + " "}
              </Link>
            ))}{" "}
          </div>{" "}
          <br />
          <div id="edit-checkpoint-div">
            {this.props.checkpoints.map(ch => (
              <Link key={ch.id} to={`/checkpoints/edit/${ch.id}`}>
                {ch.checkpointName + " "}
              </Link>
            ))}{" "}
          </div>
          <br />
          <div id="edit-item-div">
            {this.props.items.map(item => (
              <Link key={item.id} to={`/items/edit/${item.id}`}>
                {item.itemName + " "}
              </Link>
            ))}{" "}
          </div>
          <br />
          <div id="edit-raid-div">
            {this.props.raids.map(raid => (
              <Link key={raid.id} to={`/raids/edit/${raid.id}`}>
                {raid.raidName + " "}
              </Link>
            ))}{" "}
          </div>
        </div>
      );
    else return <Loading name="EditLinks" />;
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
  getCharacters,
  getCheckpoints,
  getRaids,
  getItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLinks);
