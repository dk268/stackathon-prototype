import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getItems } from "../reducers/allItems";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";

class AllItems extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.getItems();
    console.log(this.props);
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="AllItems" />;
      case LOADING:
        return <Loading name="all items" />;
      case LOADED:
        return (
          <div id="all-items">
            {this.props.allItems.map(item => (
              <div key={item.id}>
                <ul className="item-details">
                  <Link to={`/items/${item.id}`}>
                    <li className="item-details-item-name">
                      Item Name: {item.itemName}
                    </li>
                  </Link>
                  <li className="item-details-item-dkp">
                    DKP cost: {item.itemDKPCost}
                  </li>
                  <Link to={`/characters/${item.character.id}`}>
                    <li className="item-details-buyer-name">
                      Buyer Name: {item.character.characterName}
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
  allItems: state.allItems.collection,
  status: state.allItems.status,
});

const mapDispatchToProps = { getItems };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllItems)
);
