import fetch from "cross-fetch";
import { IAM_API } from "../../config";
import { getLoggedInUser, getUserGuidFromAccessToken } from "../../services/users";

export const authenticate = (user_name, password, onLoginSuccess, onLoginError) => {
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
        window.localStorage.setItem("access_token", body.access_token);
        dispatch(userIsLoggedIn());
        onLoginSuccess();
        const access_token = body.access_token;
        const user_guid = getUserGuidFromAccessToken(access_token);
        return getLoggedInUser(access_token, user_guid);
      })
      .then(user_info => {
        dispatch(userInfoIsAvailable(user_info));
      })
      .catch(error => {
        onLoginError();
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
