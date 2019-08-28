import React, { Component } from "react";
import { connect } from "react-redux";
import { validate } from "validate.js";
import LoginForm from "../../components/LoginForm";
import { authenticate } from "../../store/user/operations";
import { isLoadingSelector } from "../../store/user/selectors";
import { login_constraints } from "../../services/validators";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation_errors: {}
    };
  }

  handleSubmit = (user_name, password) => {
    // validate_errors will be undefined if there are no validation error
    // otherwise it will be an object with the following format {<attribute>: [<error>, <error>, ...]}
    let validation_errors = validate(
      {
        user_name: user_name,
        password: password
      },
      login_constraints
    );
    if (!validation_errors) {
      this.setState({ validation_errors: {} });
      this.props.authenticate(user_name, password);
    } else {
      this.setState({ validation_errors: validation_errors });
    }
  };

  render() {
    return (
      <div>
        <LoginForm
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
  { authenticate }
)(Login);
