import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/configureStore";
import { getLoggedInUser, isLoggedIn } from "./services/users";
import { userIsLoggedIn, userInfoIsAvailable } from "./redux/actions/authActions";
import App from "./App";

const store = configureStore();

if (isLoggedIn()) {
  getLoggedInUser()
    .then(user_info => {
      store.dispatch(userIsLoggedIn());
      store.dispatch(userInfoIsAvailable(user_info));
    })
};

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
