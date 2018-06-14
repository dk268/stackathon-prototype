import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "RAID";
const LOADING_RAID = `LOADING_` + DIRECT_OBJECT;
const LOADED_RAID = `LOADED_` + DIRECT_OBJECT;
const ERROR_RAID = `ERROR_` + DIRECT_OBJECT;
export const ADD_RAID = `ADD_` + DIRECT_OBJECT;
export const EDIT_RAID = `EDIT_` + DIRECT_OBJECT;
export const DELETE_RAID = `DELETE_` + DIRECT_OBJECT;

export const getSingleRaid = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_RAID));
    const singleRaid = await Axios.get(`/api/raids/${id}`);
    dispatch(aCC(LOADED_RAID, singleRaid.data));
  } catch (e) {
    dispatch(aCC(ERROR_RAID, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleRaid = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RAID:
      return { ...state, status: LOADING };
    case LOADED_RAID:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_RAID:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleRaid;
