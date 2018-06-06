import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCharacters } from "../reducers/allCharacters";
import { UNASKED, LOADING, LOADED } from "../reducers";
import Unasked from "./Unasked";
import Loading from "./Loading";

class AllCharacters extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.getCharacters();
    console.log(this.props);
  };

  render = () => {
    switch (this.props.status) {
      case UNASKED:
        return <Unasked />;
      case LOADING:
        return <Loading name="all characters" />;
      case LOADED:
        return (
          <div id="all-characters">
            {this.props.allCharacters.map(character => (
              <div key={character.id}>
                <ul class="character-details">
                  <Link to={`/characters/${character.id}`}>
                    <li class="character-details-character-name">
                      Char Name: {character.characterName}
                    </li>
                  </Link>
                  <li class="character-details-character-dkp">
                    DKP total: {character.dkp}
                  </li>
                  <li class="character-details-character-is-alt">
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
  status: state.allCharacters.status
});

const mapDispatchToProps = { getCharacters };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllCharacters)
);
