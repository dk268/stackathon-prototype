import React, { Component } from "react";
import { connect } from "react-redux";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";
import { getCharacters } from "../reducers/allCharacters";
import { Link } from "react-router-dom";

class TableCharacters extends Component {
  componentDidMount = () => {
    this.props.getCharacters();
  };
  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="TableCharacters" />;
      case LOADING:
        return <Loading name="table of characters" />;
      case LOADED: {
        const filteredCharacters = this.props.allCharacters.filter(
          character =>
            character.items.filter(
              item => item.itemName === this.props.item.itemName
            ).length
        );
        return (
          <div id="table-raids-div">
            {filteredCharacters.map(character => (
              <li key={character.id}>
                <Link to={`/characters/${character.id}`}>
                  {character.characterName}
                </Link>{" "}
                for {this.props.item.itemDKPCost} dkp
              </li>
            ))}
          </div>
        );
      }
      default:
        return <Unasked />;
    }
  };
}

const mapStateToProps = state => ({
  status: state.allCharacters.status,
  allCharacters: state.allCharacters.collection,
});

const mapDispatchToProps = { getCharacters };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCharacters);
