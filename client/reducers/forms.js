import Axios from "axios";
import { aCC } from ".";

const WRITE_LOGIN_EMAIL= "WRITE_LOGIN_EMAIL"
const WRITE_LOGIN_PASSWORD= "WRITE_LOGIN_PASSWORD"
const WRITE_SIGNUP_EMAIL= "WRITE_SIGNUP_EMAIL"
const WRITE_SIGNUP_PASSWORD= "WRITE_SIGNUP_PASSWORD"

export const writeLoginEmail = (actionType, str) => async dispatch => {
  try{
    aCC(actionType, str)
  } catch(e) {
    console.log(e);
  }
}

const initialState = {loginEmail: '', loginPassword:'', signupEmail:'', signupPassword:''}

const forms = (state = initialState, action) => {
  switch(action.type) {
    case WRITE_LOGIN_EMAIL: return {...state, loginEmail=action.payload}
    case WRITE_LOGIN_PASSWORD: return {...state, loginPassword=action.payload}
    case WRITE_SIGNUP_EMAIL: return {...state, signupEmail=action.payload}
    case WRITE_SIGNUP_PASSWORD: return {...state, signupPassword=action.payload}
    default : return state;
  }
}

export default forms;
