import fetch from "cross-fetch";

export const fetchWithAuthorization = (url, options = {}) => {
  const access_token = window.localStorage.getItem("access_token");
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
  try {
    const token_body = JSON.parse(atob(access_token.split(".")[1]));
    return token_body.identity;
  } catch (e) {
    console.log(e.message);
  }
};
