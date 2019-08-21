import fetch from "cross-fetch";
import { push } from "connected-react-router";
import { IAM_API } from "../config";
import { logoutUser, userInfoIsLoading, userInfoIsAvailable } from "../redux/actions/authActions";
import { addNotificationWithTimeout } from "../redux/actions/notificationActions";

export const getLoggedInUser = () => {
  return dispatch => {
    dispatch(userInfoIsLoading());
    fetchWithAuthorization()
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Fetch error status ${response.status}`);
        }
      })
      .then(body => {
        //body is a object that contains the user's info
        dispatch(userInfoIsAvailable(body));
      })
      .catch(error => {
        if (error.message === "Fetch error status 401") {
          dispatch(addNotificationWithTimeout("Error during the retrieval of user info", "error"));
          dispatch(logoutUser());
          dispatch(addNotificationWithTimeout("You are being redirected to login page", "info"));
          dispatch(push("/login"));
        }
      });
  };
};

export const fetchWithAuthorization = (options = {}) => {
  const access_token = window.localStorage.getItem("access_token");
  const user_guid = getUserGuidFromAccessToken(access_token);
  const url = `${IAM_API}/user/${user_guid}`;
  const merged_headers = Object.assign(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    },
    options.headers
  );
  const merged_options = Object.assign(options, {
    headers: merged_headers
  });
  return fetch(url, merged_options);
};

export const isLoggedIn = () => {
  return window.localStorage.getItem("access_token") ? true : false;
};

export const getUserGuidFromAccessToken = access_token => {
  const token_body = JSON.parse(atob(access_token.split(".")[1]));
  return token_body.identity;
};
