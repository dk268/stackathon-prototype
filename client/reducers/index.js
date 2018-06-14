import { combineReducers, createStore } from "redux";
import allCharacters from "./allCharacters.js";
import allItems from "./allItems.js";
import allRaids from "./allRaids.js";
import singleCharacter from "./singleCharacter.js";
import singleItem from "./singleItem.js";
import singleRaid from "./singleRaid.js";
import Axios from "axios";
import allCheckpoints from "./allCheckpoints.js";
import singleCheckpoint from "./singleCheckpoint.js";
import auth from "./auth.js";
import forms from "./forms.js";

export const [UNASKED, LOADING, LOADED, ERROR] = [
  `UNASKED`,
  `LOADING`,
  `LOADED`,
  `ERROR`,
];

const initialState = UNASKED;

const globalStatus = (state = initialState, action) => {
  switch (action.type) {
    case UNASKED:
      return UNASKED;
    case LOADING:
      return LOADING;
    case LOADED:
      return LOADED;
    case ERROR:
      return ERROR;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  allCharacters,
  allItems,
  allRaids,
  allCheckpoints,
  auth,
  forms,
  singleCharacter,
  singleItem,
  singleRaid,
  singleCheckpoint,
  globalStatus,
});
export const aCC = (type, payload) => ({ type, payload });

export default rootReducer;
