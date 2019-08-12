import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Spin } from "antd";
import { isLoggedIn } from "../services/users";
import { logoutUser } from "../redux/actions/authActions";
const DashboardPage = (props) => {
    
  if(!isLoggedIn()) {
    props.logoutUser();
    props.push("/login");
  };

  return (
    <div>
      <h1>This is Dashboard</h1>
      {!props.is_user_info_available && <Spin />}
      {
        props.is_user_info_available ?
          <h2>Hello {props.user.f_name}</h2> : null
      }
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.userReducer.user_info,
  is_user_info_available: state.userReducer.is_user_info_available,
  is_loading: state.userReducer.is_loading,
  is_logged_in: state.userReducer.is_logged_in
})

export default connect(mapStateToProps, {logoutUser, push})(DashboardPage);
