import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "ITEM";
const LOADING_ITEM = `${LOADING}_${DIRECT_OBJECT}`;
const LOADED_ITEM = `${LOADED}_${DIRECT_OBJECT}`;
const ERROR_ITEM = `${ERROR}_${DIRECT_OBJECT}`;

export const getSingleItem = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_ITEM));
    const singleItem = await Axios.get(`/api/items/${id}`);
    dispatch(aCC(LOADED_ITEM, singleItem.data));
  } catch (e) {
    dispatch(aCC(ERROR_ITEM, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleItem = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEM:
      return { ...state, status: LOADING };
    case LOADED_ITEM:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_ITEM:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};
