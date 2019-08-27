import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

export const history = createBrowserHistory();

const loadFromLocalStorage = _ => {
  try {
    const access_token = window.localStorage.getItem("access_token");
    if (access_token === null) return undefined;
    return access_token;
  } catch (e) {
    console.log(e);
  }
};

const persisted_state = {
  validations: {},
  notifications: [],
  user: {
    is_loading: false,
    is_logged_in: false,
    user: null,
    access_token: loadFromLocalStorage()
  }
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    rootReducer(history),
    persisted_state,
    composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
  );

  return store;
};

export default configureStore;
