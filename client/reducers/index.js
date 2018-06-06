import { combineReducers, createStore } from "redux";
import allCharacters from "./allCharacters";
import allItems from "./allItems";
import allRaids from "./allRaids";
import singleCharacter from "./singleCharacter";
import singleItem from "./singleItem";
import singleRaid from "./singleRaid";
import Axios from "axios";

const rootReducer = combineReducers(
  allCharacters,
  allItems,
  allRaids,
  singleCharacter,
  singleItem,
  singleRaid
);

export const [UNASKED, LOADING, LOADED, ERROR] = [
  `UNASKED`,
  `LOADING`,
  `LOADED`,
  `ERROR`
];
export const aCC = (type, payload) => ({ type, payload });

export default rootReducer;
