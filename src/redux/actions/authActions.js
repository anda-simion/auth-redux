import fetch from "cross-fetch";
import { push } from "connected-react-router";
import { IAM_API } from "../../config";
import { addNotificationWithTimeout } from "../actions/notificationActions";

export const authenticate = (user_name, password) => {
  return dispatch => {
    dispatch(userIsLoggingIn());

    fetch(`${IAM_API}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_name: user_name, password: password })
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Login error, status code ${response.status}`);
        }
      })
      .then(body => {
        //body is a object with access_token and refresh_token
        dispatch(userIsLoggedIn());
        window.localStorage.setItem("access_token", body.access_token);
        dispatch(addNotificationWithTimeout("Login successfull", "success"));
        dispatch(addNotificationWithTimeout("You are redirected to dashboard", "info"));
        dispatch(push("/dashboard"));
      })
      .catch(error => {
        dispatch(loginFailed());
        dispatch(addNotificationWithTimeout(error.message, "error"));
      });
  };
};

export const userIsLoggingIn = _ => ({
  type: "USER_IS_LOGGING_IN"
});

export const loginFailed = _ => ({
  type: "LOGIN_FAILED"
});

export const userIsLoggedIn = _ => ({
  type: "USER_IS_LOGGED_IN"
});

export const userInfoIsLoading = _ => ({
  type: "USER_INFO_IS_LOADING"
});

export const userInfoIsAvailable = user_info => ({
  type: "USER_INFO_IS_AVAILABLE",
  payload: user_info
});

export const logoutUser = _ => ({
  type: "LOGOUT_USER"
});
