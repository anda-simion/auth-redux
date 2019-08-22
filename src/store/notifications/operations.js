import uuidv1 from "uuid";
import { addNotification, hideNotification } from "./creators";

export const addNotificationWithTimeout = (message, type) => {
  return dispatch => {
    const notification_id = uuidv1();
    dispatch(addNotification(message, type, notification_id));
    setTimeout(() => {
      dispatch(hideNotification(notification_id));
    }, 5000);
  };
};
