import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { logoutUser } from "../../store/user/creators";

const Logout = props => {
  window.localStorage.clear();
  props.logoutUser();
  props.push("/login");
  return <div />;
};

export default connect(
  null,
  { logoutUser, push }
)(Logout);
