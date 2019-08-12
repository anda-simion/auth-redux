import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import LoginForm from "../components/LoginForm";
import { authenticate, loginFailed } from "../redux/actions/authActions";
import { addNotificationWithTimeout } from "../redux/actions/notificationActions";

class Login extends Component {
  onLoginSuccess = () => {
    this.props.addNotificationWithTimeout("Login successfull", "success");
    this.props.addNotificationWithTimeout("You are redirected to dashboard", "info");
    this.props.push("/dashboard");
  };

  onLogingError = () => {
    this.props.loginFailed();
    this.props.addNotificationWithTimeout("Wrong user name or password", "error");
  };

  performSubmit = (user_name, password) => {
    this.props.authenticate(user_name, password, this.onLoginSuccess, this.onLogingError);
  };

  render() {
    console.log("props from Login container", this.props);
    return (
      <div>
        <LoginForm submitForm={this.performSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { push, authenticate, loginFailed, addNotificationWithTimeout }
)(Login);
