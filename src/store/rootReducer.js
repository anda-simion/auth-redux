import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user/reducers";
import notificationsReducer from "./notifications/reducers";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    notifications: notificationsReducer
  });

export default rootReducer;
