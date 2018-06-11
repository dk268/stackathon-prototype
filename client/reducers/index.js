import { combineReducers, createStore } from "redux";
import allCharacters from "./allCharacters.js";
import allItems from "./allItems.js";
import allRaids from "./allRaids.js";
import singleCharacter from "./singleCharacter.js";
import singleItem from "./singleItem.js";
import singleRaid from "./singleRaid.js";
import Axios from "axios";

export const [UNASKED, LOADING, LOADED, ERROR] = [
  `UNASKED`,
  `LOADING`,
  `LOADED`,
  `ERROR`,
];

initialState = { status: UNASKED };

const status = (state = initialState, action) => {
  switch (action.type) {
    case UNASKED:
      return { ...state, UNASKED };
    case LOADING:
      return { ...state, LOADING };
    case LOADED:
      return { ...state, LOADED };
    case ERROR:
      return { ...state, ERROR };
  }
};

const rootReducer = combineReducers({
  allCharacters,
  allItems,
  allRaids,
  singleCharacter,
  singleItem,
  singleRaid,
  status,
});

export const aCC = (type, payload) => ({ type, payload });

export default rootReducer;
