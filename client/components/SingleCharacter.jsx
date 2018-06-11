import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSingleCharacter } from "../reducers/singleCharacter";
import { getAllRaids } from "../reducers/allRaids";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";

class SingleCharacter extends Component {
  componentDidMount = () => {
    getSingleCharacter();
    getAllRaids();
  };
  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="SingleCharacter" />;
      case LOADING:
        return <Loading name="single character" />;
      case LOADED:
        return (
          <div id="single-character-div">
            <h2>{this.props.singleCharacter.characterName}</h2>
            <h6>{this.props.singleCharacter.dkp}</h6>
            <p>attendance: </p>
          </div>
        );
      default:
        return <p>DOOOM</p>;
    }
  };
}

const mapStateToProps = state => ({
  singleCharacter: state.singleCharacter.collection,
  status: state.singleCharacter.status,
  allRaids: state.allRaids.collection,
});

const mapDispatchToProps = { getSingleCharacter, getAllRaids };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleCharacter)
);
