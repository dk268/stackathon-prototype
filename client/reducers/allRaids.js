import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";
import { ADD_RAID, DELETE_RAID } from "./singleRaid";

const DIRECT_OBJECT = "RAIDS";
const LOADING_RAIDS = `LOADING_` + DIRECT_OBJECT;
const LOADED_RAIDS = `LOADED_` + DIRECT_OBJECT;
const ERROR_RAIDS = `ERROR_` + DIRECT_OBJECT;

export const getRaids = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_RAIDS));
    const allRaids = await Axios.get(`/api/raids`);
    dispatch(aCC(LOADED_RAIDS, allRaids.data));
  } catch (e) {
    dispatch(aCC(ERROR_RAIDS, e));
  }
};
export const addRaid = raidData => async dispatch => {
  try {
    dispatch(aCC(LOADING_RAIDS));
    const newRaid = await Axios.post(`/api/raids`, raidData);
    dispatch(aCC(ADD_RAID, newRaid.data));
  } catch (e) {
    dispatch(aCC(ERROR_RAIDS, e));
  }
};

export const deleteRaid = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_RAIDS));
    const remainingRaids = await Axios.delete(`/api/raids/${id}`);
    dispatch(aCC(DELETE_RAID, id));
  } catch (e) {
    dispatch(aCC(ERROR_RAIDS, e));
  }
};
const initialState = { status: UNASKED, collection: [] };

const allRaids = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RAIDS:
      return { ...state, status: LOADING };
    case LOADED_RAIDS:
      return { ...state, status: LOADED, collection: action.payload };
    case ADD_RAID:
      return {
        ...state,
        status: LOADED,
        collection: [...state.collection, action.payload],
      };
    case DELETE_RAID:
      return {
        ...state,
        status: LOADED,
        collection: action.payload,
      };
    case ERROR_RAIDS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allRaids;
