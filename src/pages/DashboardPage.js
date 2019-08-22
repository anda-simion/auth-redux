import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Spin } from "antd";
import { isLoggedIn } from "../services/users";
import { getLoggedInUser } from "../redux/actions/userActions";
import { logoutUser } from "../redux/actions/authActions";

class DashboardPage extends Component {
  componentDidMount = _ => {
    if (!isLoggedIn()) {
      this.props.logoutUser();
      this.props.push("/login");
    } else if (!this.props.user_info) {
      this.props.getLoggedInUser();
    }
  };

  render() {
    return (
      <div>
        <h1>This is Dashboard</h1>
        {this.props.is_user_info_available ? <h2>Hello {this.props.user.f_name}</h2> : <Spin />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user_info,
  is_user_info_available: state.userReducer.is_user_info_available,
  is_loading: state.userReducer.is_loading,
  is_logged_in: state.userReducer.is_logged_in
});

export default connect(
  mapStateToProps,
  { logoutUser, push, getLoggedInUser }
)(DashboardPage);
