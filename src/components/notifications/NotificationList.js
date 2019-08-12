import React, { Component } from 'react';
import { connect } from "react-redux";
import Notification from "./Notification";

class NotificationList extends Component {
    componentDidMount = _ => {
        console.log("NotificationList was mounted");
        console.log("notifications in NotificationList", this.props.notifications)
    }
    render() {
        return (
            <div>
                {   
                        this.props.notifications.map(notification => (
                            <Notification 
                                key={notification.id}
                                type={notification.type}
                                message={notification.message}
                            />
                        ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notifications:  state.notificationReducer.notifications
  });

export default connect(mapStateToProps, null)(NotificationList);
