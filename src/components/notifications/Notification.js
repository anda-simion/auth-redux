import React from "react";
import "./Notifications.css";

const Notification = props => {
  return <div className={`notification ${props.type}`}>{props.message}</div>;
};

export default Notification;
