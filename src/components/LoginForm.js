import React, { Component } from "react";
import { Button } from "antd";
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitForm(this.state.user_name, this.state.password);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={this.props.validation_errors.user_name && "validation-error"}
            type="text"
            name="user_name"
            value={this.state.user_name}
            onChange={this.handleInputChange}
          />
          <label>User</label>
          <ValidationError message={this.props.validation_errors.user_name} />
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

          <Button htmlType="submit" type="primary" loading={this.props.is_loading}>
            {this.props.is_loading ? "Loading" : "Login"}
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
