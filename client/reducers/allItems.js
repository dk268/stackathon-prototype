import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "ITEMS";
const LOADING_ITEMS = `${LOADING}_${DIRECT_OBJECT}`;
const LOADED_ITEMS = `${LOADED}_${DIRECT_OBJECT}`;
const ERROR_ITEMS = `${ERROR}_${DIRECT_OBJECT}`;

export const getItems = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_ITEMS));
    const allItems = await Axios.get(`/api/items`);
    dispatch(aCC(LOADED_ITEMS, allItems.data));
  } catch (e) {
    dispatch(aCC(ERROR_ITEMS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allItems = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEMS:
      return { ...state, status: LOADING };
    case LOADED_ITEMS:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_ITEMS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};
