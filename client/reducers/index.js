import { combineReducers, createStore } from "redux";
import allCharacters from "./allCharacters.js";
import allItems from "./allItems.js";
import allRaids from "./allRaids.js";
import singleCharacter from "./singleCharacter.js";
import singleItem from "./singleItem.js";
import singleRaid from "./singleRaid.js";
import Axios from "axios";

const rootReducer = combineReducers({
  allCharacters,
  allItems,
  allRaids,
  singleCharacter,
  singleItem,
  singleRaid
});

export const [UNASKED, LOADING, LOADED, ERROR] = [
  `UNASKED`,
  `LOADING`,
  `LOADED`,
  `ERROR`
];

export const aCC = (type, payload) => ({ type, payload });

export default rootReducer;
