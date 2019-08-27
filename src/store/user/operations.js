import fetch from "cross-fetch";
import { push } from "connected-react-router";
import { IAM_API } from "../../config";
import { addNotificationWithTimeout } from "../notifications/operations";
import {
  userIsLoggingIn,
  userIsLoggedIn,
  loginFailed,
  userIsLoading,
  getUser,
  registrationInProgress,
  registrationFinalized,
  registrationFailed
} from "./creators";
import { getUserGuidFromAccessToken, fetchWithAuthorization } from "../../services/users";

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
        dispatch(userIsLoggedIn(body.access_token));
        dispatch(addNotificationWithTimeout("Login successful", "success"));
        dispatch(addNotificationWithTimeout("You are redirected to dashboard", "info"));
        dispatch(push("/dashboard"));
      })
      .catch(error => {
        dispatch(loginFailed());
        dispatch(addNotificationWithTimeout(error.message, "error"));
      });
  };
};

export const getLoggedInUser = () => {
  return dispatch => {
    dispatch(userIsLoading());
    const access_token = window.localStorage.getItem("access_token");
    const user_guid = getUserGuidFromAccessToken(access_token);
    fetchWithAuthorization(`${IAM_API}/user/${user_guid}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Fetch error status ${response.status}`);
        }
      })
      .then(body => {
        //body is a object that contains the user's info
        dispatch(getUser(body));
      })
      .catch(error => {
        dispatch(addNotificationWithTimeout(error.message, "error"));
        dispatch(addNotificationWithTimeout("You are being redirected to login page", "info"));
        dispatch(push("/logout"));
      });
  };
};

export const register = (email, first_name, last_name, password) => {
  return dispatch => {
    dispatch(registrationInProgress());
    fetch(`${IAM_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_name: email,
        f_name: first_name,
        l_name: last_name,
        pw: password,
        email: email,
        locale: "en_US",
        timezone: "Europe/Bucharest"
      })
    })
      .then(response => {
        if (response.status === 201) {
          dispatch(registrationFinalized());
          return response.json();
        } else {
          throw Error(
            JSON.stringify({
              status_code: response.status,
              message:
                response.status === 409
                  ? "Cannot create 2 users with the same user name"
                  : `Something when wrong during registration, status code: ${response.code}`
            })
          );
        }
      })
      .then(body => {
        dispatch(addNotificationWithTimeout("Registration successful", "success"));
        dispatch(authenticate(email, password));
      })
      .catch(error => {
        dispatch(registrationFailed());
        let error_message = JSON.parse(error.message).message;
        dispatch(addNotificationWithTimeout(error_message, "error"));
      });
  };
};
