import uuidv1 from "uuid";

export const addNotification = (message, notification_type, id) => ({
    type: "ADD_NOTIFICATION",
    message: message,
    notification_type: notification_type,
    id: id
});

export const hideNotification = id => ({
    type: "HIDE_NOTIFICATION",
    id: id
});

export const addNotificationWithTimeout = (message, type) => {
    return dispatch => {
        const notification_id = uuidv1();
        dispatch(addNotification(message, type, notification_id));
        setTimeout(() => {
            dispatch(hideNotification(notification_id));
        }, 5000); 
    }
}