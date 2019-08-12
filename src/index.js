import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/configureStore";
import { getLoggedInUser, getUserGuidFromAccessToken, isLoggedIn } from "./services/users";
import { userIsLoggedIn, userInfoIsAvailable } from "./redux/actions/authActions";
import App from "./App";

const store = configureStore();

if (isLoggedIn()) {
  const access_token = window.localStorage.getItem("access_token");
  const user_guid = getUserGuidFromAccessToken(access_token);
  getLoggedInUser(access_token, user_guid)
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
