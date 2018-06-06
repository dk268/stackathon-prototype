import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "CHARACTERS";
const LOADING_CHARACTERS = `LOADING_` + DIRECT_OBJECT;
const LOADED_CHARACTERS = `LOADED_` + DIRECT_OBJECT;
const ERROR_CHARACTERS = `ERROR_` + DIRECT_OBJECT;

export const getCharacters = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHARACTERS));
    const allCharacters = await Axios.get(`/api/characters`);
    dispatch(aCC(LOADED_CHARACTERS, allCharacters.data));
  } catch (e) {
    dispatch(aCC(ERROR_CHARACTERS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allCharacters = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHARACTERS:
      return { ...state, status: LOADING };
    case LOADED_CHARACTERS:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_CHARACTERS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allCharacters;
