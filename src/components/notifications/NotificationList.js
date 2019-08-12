import React from "react";
import { connect } from "react-redux";
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

const mapStateToProps = state => ({
  notifications: state.notificationReducer.notifications
});

export default connect(
  mapStateToProps,
  null
)(NotificationList);
