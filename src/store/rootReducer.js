import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user/reducers";
import notificationReducer from "./notifications/reducers";
import validationReducer from "./validations/reducers";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    notifications: notificationReducer,
    validations: validationReducer
  });

export default rootReducer;
