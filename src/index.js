import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { throttle } from "lodash";
import configureStore, { history } from "./store/configureStore";
import App from "./App";

const store = configureStore();

const saveToLocalStorage = state => {
  try {
    window.localStorage.setItem("access_token", state.user.access_token);
  } catch (e) {
    console.log(e);
  }
};

store.subscribe(throttle(() => saveToLocalStorage(store.getState()), 1000));

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
