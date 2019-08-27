//import { isLoggedIn } from "../../services/users";
import * as types from "./types";

const initial_state = {
  user: null,
  is_loading: false,
  is_logged_in: false,
  access_token: null
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case types.USER_IS_LOGGING_IN:
      return { ...state, is_loading: true };
    case types.LOGIN_FAILED:
      return { ...state, is_loading: false, is_logged_in: false };
    case types.USER_IS_LOGGED_IN:
      return { ...state, is_logged_in: true, is_loading: false, access_token: action.access_token };
    case types.USER_IS_LOADING:
      return { ...state, is_loading: true };
    case types.GET_USER:
      return { ...state, user: action.user, is_loading: false, is_logged_in: true };
    case types.REGISTRATION_IN_PROGRESS:
      return { ...state, is_loading: true };
    case types.REGISTRATION_FAILED:
      return { ...state, is_loading: false };
    case types.REGISTRATION_FINALIZED:
      return { ...state, is_loading: false };
    case types.LOGOUT_USER:
      return { ...state, user: null, is_loading: false, is_logged_in: false, access_token: null };
    default:
      return state;
  }
};

export default userReducer;
