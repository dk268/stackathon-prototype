import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSingleCheckpoint } from "../reducers/singleCheckpoint";
import { getAllRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import TableRaids from "./TableRaids";
import TableItems from "./TableItems";

class SingleCheckpoint extends Component {
  componentDidMount = () => {
    this.props.getSingleCheckpoint(this.props.match.params.checkpointId);
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="SingleCheckpoint" />;
      case LOADING:
        return <Loading name="single checkpoint" />;
      case LOADED:
        return (
          <div id="single-checkpoint-div">
            <h2>{this.props.singleCheckpoint.checkpointName}</h2>
            <h6>DKP: {this.props.singleCheckpoint.checkpointDKP}</h6>
            <h3>
              Raid:{" "}
              {!this.props.singleCheckpoint.raid ? (
                `Checkpoint not yet associated with a raid`
              ) : (
                <Link to={`/raids/${this.props.singleCheckpoint.raid.id}`}>
                  {this.props.singleCheckpoint.raid.raidName}
                </Link>
              )}
            </h3>
            <h4>Characters in attendance:</h4>
            <ul id="single-checkpoint-characters-ul">
              {this.props.singleCheckpoint.characters.map(character => (
                <li key={character.id}>
                  <Link to={`/characters/${character.id}`}>
                    {character.characterName}
                  </Link>
                </li>
              ))}
            </ul>
            {isAdmin ? (
              <Link
                to={`/checkpoints/edit/${
                  this.props.match.params.checkpointId
                }`}>
                <button type="button" id="checkpoint-edit-admin-button-link">
                  EDIT ME!
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        );
      default:
        return <p>DOOOM default reached</p>;
    }
  };
}

const mapStateToProps = state => ({
  singleCheckpoint: state.singleCheckpoint.collection,
  status: state.singleCheckpoint.status,
});

const mapDispatchToProps = { getSingleCheckpoint, getAllRaids };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleCheckpoint)
);
