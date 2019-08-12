import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { validate } from "validate.js";
import { login_constraints } from "../services/validators";
import { addValidationErrors, removeValidationErrors } from "../redux/actions/validationActions";
import ValidationError from "./ValidationError";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: ""
    };
  }

  handleInputChange = e => {
    let new_state = {};
    new_state[e.target.name] = e.target.value;
    this.setState(new_state);
  };

  submitForm = e => {
    e.preventDefault();
    let validation_errors = validate(
      {
        user_name: this.state.user_name,
        password: this.state.password
      },
      login_constraints
    );
    if (!validation_errors) {
      this.props.removeValidationErrors();
      this.props.onSubmit(this.state.user_name, this.state.password);
    } else {
      this.props.addValidationErrors(validation_errors);
    }
  };
  
  render() {
    return (
      <div>
      <form onSubmit={this.submitForm}>
        <input type="text" name="user_name" value={this.state.user_name} onChange={this.handleInputChange} />
        <label>User</label>
        <ValidationError message={this.props.validation_errors["user_name"]} />
        <br />

        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        <label>Password</label>
        <ValidationError message={this.props.validation_errors["password"]} />
        <br />
 
        <Button htmlType="submit" type="primary" loading={this.props.is_loading}> 
          {
            this.props.is_loading ? "Loading" : "Login"
          }
        </Button>
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  is_loading: state.userReducer.is_loading,
  validation_errors: state.validationReducer.validation_errors
});

const mapDispatchToProps = dispatch => ({
  addValidationErrors: validation_errors => dispatch(addValidationErrors(validation_errors)),
  removeValidationErrors: _ => dispatch(removeValidationErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
