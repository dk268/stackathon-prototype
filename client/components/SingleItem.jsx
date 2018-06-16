import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSingleItem } from "../reducers/singleItem";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import TableCharacters from "./TableCharacters";
import { isAdmin } from "..";

class SingleItem extends Component {
  componentDidMount = () => {
    this.props.getSingleItem(this.props.match.params.itemId);
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="SingleItem" />;
      case LOADING:
        return <Loading name="single item" />;
      case LOADED:
        return (
          <div id="single-item-div">
            <h2>{this.props.singleItem.itemName}</h2>
            <h6>DKP cost: {this.props.singleItem.itemDKPCost}</h6>
            <h6>
              Buyer:{!this.props.singleItem.character ? (
                ` Item not yet assigned a character`
              ) : (
                <Link to={`/characters/${this.props.singleItem.character.id}`}>
                  {this.props.singleItem.character.characterName}
                </Link>
              )}
            </h6>
            <h6>
              Raid Found:{!this.props.singleItem.RaidAcquired ? (
                ` no raid acquisition specified`
              ) : (
                <Link
                  to={`/characters/${this.props.singleItem.RaidAcquired.id}`}>
                  {this.props.singleItem.RaidAcquired.raidName}
                </Link>
              )}
            </h6>
            <h5>Characters in Possession: </h5>
            <ul>
              <TableCharacters item={this.props.singleItem} />
            </ul>
            {isAdmin() ? (
              <Link to={`/items/edit/${this.props.match.params.itemId}`}>
                <button type="button" id="item-edit-admin-button-link">
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
  singleItem: state.singleItem.collection,
  status: state.singleItem.status,
});

const mapDispatchToProps = { getSingleItem };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleItem)
);
