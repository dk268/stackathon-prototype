import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";
import { ADD_ITEM, DELETE_ITEM } from "./singleItem";

const DIRECT_OBJECT = "ITEMS";
export const LOADING_ITEMS = `LOADING_` + DIRECT_OBJECT;
const LOADED_ITEMS = `LOADED_` + DIRECT_OBJECT;
const ERROR_ITEMS = `ERROR_` + DIRECT_OBJECT;

export const getItems = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_ITEMS));
    const allItems = await Axios.get(`/api/items`);
    dispatch(aCC(LOADED_ITEMS, allItems.data));
  } catch (e) {
    dispatch(aCC(ERROR_ITEMS, e));
  }
};

export const addItem = itemData => async dispatch => {
  try {
    dispatch(aCC(LOADING_ITEMS));
    const newItem = await Axios.post(`/api/items`, itemData);
    dispatch(aCC(ADD_ITEM, newItem.data));
    return newItem.data;
  } catch (e) {
    dispatch(aCC(ERROR_ITEMS, e));
  }
};

export const deleteItem = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_ITEMS));
    const remainingItems = await Axios.delete(`/api/items/${id}`);
    dispatch(aCC(DELETE_ITEM, remainingItems));
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
    case ADD_ITEM:
      return {
        ...state,
        status: LOADED,
        collection: [...state.collection, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        status: LOADED,
        collection: action.payload,
      };
    case ERROR_ITEMS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allItems;
