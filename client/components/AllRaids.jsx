import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import RowCheckpoint from "./RowCheckpoint";
import RowCharactersMapper from "./RowCharacter";
import RowItemsMapper from "./RowItem";

class AllRaids extends Component {
  componentDidMount = () => {
    if (this.props.status != LOADED) this.props.getRaids();
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
                    Checkpoints: <RowCheckpoint raid={raid} />
                  </li>
                  <li className="raid-details-character-mapper-li">
                    <RowCharactersMapper characters={raid.characters} />
                  </li>
                  <br />
                  <li className="raid-details-item-mapper-li">
                    <RowItemsMapper items={raid.items} />
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
