import Axios from "axios";
import { aCC } from ".";

export const WRITE_LOGIN_EMAIL = "WRITE_LOGIN_EMAIL";
export const WRITE_LOGIN_PASSWORD = "WRITE_LOGIN_PASSWORD";
export const WRITE_SIGNUP_EMAIL = "WRITE_SIGNUP_EMAIL";
export const WRITE_SIGNUP_PASSWORD = "WRITE_SIGNUP_PASSWORD";
export const CLEAR_AUTH_FIELDS = "CLEAR_AUTH_FIELDS";
export const SWAP_TYPE = "SWAP_TYPE";

export const writeLoginEmail = (actionType, str) => async dispatch => {
  try {
    dispatch(aCC(actionType, str));
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  loginEmail: "",
  loginPassword: "",
  signupEmail: "",
  signupPassword: "",
  isLogin: true,
};

const forms = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_LOGIN_EMAIL:
      return { ...state, loginEmail: action.payload };
    case WRITE_LOGIN_PASSWORD:
      return { ...state, loginPassword: action.payload };
    case WRITE_SIGNUP_EMAIL:
      return { ...state, signupEmail: action.payload };
    case WRITE_SIGNUP_PASSWORD:
      return { ...state, signupPassword: action.payload };
    case CLEAR_AUTH_FIELDS:
      return initialState;
    case SWAP_TYPE:
      return { ...state, isLogin: !state.isLogin };
    default:
      return state;
  }
};

export default forms;
