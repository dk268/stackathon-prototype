import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import Checkpoint from "./Checkpoint";
import RowCharactersMapper from "./RowCharacter";
import RowItemsMapper from "./RowItem";

class AllRaids extends Component {
  componentDidMount = () => {
    this.props.getRaids();
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="AllRaids" />;
      case LOADING:
        return <Loading name="all raids" />;
      case LOADED:
        return (
          <div id="all-raids">
            {this.props.allRaids.map(raid => (
              <div key={raid.id}>
                <ul className="raid-details">
                  <Link to={`/raids/${raid.id}`}>
                    <li className="raid-details-raid-name">
                      Raid Name: {raid.raidName}
                    </li>
                  </Link>
                  <li className="raid-details-raid-dkp">
                    Checkpoints: <Checkpoint raid={raid} />
                  </li>
                  <RowCharactersMapper characters={raid.characters} />
                  <RowItemsMapper items={raid.items} />
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
  allRaids: state.allRaids.collection,
  status: state.allRaids.status,
});

const mapDispatchToProps = { getRaids };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllRaids)
);
