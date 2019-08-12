import fetch from "cross-fetch";
import { IAM_API } from "../config";

//fetch returns a promise??

export const getLoggedInUser = (access_token, user_guid) => {
    const getUserPromise = new Promise((resolve, reject) => {
      fetch(`${IAM_API}/user/${user_guid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Fetch error status ${response.status}`);
          }
        })
        .then(body => {
          resolve(body);
        })
        .catch(error => {
          if (error === "Fetch error status 401") {
            window.location.href = "/logout?redirect_to=login";
          }
          reject(error);
        });
    });
  
    return getUserPromise;
};

export const isLoggedIn = () => {
    return window.localStorage.getItem("access_token") ? true : false;
};

export const getUserGuidFromAccessToken = access_token => {
  const token_body = JSON.parse(atob(access_token.split(".")[1]));
  return token_body.identity;
};
