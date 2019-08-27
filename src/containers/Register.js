import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterForm from "../components/RegisterForm";
import { register } from "../store/user/operations";
import { isLoadingSelector } from "../store/user/selectors";
import { validationsSelector } from "../store/validations/selectors";
import { addValidationErrors, removeValidationErrors } from "../store/validations/creators";

class Register extends Component {
  handleSubmit = (email, first_name, last_name, password) => {
    this.props.register(email, first_name, last_name, password);
  };

  render() {
    return (
      <div>
        <RegisterForm
          submitForm={this.handleSubmit}
          is_loading={this.props.is_loading}
          validation_errors={this.props.validation_errors}
          addValidationErrors={this.props.addValidationErrors}
          removeValidationErrors={this.props.removeValidationErrors}
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
  { register, addValidationErrors, removeValidationErrors }
)(Register);
