import * as types from "./types";

export const userIsLoggingIn = _ => ({
  type: types.USER_IS_LOGGING_IN
});

export const loginFailed = _ => ({
  type: types.LOGIN_FAILED
});

export const userIsLoggedIn = (access_token, refresh_token) => ({
  type: types.USER_IS_LOGGED_IN,
  access_token: access_token,
  refresh_token: refresh_token
});

export const logoutUser = _ => ({
  type: types.LOGOUT_USER
});

export const userIsLoading = _ => ({
  type: types.USER_IS_LOADING
});

export const getUser = user => ({
  type: types.GET_USER,
  user: user
});

export const registrationInProgress = _ => ({
  type: types.REGISTRATION_IN_PROGRESS
});

export const registrationFailed = _ => ({
  type: types.REGISTRATION_FAILED
});

export const registrationFinalized = _ => ({
  type: types.REGISTRATION_FINALIZED
});
