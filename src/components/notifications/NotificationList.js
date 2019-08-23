import React from "react";
import Notification from "./Notification";

const NotificationList = props => {
  return (
    <div>
      {props.notifications.map(notification => (
        <Notification key={notification.id} type={notification.type} message={notification.message} />
      ))}
    </div>
  );
};

export default NotificationList;
