import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { authenticate } from "../store/user/operations";

class Login extends Component {
  performSubmit = (user_name, password) => {
    this.props.authenticate(user_name, password);
  };

  render() {
    return (
      <div>
        <LoginForm submitForm={this.performSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(Login);
