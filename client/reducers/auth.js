import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aCC } from ".";

const DIRECT_OBJECT = "AUTH";
const LOADING_AUTH = "LOADING_" + DIRECT_OBJECT;
const NO_LOGIN_AUTH = "NO_LOGIN_" + DIRECT_OBJECT;
const LOGGED_IN_AUTH = "LOGGED_IN_" + DIRECT_OBJECT;
const ADMIN_AUTH = "ADMIN_" + DIRECT_OBJECT;
const ERROR_AUTH = `ERROR_` + DIRECT_OBJECT;

export const login = (userInfo, route) => async dispatch => {
  try {
    dispatch(aCC(LOADING_AUTH));
    const currentUser = await Axios.post(`/users/${route}`, userInfo);
    console.log(currentUser.data);
    switch (currentUser.data.isAdmin) {
      case true:
        dispatch(aCC(ADMIN_AUTH), currentUser.data);
      case false:
        dispatch(aCC(LOGGED_IN_AUTH), currentUser.data);
      default:
        dispatch(aCC(NO_LOGIN_AUTH));
    }
  } catch (e) {
    dispatch(aCC(ERROR_AUTH, { error: e }));
  }
};

const initialState = { status: NO_LOGIN_AUTH, collection: {}, error: {} };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case NO_LOGIN_AUTH:
      return { ...state, status: NO_LOGIN_AUTH };
    case LOGGED_IN_AUTH:
      return { ...state, status: LOGGED_IN_AUTH, collection: action.payload };
    case ADMIN_AUTH:
      return { ...state, status: ADMIN_AUTH, collection: action.payload };
    case ERROR_AUTH:
      return { ...state, status: ERROR, error: action.payload };
    default:
      return state;
  }
};

export default auth;
