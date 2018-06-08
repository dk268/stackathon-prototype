import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import Checkpoint from "./Checkpoint";

class AllRaids extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.getRaids();
    console.log(this.props);
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
                  <Link to={`/characters/${raid.character.id}`}>
                    <li className="raid-details-buyer-name">
                      Buyer Name: {raid.character.characterName}
                    </li>
                  </Link>
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
