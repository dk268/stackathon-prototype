import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCharacters } from "../reducers/allCharacters";
import { UNASKED, LOADING, LOADED, ERROR } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";
import Error from "./Error";

class AllCharacters extends Component {
  componentDidMount = () => {
    this.props.getCharacters();
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case ERROR:
        return <Error componentName="AllCharacters" />;
      case LOADING:
        return <Loading name="all characters" />;
      case LOADED:
        return (
          <div id="all-characters">
            {this.props.allCharacters.map(character => (
              <div key={character.id}>
                <ul className="character-details">
                  <Link to={`/characters/${character.id}`}>
                    <li className="character-details-character-name">
                      Char Name: {character.characterName}
                    </li>
                  </Link>
                  <li className="character-details-character-dkp">
                    DKP total: {character.dkp}
                  </li>
                  <li className="character-details-character-is-alt">
                    {character.isAlt ? `alternate` : `main`}
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
  allCharacters: state.allCharacters.collection,
  status: state.allCharacters.status,
});

const mapDispatchToProps = { getCharacters };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllCharacters)
);
