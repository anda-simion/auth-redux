import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/configureStore";
import { getLoggedInUser, isLoggedIn } from "./services/users";
import App from "./App";

const store = configureStore();

if (isLoggedIn()) {
  store.dispatch(getLoggedInUser());
}

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
