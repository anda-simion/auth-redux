import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../../components/LoginForm";
import { authenticate } from "../../store/user/operations";
import { isLoadingSelector } from "../../store/user/selectors";
import { validationsSelector } from "../../store/validations/selectors";
import { addValidationErrors, removeValidationErrors } from "../../store/validations/creators";

class Login extends Component {
  performSubmit = (user_name, password) => {
    this.props.authenticate(user_name, password);
  };

  render() {
    return (
      <div>
        <LoginForm
          submitForm={this.performSubmit}
          addValidationErrors={this.props.addValidationErrors}
          removeValidationErrors={this.props.removeValidationErrors}
          is_loading={this.props.is_loading}
          validation_errors={this.props.validation_errors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  is_loading: isLoadingSelector(state),
  validation_errors: validationsSelector(state)
});

export default connect(
  mapStateToProps,
  { authenticate, addValidationErrors, removeValidationErrors }
)(Login);
