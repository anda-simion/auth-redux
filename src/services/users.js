import fetch from "cross-fetch";
import { IAM_API } from "../config";


export const getLoggedInUser = () => {
    const getUserPromise = new Promise((resolve, reject) => {
      fetchWithAuthorization()
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


export const fetchWithAuthorization = ( options={} ) => {
  const access_token = window.localStorage.getItem("access_token");
  const user_guid = getUserGuidFromAccessToken(access_token);
  const url = `${IAM_API}/user/${user_guid}`;
  const merged_headers = Object.assign({
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`
  }, options.headers);
  const merged_options = Object.assign(options, {
    headers: merged_headers
  });
  return fetch(url, merged_options);
}

export const isLoggedIn = () => {
    return window.localStorage.getItem("access_token") ? true : false;
};

export const getUserGuidFromAccessToken = access_token => {
  const token_body = JSON.parse(atob(access_token.split(".")[1]));
  return token_body.identity;
};
