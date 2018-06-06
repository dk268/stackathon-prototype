import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "RAIDS";
const LOADING_RAIDS = `${LOADING}_${DIRECT_OBJECT}`;
const LOADED_RAIDS = `${LOADED}_${DIRECT_OBJECT}`;
const ERROR_RAIDS = `${ERROR}_${DIRECT_OBJECT}`;

export const getRaids = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_RAIDS));
    const allRaids = await Axios.get(`/api/raids`);
    dispatch(aCC(LOADED_RAIDS, allRaids.data));
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
    case ERROR_RAIDS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};
