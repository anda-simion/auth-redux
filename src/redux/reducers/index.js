import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import validationReducer from "./validationReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    validationReducer: validationReducer
  });

export default rootReducer;
