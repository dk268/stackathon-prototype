import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCheckpoints } from "../reducers/allCheckpoints";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import Checkpoint from "./Checkpoint";
import RowCharactersMapper from "./RowCharacter";
import RowItemsMapper from "./RowItem";

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
                  <Link to={`/checkpoints/${checkpoint.id}`}>
                    <li className="checkpoint-details-checkpoint-name">
                      Checkpoint Name: {checkpoint.checkpointName}
                    </li>
                  </Link>
                  <li className="checkpoint-details-checkpoint-dkp">
                    Checkpoints: <Checkpoint checkpoint={checkpoint} />
                  </li>
                  <RowCharactersMapper characters={checkpoint.characters} />
                  <RowItemsMapper items={checkpoint.items} />
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
