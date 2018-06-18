import React from "react";
import { Link } from "react-router-dom";

const RowCharacter = props => {
  return (
    <div id="row-character-div">
      <Link to={`/characters/${props.character.id}`}>
        {props.character.characterName}
      </Link>{" "}
      <br />
      character DKP total: {props.character.dkp}
      <br />
      {props.character.isAlt ? `alt` : ``}
    </div>
  );
};

const RowCharactersMapper = props => {
  return props.characters.map(character => (
    <RowCharacter character={character} key={character.id} />
  ));
};

export default RowCharactersMapper;
