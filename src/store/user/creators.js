import * as types from "./types";

export const userIsLoggingIn = _ => ({
  type: types.USER_IS_LOGGING_IN
});

export const loginFailed = _ => ({
  type: types.LOGIN_FAILED
});

export const userIsLoggedIn = _ => ({
  type: types.USER_IS_LOGGED_IN
});

export const logoutUser = _ => ({
  type: types.LOGOUT_USER
});

export const userInfoIsLoading = _ => ({
  type: types.USER_INFO_IS_LOADING
});

export const userInfoIsAvailable = user_info => ({
  type: types.USER_INFO_IS_AVAILABLE,
  payload: user_info
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
