import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "CHECKPOINT";
const LOADING_CHECKPOINT = `LOADING_` + DIRECT_OBJECT;
const LOADED_CHECKPOINT = `LOADED_` + DIRECT_OBJECT;
const ERROR_CHECKPOINT = `ERROR_` + DIRECT_OBJECT;
export const ADD_CHECKPOINT = `ADD_` + DIRECT_OBJECT;
const EDIT_CHECKPOINT = `EDIT_` + DIRECT_OBJECT;
export const DELETE_CHECKPOINT = `DELETE_` + DIRECT_OBJECT;

export const getSingleCheckpoint = id => async dispatch => {
  try {
    dispatch(aCC(LOADING_CHECKPOINT));
    const singleCheckpoint = await Axios.get(`/api/checkpoints/${id}`);
    dispatch(aCC(LOADED_CHECKPOINT, singleCheckpoint.data));
  } catch (e) {
    dispatch(aCC(ERROR_CHECKPOINT, e));
  }
};

export const editCheckpoint = async checkpointData => {
  try {
    dispatch(aCC(LOADING_CHARACTER));
    const singleCheckpoint = await Axios.put(
      `/api/checkpoints/${checkpointData.id}`,
      { checkpointData, where: { id: checkpointData.id } }
    );
    dispatch(aCC(EDIT_CHARACTER, singleCheckpoint.data));
  } catch (e) {
    dispatch(aCC(ERROR_CHARACTER, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleCheckpoint = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHECKPOINT:
      return { ...state, status: LOADING };
    case LOADED_CHECKPOINT:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_CHECKPOINT:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleCheckpoint;
