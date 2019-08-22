import { isLoggedIn } from "../../services/users";
import * as types from "./types";

const initial_state = {
  user_info: null,
  is_user_info_available: false,
  is_loading: false,
  is_logged_in: isLoggedIn() //for when the user refreshes the page
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case types.USER_IS_LOGGING_IN:
      return { ...state, is_loading: true };
    case types.LOGIN_FAILED:
      return { ...state, is_loading: false, is_logged_in: false };
    case types.USER_IS_LOGGED_IN:
      return { ...state, is_logged_in: true, is_loading: false };
    case types.USER_INFO_IS_LOADING:
      return { ...state, is_loading: true };
    case types.USER_INFO_IS_AVAILABLE:
      return { ...state, user_info: action.payload, is_user_info_available: true, is_loading: false };
    case types.REGISTRATION_IN_PROGRESS:
      return { ...state, is_loading: true };
    case types.REGISTRATION_FAILED:
      return { ...state, is_loading: false };
    case types.REGISTRATION_FINALIZED:
      return { ...state, is_loading: false };
    case types.LOGOUT_USER:
      return { ...state, user_info: null, is_user_info_available: false, is_loading: false, is_logged_in: false };
    default:
      return state;
  }
};

export default userReducer;
