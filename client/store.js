import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import rootReducer from "./reducers/index.js";
import loggingMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

console.log(rootReducer);

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware
  )
);
