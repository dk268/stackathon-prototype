import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import { getItems } from "../reducers/allItems";
import { Link } from "react-router-dom";
import { getSingleRaid } from "../reducers/singleRaid";

class TableItems extends Component {
  componentDidMount = () => {
    this.props.getItems();
  };

  TableItemsCharacter = props => {
    {
      const filteredItems = props.allItems.filter(
        item => item.character.id === props.character.id
      );
      return (
        <div id="table-raids-div">
          {filteredItems.map(item => (
            <p key={item.id}>
              name: <Link to={`/items/${item.id}`}>{item.itemName}</Link> raid:{!item.RaidAcquired ? (
                ` no raid acquisition specified, `
              ) : (
                <Link to={`/raids/${item.RaidAcquired.id}`}>
                  {item.RaidAcquired.raidName}
                </Link>
              )}
              for {item.itemDKPCost} dkp
            </p>
          ))}
        </div>
      );
    }
  };

  TableItemsRaid = props => {
    {
      const filteredItems = props.allItems.filter(item =>
        props.raid.items.map(item => item.id).includes(item.id)
      );
      return (
        <div id="table-raids-div">
          {filteredItems.map(item => (
            <p key={item.id}>
              name: <Link to={`/items/${item.id}`}>{item.itemName}</Link> to{" "}
              <Link to={`/characters/${item.character.id}`}>{`${
                item.character.characterName
              }`}</Link>{" "}
              for {item.itemDKPCost} dkp
            </p>
          ))}
        </div>
      );
    }
  };

  render = () => {
    if (this.props.raid) return this.TableItemsRaid(this.props);
    else
      switch (this.props.status) {
        case UNASKED:
          return <Unasked />;
        case ERROR:
          return <Error componentName="TableItems" />;
        case LOADING:
          return <Loading name="table of items" />;
        case LOADED: {
          return this.TableItemsCharacter(this.props);
        }
        default:
          return <Unasked />;
      }
  };
}

const mapStateToProps = state => {
  return {
    status: state.allItems.status,
    allItems: state.allItems.collection,
  };
};
const mapDispatchToProps = { getItems, getSingleRaid };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableItems)
);
