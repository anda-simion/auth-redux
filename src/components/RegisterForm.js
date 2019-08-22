import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { validate } from "validate.js";
import { register_constraints } from "../services/validators";
import { addValidationErrors, removeValidationErrors } from "../store/validations/creators";
import ValidationError from "./ValidationError";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      repeat_password: "",
      agreement_checked: false
    };
  }

  handleInputChange = e => {
    let new_state = {};
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    new_state[e.target.name] = value;
    this.setState(new_state);
  };

  handleSubmit = e => {
    e.preventDefault();
    // validate_errors will undefined if there are no validation error
    // otherwise it will be an object with the following format {<attribute>: [<error>, <error>, ...]}
    let validation_errors = validate(
      {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        repeat_password: this.state.repeat_password,
        agreement_checked: this.state.agreement_checked
      },
      register_constraints
    );
    if (!validation_errors) {
      this.props.removeValidationErrors();
      this.props.submitForm(this.state.email, this.state.first_name, this.state.last_name, this.state.password);
    } else {
      this.props.addValidationErrors(validation_errors);
    }
  };

  componentWillUnmount = _ => {
    this.props.removeValidationErrors();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={this.props.validation_errors.email && "validation-error"}
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <label>Email</label>
        <ValidationError message={this.props.validation_errors.email} />
        <br />

        <input
          className={this.props.validation_errors.first_name && "validation-error"}
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handleInputChange}
        />
        <label>First name</label>
        <ValidationError message={this.props.validation_errors.first_name} />
        <br />

        <input
          className={this.props.validation_errors.last_name && "validation-error"}
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={this.handleInputChange}
        />
        <label>Last name</label>
        <ValidationError message={this.props.validation_errors.last_name} />
        <br />

        <input
          className={this.props.validation_errors.password && "validation-error"}
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <label>Password</label>
        <ValidationError message={this.props.validation_errors.password} />
        <br />

        <input
          className={this.props.validation_errors.repeat_password && "validation-error"}
          type="password"
          name="repeat_password"
          value={this.state.repeat_password}
          onChange={this.handleInputChange}
        />
        <label>Repeat password</label>
        <ValidationError message={this.props.validation_errors.repeat_password} />
        <br />

        <input
          type="checkbox"
          name="agreement_checked"
          defaultChecked={this.state.agreement_checked}
          onChange={this.handleInputChange}
        />
        <label>You have to agree to our Terms and Conditions</label>
        <ValidationError message={this.props.validation_errors.agreement_checked} />
        <br />

        <Button htmlType="submit" type="primary" loading={this.props.is_loading}>
          {this.props.is_loading ? "Loading" : "Register"}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  is_loading: state.user.is_loading,
  validation_errors: state.validations.validation_errors
});

const mapDispatchToProps = dispatch => ({
  addValidationErrors: validation_errors => dispatch(addValidationErrors(validation_errors)),
  removeValidationErrors: _ => dispatch(removeValidationErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
