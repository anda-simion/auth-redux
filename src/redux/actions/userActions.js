import { push } from "connected-react-router";
import { fetchWithAuthorization, getUserGuidFromAccessToken } from "../../services/users";
import { IAM_API } from "../../config";
import { addNotificationWithTimeout } from "../actions/notificationActions";

export const getLoggedInUser = () => {
    return dispatch => {
      dispatch(userInfoIsLoading());
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
          dispatch(userInfoIsAvailable(body));
        })
        .catch(error => {
          dispatch(addNotificationWithTimeout(error.message, "error"));
          dispatch(addNotificationWithTimeout("You are being redirected to login page", "info"));
          dispatch(push("/logout"));
        });
    };
};

export const userInfoIsLoading = _ => ({
    type: "USER_INFO_IS_LOADING"
});

export const userInfoIsAvailable = user_info => ({
    type: "USER_INFO_IS_AVAILABLE",
    payload: user_info
});
  