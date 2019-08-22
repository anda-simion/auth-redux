import { ADD_NOTIFICATION, HIDE_NOTIFICATION } from "./types";

export const addNotification = (message, notification_type, id) => ({
  type: ADD_NOTIFICATION,
  message: message,
  notification_type: notification_type,
  id: id
});

export const hideNotification = id => ({
  type: HIDE_NOTIFICATION,
  id: id
});
