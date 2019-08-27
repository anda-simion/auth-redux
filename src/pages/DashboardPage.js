import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Spin } from "antd";
import { getLoggedInUser } from "../store/user/operations";
import { logoutUser } from "../store/user/creators";
import { userSelector } from "../store/user/selectors";

class DashboardPage extends Component {
  componentDidMount = _ => {
    if (!this.props.user) {
      this.props.getLoggedInUser();
    }
  };

  render() {
    return (
      <div>
        <h1>This is Dashboard</h1>
        {this.props.user ? <h2>Hello {this.props.user.f_name}</h2> : <Spin />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state)
});

export default connect(
  mapStateToProps,
  { logoutUser, push, getLoggedInUser }
)(DashboardPage);
