import React, { Component } from "react";
import { connect } from "react-redux";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import { getCheckpoints } from "../reducers/allCheckpoints";

const TableCheckpoints = props => {
  console.log(props);
  const filteredCheckpoints = props.allCheckpoints
    .filter(checkpoint => checkpoint.raidId === props.raid.id)
    .filter(
      checkpoint =>
        checkpoint.characters.filter(
          character => character.id === props.character.id
        ).length
    );
  switch (props.status) {
    case UNASKED:
      return <Unasked />;
    case ERROR:
      return <Error componentName="TableRaids" />;
    case LOADING: {
      return <Loading name="table of raids" />;
    }
    case LOADED: {
      return (
        <div className="table-checkpoints-div">
          {filteredCheckpoints.map(checkpoint => (
            <p key={checkpoint.id}>
              {checkpoint.checkpointName} for {checkpoint.checkpointDKP} dkp
            </p>
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
      props.getCheckpoints();
      return <Unasked />;
    }
  }
};
const mapStateToProps = state => ({
  status: state.allCheckpoints.status,
  allCheckpoints: state.allCheckpoints.collection,
});

const mapDispatchToProps = { getCheckpoints };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCheckpoints);
