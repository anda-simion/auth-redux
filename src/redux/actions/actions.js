import fetch from "cross-fetch";
import { IAM_API } from "../../config";

export const sendLoginRequest = (user_name, password, onLoginSuccess, onLoginError) => {
  return dispatch => {
    fetch(`${IAM_API}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_name, password })
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Login error, status code ${response.status}`);
        }
      })
      .then(body => {
        console.log(body);
        window.localStorage.setItem("access_token", body.access_token);
        //window.localStorage.setItem("user_guid", getUserGuidFromAccessToken(body.access_token));
        onLoginSuccess();
        dispatch(loginUser(body.user));
      })
      .catch(error => {
        console.log(error);
        onLoginError();
      });
  };
};

const loginUser = userObj => ({
  type: "LOGIN_USER",
  payload: userObj
});
