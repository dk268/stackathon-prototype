import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";
import { ADD_CHECKPOINT, DELETE_CHECKPOINT } from "./singleCheckpoint";

const DIRECT_OBJECT = "CHECKPOINTS";
const LOADING_CHECKPOINTS = `LOADING_` + DIRECT_OBJECT;
const LOADED_CHECKPOINTS = `LOADED_` + DIRECT_OBJECT;
const ERROR_CHECKPOINTS = `ERROR_` + DIRECT_OBJECT;

export const getCheckpoints = () => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHECKPOINTS));
    const allCheckpoints = await Axios.get(`/api/checkpoints`);
    dispatch(aCC(LOADED_CHECKPOINTS, allCheckpoints.data));
  } catch (e) {
    dispatch(aCC(ERROR_CHECKPOINTS, e));
  }
};

export const addCheckpoint = checkpointData => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHECKPOINTS));
    const newCheckpoint = await Axios.post(`/api/checkpoints`, checkpointData);
    dispatch(aCC(ADD_CHECKPOINT, newCheckpoint.data));
  } catch (e) {
    dispatch(aCC(ERROR_CHECKPOINTS, e));
  }
};

export const deleteCheckpoint = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHECKPOINTS));
    await Axios.delete(`/api/checkpoints/${id}`);
    dispatch(aCC(DELETE_CHECKPOINT, id));
  } catch (e) {
    dispatch(aCC(ERROR_CHECKPOINTS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allCheckpoints = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHECKPOINTS:
      return { ...state, status: LOADING };
    case LOADED_CHECKPOINTS:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_CHECKPOINTS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allCheckpoints;
