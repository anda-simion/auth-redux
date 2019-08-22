import { ADD_NOTIFICATION, HIDE_NOTIFICATION } from "./types";

const initial_state = {
  notifications: []
};

const notificationReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.concat({
          message: action.message,
          type: action.notification_type,
          id: action.id
        })
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.id)
      };
    default:
      return state;
  }
};

export default notificationReducer;
