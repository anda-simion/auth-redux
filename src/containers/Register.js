import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import RegisterForm from "../components/RegisterForm";
import { register } from "../redux/actions/registerActions";
import { authenticate } from "../redux/actions/authActions";
import { registrationFailed } from "../redux/actions/registerActions";
import { addNotificationWithTimeout } from "../redux/actions/notificationActions";

class Register extends Component {

  handleSubmit = (email, first_name, last_name, password) => {
    this.props.register(email, first_name, last_name, password);
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
