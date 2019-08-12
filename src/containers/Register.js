import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import RegisterForm from "../components/RegisterForm";
import { register } from "../redux/actions/registerActions";
import { authenticate } from "../redux/actions/authActions";
import { registrationFailed } from "../redux/actions/registerActions";
import { addNotificationWithTimeout } from "../redux/actions/notificationActions";

class Register extends Component {
  onRegisterSuccess = (email, password) => {
    this.props.authenticate(email, password, this.onLoginSuccess, this.onLoginError);
    this.props.addNotificationWithTimeout("Registration successfull", "success");
  };

  onRegisterError = () => {
    this.props.registrationFailed();
    this.props.addNotificationWithTimeout("Error during registration", "error");
  };

  onLoginSuccess = () => {
    this.props.addNotificationWithTimeout("Login successfull", "success");
    this.props.addNotificationWithTimeout("You are redirected to dashboard", "info");
    this.props.push("/dashboard");
  };

  onLoginError = () => {
    this.props.addNotificationWithTimeout("Wrong user name or password", "error");
  };

  handleSubmit = (email, first_name, last_name, password) => {
    this.props.register(email, first_name, last_name, password, this.onRegisterSuccess, this.onRegisterError);
  };

  render() {
    return (
      <div>
        <RegisterForm submitForm={this.handleSubmit} />
      </div>
    );
  }
}
const mapDispatchToProps = {
  register,
  authenticate,
  registrationFailed,
  addNotificationWithTimeout,
  push
};
export default connect(
  null,
  mapDispatchToProps
)(Register);
