import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { sendLoginRequest } from "../redux/actions/actions";

export class Login extends Component {
  onLoginSuccess = _ => {
    console.log("Login: success");
  };

  onLogingError = _ => {
    console.log("Login: error");
  };

  performSubmit = (user_name, password) => {
    this.props.sendLoginRequest(user_name, password, this.onLoginSuccess, this.onLogingError);
  };

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.performSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendLoginRequest: userInfo => dispatch(sendLoginRequest(userInfo))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
