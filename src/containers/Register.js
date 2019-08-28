import React, { Component } from "react";
import { connect } from "react-redux";
import { validate } from "validate.js";
import RegisterForm from "../components/RegisterForm";
import { register } from "../store/user/operations";
import { isLoadingSelector } from "../store/user/selectors";
import { register_constraints } from "../services/validators";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation_errors: {}
    };
  }

  handleSubmit = (email, first_name, last_name, password, repeat_password, agreement_checked) => {
    // validate_errors will be undefined if there are no validation error
    // otherwise it will be an object with the following format {<attribute>: [<error>, <error>, ...]}
    let validation_errors = validate(
      {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        repeat_password: repeat_password,
        agreement_checked: agreement_checked
      },
      register_constraints
    );
    if (!validation_errors) {
      this.setState({ validation_errors: {} });
      this.props.register(email, first_name, last_name, password);
    } else {
      this.setState({ validation_errors: validation_errors });
    }
  };

  render() {
    return (
      <div>
        <RegisterForm
          submitForm={this.handleSubmit}
          is_loading={this.props.is_loading}
          validation_errors={this.state.validation_errors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  is_loading: isLoadingSelector(state)
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
