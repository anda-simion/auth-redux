import { ADD_NOTIFICATION, HIDE_NOTIFICATION } from "./types";

const initial_state = [];

const notificationsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          message: action.message,
          type: action.notification_type,
          id: action.id
        }
      ];
    case HIDE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.id);
    default:
      return state;
  }
};

export default notificationsReducer;
