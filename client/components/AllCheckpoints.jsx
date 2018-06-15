import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import RowCheckpoint from "./RowCheckpoint";

class AllCheckpoints extends Component {
  componentDidMount = () => {
    this.props.getCheckpoints();
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="AllCheckpoints" />;
      case LOADING:
        return <Loading name="all checkpoints" />;
      case LOADED:
        return (
          <div id="all-checkpoints">
            {this.props.allCheckpoints.map(checkpoint => (
              <div key={checkpoint.id}>
                <ul className="checkpoint-details">
                  <li className="checkpoint-details-checkpoint-name">
                    Checkpoint Name:{" "}
                    <Link to={`/checkpoints/${checkpoint.id}`}>
                      {checkpoint.checkpointName}
                    </Link>
                  </li>
                  <li className="checkpoint-details-checkpoint-dkp">
                    <RowCheckpoint checkpoint={checkpoint} />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        );
      default:
        return <p>DOOOM</p>;
    }
  };
}

const mapStateToProps = state => ({
  allCheckpoints: state.allCheckpoints.collection,
  status: state.allCheckpoints.status,
});

const mapDispatchToProps = { getCheckpoints };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllCheckpoints)
);
