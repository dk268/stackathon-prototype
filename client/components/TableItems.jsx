import React, { Component } from "react";
import { connect } from "react-redux";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import { getItems } from "../reducers/allItems";

class TableItems extends Component {
  componentDidMount = () => {
    this.props.getItems();
  };
  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="TableItems" />;
      case LOADING:
        return <Loading name="table of items" />;
      case LOADED: {
        const filteredItems = this.props.allItems.filter(
          item => item.character.id === this.props.character.id
        );
        return <div id="table-raids-div">Hi!</div>;
      }
      default:
        return <Unasked />;
    }
  };
}

const mapStateToProps = state => ({
  status: state.allItems.status,
  allItems: state.allItems.collection,
});

const mapDispatchToProps = { getItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableItems);
