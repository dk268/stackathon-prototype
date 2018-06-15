import React, { Component } from "react";
import { getRaids } from "../reducers/allRaids";
import { connect } from "react-redux";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import { Link } from "react-router-dom";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import TableCheckpoints from "./TableCheckpoints";

class TableRaids extends Component {
  componentDidMount = () => {
    this.props.getRaids();
  };
  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="TableRaids" />;
      case LOADING:
        return <Loading name="table of raids" />;
      case LOADED: {
        const filteredRaids = this.props.allRaids.filter(
          raid =>
            raid.characters.filter(
              character => character.id === this.props.character.id
            ).length
        );
        return (
          <div id="table-raids-div">
            <p>
              attendance:{" "}
              {(100 * filteredRaids.length) / this.props.allRaids.length}%
            </p>
            {filteredRaids.map(raid => {
              return (
                <div key={raid.id} id="filtered-raids-map-div">
                  <h4>
                    <Link to={`/raids/${raid.id}`}>{raid.raidName}</Link>
                  </h4>
                  <TableCheckpoints
                    raid={raid}
                    character={this.props.character}
                  />
                </div>
              );
            })}
          </div>
        );
      }
      default:
        return <Unasked />;
    }
  };
}

const mapStateToProps = state => ({
  status: state.allRaids.status,
  allRaids: state.allRaids.collection,
});

const mapDispatchToProps = { getRaids };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableRaids);
