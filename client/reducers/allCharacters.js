import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";
import { ADD_CHARACTER, DELETE_CHARACTER } from "./singleCharacter";

const DIRECT_OBJECT = "CHARACTERS";
export const LOADING_CHARACTERS = `LOADING_` + DIRECT_OBJECT;
const LOADED_CHARACTERS = `LOADED_` + DIRECT_OBJECT;
const ERROR_CHARACTERS = `ERROR_` + DIRECT_OBJECT;

export const addCharacter = characterData => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHARACTERS));
    const newCharacter = await Axios.post(`/api/characters`, characterData);
    dispatch(aCC(ADD_CHARACTER, newCharacter.data));
    return newCharacter.data;
  } catch (e) {
    dispatch(aCC(ERROR_CHARACTERS, e));
  }
};

export const deleteCharacter = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHARACTERS));
    const remainingCharacters = await Axios.delete(`/api/characters/${id}`);
    dispatch(aCC(DELETE_CHARACTER, remainingCharacters));
  } catch (e) {
    dispatch(aCC(ERROR_CHARACTERS, e));
  }
};

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
    case ADD_CHARACTER:
      return {
        ...state,
        status: LOADED,
        collection: [...state.collection, action.payload],
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        status: LOADING,
        collection: action.payload,
      };
    case ERROR_CHARACTERS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allCharacters;
