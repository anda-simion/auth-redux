const initial_state = {
  user_info: null,
  is_user_info_available: false,
  is_loading: false,
  is_logged_in: false
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "USER_IS_LOGGING_IN":
      return { ...state, is_loading: true};
    case "LOGIN_FAILED":
      return { ...state, is_loading: false};
    case "USER_IS_LOGGED_IN":
      return { ...state, is_logged_in: true, is_loading: false};
    case "USER_INFO_IS_LOADING":
      return { ...state, is_loading: true};
    case "USER_INFO_IS_AVAILABLE":
      return { ...state, user_info: action.payload, is_user_info_available: true, is_loading: false };
    case "REGISTRATION_IN_PROGRESS":
      return { ...state, is_loading: true };
    case "REGISTRATION_FINALISED":
      return { ...state, is_loading: false };
    case "LOGOUT_USER":
      return { ...state, user_info: null, is_user_info_available: false, is_logged_in: false };
    default:
      return state;
  }
};

export default userReducer;