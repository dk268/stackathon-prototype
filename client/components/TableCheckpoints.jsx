import React, { Component } from "react";
import { connect } from "react-redux";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import { getCheckpoints } from "../reducers/allCheckpoints";

class TableCheckpoints extends Component {
  componentDidMount = () => {
    this.props.getCheckpoints();
  };

  render = () => {
    console.log(this.props);
    const filteredCheckpoints = this.props.allCheckpoints
      .filter(checkpoint => checkpoint.raidId === this.props.raid.id)
      .filter(
        checkpoint =>
          checkpoint.characters.filter(
            character => character.id === this.props.character.id
          ).length
      );
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="TableCheckpoints" />;
      case LOADING: {
        return <Loading name="table of checkpoints" />;
      }
      case LOADED: {
        return (
          <div className="table-checkpoints-div">
            {filteredCheckpoints.map(checkpoint => (
              <small key={checkpoint.id}>
                {checkpoint.checkpointName} for {checkpoint.checkpointDKP} dkp{" "}
                <br />
              </small>
            ))}
            <p>
              Total DKP{" "}
              {filteredCheckpoints.reduce(
                (acc, checkpoint) => acc + checkpoint.checkpointDKP,
                0
              )}
            </p>
          </div>
        );
      }
      default: {
        return <Unasked />;
      }
    }
  };
}

const mapStateToProps = state => ({
  status: state.allCheckpoints.status,
  allCheckpoints: state.allCheckpoints.collection,
});

const mapDispatchToProps = { getCheckpoints };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCheckpoints);
