import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSingleRaid } from "../reducers/singleRaid";
import { getAllRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import TableRaids from "./TableRaids";
import TableItems from "./TableItems";
import RowCheckpoint from "./RowCheckpoint";

class SingleRaid extends Component {
  componentDidMount = () => {
    this.props.getSingleRaid(this.props.match.params.raidId);
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="SingleRaid" />;
      case LOADING:
        return <Loading name="single raid" />;
      case LOADED:
        return (
          <div id="single-raid-div">
            <h2>{this.props.singleRaid.raidName}</h2>
            <h6>
              Checkpoints: <RowCheckpoint raid={this.props.singleRaid} />
            </h6>
            <h5>
              Total DKP:{" "}
              {this.props.singleRaid.checkpoints.reduce(
                (acc, checkpoint) => acc + checkpoint.checkpointDKP,
                0
              )}{" "}
            </h5>
            <h3>Items</h3>
            <TableItems raid={this.props.singleRaid} />
          </div>
        );
      default:
        return <p>DOOOM default reached</p>;
    }
  };
}

const mapStateToProps = state => ({
  singleRaid: state.singleRaid.collection,
  status: state.singleRaid.status,
});

const mapDispatchToProps = { getSingleRaid, getAllRaids };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleRaid)
);
